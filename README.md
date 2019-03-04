# node-autopath-config
Auto check for pathes as ~, /etc/, ./ in turn, and load config content.

# Install

    npm install node-autopath-config

# Usage

    const {loadConfig} = require('node-autopath-config');
    const myConfig = loadConfig(myConfigPath);

myConfigPath is the config file/dir's path, which could be following options, and loadConfig() will return the content of config.

**Absolute path**

myConfigPath = /usr/local/etc/myconfig.js

will check:

* /usr/local/etc/myconfig.js

**Relative path**

 myConfigPath = myconfig.js

will check:

* ~/.myconfig.js
* /etc/myconfig.js
* ./myconfig.js

**Relative path with dir**

myConfigPath = myproject/myconfig.js

will check:

* ~/.myproject/myconfig.js
* /etc/myproject/myconfig.js
* ./myproject/myconfig.js


**Relative path with prefixed dot**

myConfigPath = .config/myconfig.js

will check:

* ~/.config/myconfig.js
* /etc/.config/myconfig.js
* ./.config/myconfig.js


