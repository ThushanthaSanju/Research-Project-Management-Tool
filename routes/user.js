const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const User = require('../models/user');
const { response, error } = require('../src/helpers/responseHelper');

// register
router.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();

        await user.save();

        response(res, true, 'Created', 201, "user logged in", { user, token });
    } catch (e) {
        error(res, e);
    }
});

// login user
router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        response(res, true, 'Success', 200, "user logged in", { user, token });
    } catch (e) {
        error(res, e);
    }
});

// logout user
router.post('/api/users/logout', auth, async (req, res) => {
    try {
        const user = req.user;

        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await user.save();

        response(res, true, 'Success', 200, "user logged out");
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;