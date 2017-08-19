const 
    fs = require('fs'),
    configFilePath = process.env.HOME + '/.gitauthors.json';

function load() {
    if (fs.existsSync(configFilePath)) {
        return JSON.parse(fs.readFileSync(configFilePath));
    }
    return null;
}

module.exports = {
    load
};
