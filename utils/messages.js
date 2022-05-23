const moment = require('moment');

const generateMessage = (text, email) => {
    return {
        email,
        res: text,
        createdAt: moment().format("hh:mm a")
    };
};


module.exports = generateMessage;