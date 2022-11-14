const axios = require('axios');


exports.sendMessage = function(message){
    axios.post('https://hooks.slack.com/services/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', {
            text: message
        });
}