const fs = require('fs');

module.exports.createDirectory = (fullPath) => {
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
};

module.exports.removeDirectory = (fullPath) => {
    fs.rmdirSync(fullPath, {recursive: true});
};