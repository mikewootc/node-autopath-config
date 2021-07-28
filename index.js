#!/usr/bin/env node
'use strict'


const path      = require('path');
const fs        = require('fs');
const Logger    = require('cpclog');

const logger = Logger.createWrapper('config', Logger.LEVEL_DEBUG);

// options:
//      * isJson: config file is a json file
//      * accuratePath: suppress pathes auto detect.
exports.loadConfig = (configPath, options) => {
    let extension = (options && options.isJson) ? 'json' : 'js';
    let lstConfigPathes = [];
    let config = null;

    if (options && options.quiet) {
        Logger.adjustTag('config', Logger.LEVEL_ERROR);
    }

    logger.debug('configPath:', configPath);
    try {
        // Compose config searching pathes
        if (path.isAbsolute(configPath) || options && options.accuratePath) {
            lstConfigPathes.push(configPath);
        } else { // Relative path
            if (configPath[0] == '.') { // Already prefixed by '.'
                lstConfigPathes.push(process.env.HOME + '/' + configPath);
            } else {
                // Add prefix '.' for user's HOME dir.
                lstConfigPathes.push(process.env.HOME + '/.' + configPath);
            }
            lstConfigPathes.push('/etc/' + configPath);
            lstConfigPathes.push(path.join(path.resolve(), configPath));
            logger.debug(Logger.BLUE_B, 'PWD', process.env.PWD);
        }
        logger.debug('    lstConfigPathes:', lstConfigPathes);

        // Check for config pathes to look at existed config file.
        for (let i = 0; i < lstConfigPathes.length; i++) {
            let p = lstConfigPathes[i];

            if (!fs.existsSync(p)) {
                continue;
            }

            let stat = fs.statSync(p);
            if (stat.isDirectory()) {
                p += '/index.' + extension;
            }

            stat = fs.statSync(p);
            if (stat.isFile()) {
                logger.debug(Logger.GREEN, 'Found config file:', p);
                if (extension == 'json') {
                    let text = fs.readFileSync(p, 'utf8');
                    config = JSON.parse(text);
                } else {
                    config = require(p);
                }

                break;
            }
        }

        return config;
    } catch(err) {
        throw err;
    }
}




// vim:set tw=0:
