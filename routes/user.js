const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

// model
const User = require('../models/user');

// response helpers
const { response, error } = require('../helpers/responseHelper');
const { deleteFieldsInOne } = require('../helpers/deleteFields');

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

        await user.populate('group');

        response(res, true, 'Success', 200, "user logged in", { user, token });
        await user.populate({
            path: 'group',
            model: 'Group',
            populate: {
                path: 'researchTopic',
                model: 'ResearchTopic'
            }
        });

        const userObject = deleteFieldsInOne(user, [
            'password', 'tokens', 'group.students', 'group.createdAt', 'group.updatedAt',
            'group.__v', 'group.researchTopic._id', 'group.researchTopic.group',
            'group.researchTopic.createdAt', 'group.researchTopic.updatedAt', 'group.researchTopic.__v'
        ]);

        response(res, true, 'Success', 200, "user logged in", { user: userObject, token });
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