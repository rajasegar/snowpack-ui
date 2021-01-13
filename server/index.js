const express = require('express');
const expressWs = require('express-ws');
const os = require('os');
const pty = require('node-pty');
const path = require('path');
const getPort = require('get-port');
const { exec } = require('child_process');
const fs = require('fs');
const ncu = require('npm-check-updates');
const buffer = require('./utils/buffer');
const getBuildAssets = require('./utils/getAssetStats');
const { Writable } = require('stream');
const AU = require('ansi_up');
const ansi_up = new AU.default;
const resolve = require('resolve');
const execa = require('execa');

function startServer(projectPath) {
  //projectPath =  '/Users/rajasegarchandran/www/super-rentals';

  const app = express();
  expressWs(app);

  const terminals = {};
  const logs = {};

  app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '..',   'public/index.html');
    res.sendFile(indexFile);
  });

  app.use('/', express.static(path.join(__dirname, '..', 'public')));
  app.use('/build', express.static(path.join(__dirname, '..', 'public/build')));

  app.get('/project', (req,res) => {
    const manifestPath =`${projectPath}/package.json`;
    if(fs.existsSync(manifestPath)) {
      const manifest = require(manifestPath);
      manifest.projectPath = projectPath;
      res.json(manifest);
    } else {
      res.json({});
    }
  });

  app.get('/assets', (req, res) => {

    const files = getBuildAssets(projectPath);

    res.json(files);
  });

  app.get('/build', async (req, res) => {
    const buildLogs = [];
    const errLogs = [];
    const logStream = new Writable({
      objectMode: true,
      write: (data, _, done) => {
        console.log('<-', data.toString());
        buildLogs.push(ansi_up.ansi_to_html(data.toString()));
        done();
      }
    });

    const errStream = new Writable({
      objectMode: true,
      write: (data, _, done) => {
        console.log('<-', data.toString());
        errLogs.push(ansi_up.ansi_to_html(data.toString()));
        done();
      }
    });


    //const assets = getBuildAssets(projectPath);

    const { stdout } = await execa('npm', ['run', 'build']);


    res.json({ result: stdout, logs: buildLogs, errLogs });

  });

  app.get('/dependencies', async (req, res) => {
    const upgraded = await ncu.run();
    const manifestPath =`${projectPath}/package.json`;
    const manifest = require(manifestPath);
    const { devDependencies, dependencies } = manifest;
    let deps;
    if(req.query.type === 'dev') {
      deps = devDependencies;
    } else {
      deps = dependencies || {};
    }

    const _deps =  Object.keys(deps).map(k => {
      const obj = {
        name: k,
        version: deps[k],
        latest: '-'
      };
      if(upgraded[k]) {
        obj.latest = upgraded[k];
      }
      return obj;
    });

    return res.json({ dependencies: _deps});
  });


  app.post('/terminals', (req, res) => {
    const env = Object.assign({}, process.env);
    env['COLORTERM'] = 'truecolor';
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const task = req.query.task;
    let term;

    // Connect if term is already there
    // instead of creating a new one
    if(terminals[task]) {
      term = terminals[task];
    } else {
      term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
        name: 'xterm-256color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: projectPath,
        env: env,
        // encoding: USE_BINARY ? null : 'utf8'
        encoding:  'utf8'
      });

      //term.write('clear\r');
      //term.write('pwd\r');

      console.log('Created terminalwith PID: ' + term.pid);

      // terminals use task name as the key eg. build, serve
      terminals[task] = term;

      // logs still use pid as the key
      logs[term.pid] = '';
    }

    term.on('data', function(data) {
      logs[term.pid] += data;
    });
    res.send(term.pid.toString());
    res.end();
  });

  // TODO: Change pid reference to task
  app.post('/terminals/:pid/size', (req, res) => {
    const pid = parseInt(req.params.pid);
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const term = terminals[pid];

    term.resize(cols, rows);
    console.log('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.');
    res.end();
  });

  app.ws('/terminals/:termid', function (ws, req) {
    const termId = req.params.termid;
    const term = terminals[termId];
    console.log('Connected to terminal ' + term.pid);
    ws.send(logs[term.pid]);

    // const send = USE_BINARY ? bufferUtf8(ws, 5) : buffer(ws, 5);
    const send =  buffer(ws, 5);

    term.on('data', function(data) {
      try {
        send(data);
      } catch (ex) {
        // The WebSocket is not open, ignore
      }
    });
    ws.on('message', function(msg) {
      term.write(msg);
      // Change the project to new path
      if(msg.includes('ember new')) {
        const [,,newPath] = msg.split(' ');
        projectPath += "/" + newPath;
      }
    });
    ws.on('close', function () {
      term.kill();
      console.log('Closed terminal ' + term.pid);
      // Clean things up
      delete terminals[termId];
      delete logs[term.pid];
    });
  });

  (async () => {
    const port = await getPort();

    const host = os.platform() === 'win32' ? '127.0.0.1' : '0.0.0.0';

    console.log('Xterm listening to http://localhost:' + port);

    let openCommand = 'open';
    if (os.platform() === 'win32') openCommand = 'start';
    if (os.platform() === 'linux') openCommand = 'xdg-open';

    exec(`${openCommand} http://localhost:${port}`, () => {});

    app.listen(port, host);
  })();

}

module.exports = startServer; 
