<script>
  import { onMount } from 'svelte';
  import { Terminal } from  'xterm';
  import { AttachAddon } from 'xterm-addon-attach';
  import { WebLinksAddon } from 'xterm-addon-web-links';

  import 'xterm/css/xterm.css';

  export let command;
  export let task;
  export let callback;

  let term;
  let pid;
  let socket;

  onMount(() => {
    term = new Terminal();
    term.loadAddon(new WebLinksAddon(undefined, undefined, true));
    term.open(document.getElementById('terminal'));
    term.focus();
    window.term = term;
    term.onResize((size) => {
      if (!pid) {
        return;
      }
      const cols = size.cols;
      const rows = size.rows;
      const url = '/terminals/' + task + '/size?cols=' + cols + '&rows=' + rows;

      fetch(url, {method: 'POST'});
    });

    const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    let socketURL = protocol + location.hostname + ((location.port) ? (':' + location.port) : '') + '/terminals/';

    // fit is called within a setTimeout, cols and rows need this.
    setTimeout(() => {


      const url = new URL(`${location.origin}/terminals`);
      const params = {
        cols: term.cols,
        rows: term.rows,
        task: task
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      fetch(url, {method: 'POST'}).then((res) =>  {
        res.text().then((processId) =>  {
          pid = processId;
          socketURL += task;
          socket = new WebSocket(socketURL);
          socket.onopen = () =>  {
            term.loadAddon(new AttachAddon(socket));
            term._initialized = true;
          };
          socket.onmessage = (event) => {
            /*console.log(event);*/
            /*if(this.args.named.callback) {*/
            /*this.args.named.callback(event);*/
            /*}*/
          }
          socket.onclose = () => {};
          socket.onerror = () => {};
        });
      });
    }, 0);
  });

</script>

  <div id="terminal"></div>

<style>
</style>
