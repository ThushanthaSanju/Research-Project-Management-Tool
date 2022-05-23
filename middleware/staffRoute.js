const { error } = require('../helpers/responseHelper');

const staffRoute = async (req, res, next) => {
    try {

        const { role } = req.user;

        if (role !== 'staff') {
            throw new Error('you do not have permission to do this task!');
        }
        next();
    } catch (e) {
        error(res, { status: 401, message: e.message });
    }
};

module.exports = staffRoute;