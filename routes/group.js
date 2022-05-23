const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const Group = require('../models/groups');
const { response, error } = require('../helpers/responseHelper');

// read group name
router.get('/api/groups/:id', auth, async (req, res) => {
    try {
        const group = await Group.findOne({ _id: req.params.id });

        if (!group) {
            response(res, false, 'Failed', 404, "Group not found!");
        }
        response(res, true, 'Success', 200, "Group name fetched", { name: group.name });
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;