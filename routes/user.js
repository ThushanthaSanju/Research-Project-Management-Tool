const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const User = require('../models/user');
const { response, error } = require('../src/helpers/responseHelper');


router.post('/api/users', async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);
        const token = await user.generateAuthToken();

        await user.save();

        response(res, true, 'Created', 201, "user logged in", { user, token });
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;