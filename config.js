const 
    fs = require('fs'),
    configFilePath = process.env.HOME + '/.gitauthors.json';

function load() {
    if (fs.existsSync(configFilePath)) {
        return JSON.parse(fs.readFileSync(configFilePath));
    }
    return null;
}

function save(configData) {
    fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2) + '\n');
}

module.exports = {
    load,
    save
};
