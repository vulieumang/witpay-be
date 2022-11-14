require('dotenv/config');
const path = require('path');
const imagePath = process.env.IMAGE_PATH || "";
console.log(imagePath);
let absoluteImagePath = '';
let rootDir = '';

function GetImageDir() {
    return imagePath;
}

function GetAbsoluteImageDir() {
    return absoluteImagePath;
}

function SetRootDir(rootDir) {
    rootDir = rootDir;
    absoluteImagePath = path.join(rootDir, imagePath);
    console.log(absoluteImagePath);
}

module.exports = {
    ...process.env,
    GetImageDir,
    GetAbsoluteImageDir,
    SetRootDir
}
