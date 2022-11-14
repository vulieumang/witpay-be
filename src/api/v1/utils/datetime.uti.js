var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

function Now(){
    return moment();
}


function ParseToMomentObj(dateTimeStr){
    return moment(dateTimeStr);
}

function ToDateFormat(momentObject){
    return momentObject.format(dateFormat);
}

function ToTimeFormat(momentObject) {
    return momentObject.format(timeFormat);
}

function ToDateTimeFormat(momentObject) {
    return momentObject.format(dateTimeFormat);
}



module.exports = {
    Now,
    ParseToMomentObj,
    ToDateFormat,
    ToTimeFormat,
    ToDateTimeFormat
}