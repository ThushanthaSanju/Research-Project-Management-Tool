const { Router } = require('express');
const router = Router();

// middleware
const auth = require('../middleware/auth');
const adminRoute = require('../middleware/adminRoute');
const studentRoute = require('../middleware/studentRoute');

// model
const User = require('../models/user');

// helpers
const { response, error } = require('../helpers/responseHelper');

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

        await user.populate({
            path: 'group',
            model: 'Group',
            populate: {
                path: 'researchTopic',
                model: 'ResearchTopic'
            }
        });


        response(res, true, 'Success', 200, "user logged in", { user: user, token });
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

// fetch all users
router.get("/api/users", auth, async (req, res) => {
    try {
        const match = {};

        if (req.query.role) {
            match.role = req.query.role;
        }

        const users = await User.find(match);

        response(res, true, "Success", 200, "Users fetched successfully", {
            users,
        });
    } catch (e) {
        error(res, e);
    }
});

// fetch all students
router.get("/api/users/students", auth, studentRoute, async (req, res) => {
    try {
        const users = await User.find({ role: 'student' });

        response(res, true, "Success", 200, "Users fetched successfully", {
            users,
        });
    } catch (e) {
        error(res, e);
    }
});

// read profile
router.get("/api/users/me", auth, async (req, res) => {
    try {
        const user = await req.user.populate({
            path: "group",
            populate: "supervisor coSupervisor researchTopic",
        });


        response(res, true, "Success", 200, "User Profile fetched successfully!", { user: user });
    } catch (e) {
        error(res, e);
    }
});

// update user
router.patch("/api/users/:id", auth, adminRoute, async (req, res) => {
    try {

        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        if (!user) {
            return response(res, false, "Not Found", 404, "User does not found");
        }

        response(res, true, "Success", 200, "User updated successfully", { user });
    } catch (e) {
        error(res, e);
    }
});

// delete user
router.delete("/api/users/:id", auth, adminRoute, async (req, res) => {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.id });

        if (!user) {
            return response(res, false, "Not Found", 404, "User does not found");
        }

        response(res, true, "Success", 200, "User deleted successfully", { user });
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;