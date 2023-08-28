/* global require */

const { appPort } = require('./config');

require('./server-web')(appPort);
