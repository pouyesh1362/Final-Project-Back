const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:id', ctrl.users.show);
router.put('/update/:id' , ctrl.users.userUpdate);
router.delete('delete/:id' , ctrl.users.userDelete);

module.exports = router;