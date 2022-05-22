const { error } = require('../helpers/responseHelper');

const studentRoute = async (req, res, next) => {
    try {

        const { role } = req.user;

        if (role !== 'student') {
            throw new Error('you do not have permission to do this task!');
        }
        next();
    } catch (e) {
        error(res, { status: 401, message: e.message });
    }
};

module.exports = studentRoute;