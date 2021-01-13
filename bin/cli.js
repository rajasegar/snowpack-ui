#!/usr/bin/env node

/* globals require process  */

'use strict';

process.title = 'snowpack-ui';
console.log('Snowpack UI');
const startServer = require('../server');
startServer(process.cwd());
