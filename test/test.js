
const {loadConfig} = require('../index.js');
const Logger = require('cpclog');

const logger = Logger.createWrapper('test', Logger.LEVEL_DEBUG);
Logger.adjustAllLevel(Logger.LEVEL_DEBUG);

let config = loadConfig('testconfig.js');
logger.info('config:', config);
