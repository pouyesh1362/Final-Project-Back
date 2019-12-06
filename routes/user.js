const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:id', ctrl.users.show);
router.get('/alluser' , ctrl.users.index)


module.exports = router;