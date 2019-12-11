const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.houses.show);
router.get('/:id', ctrl.houses.index);
router.post('/create', ctrl.houses.create);
router.delete('/delete/:id', ctrl.houses.destroy);
router.put('/update/:id', ctrl.houses.update);


module.exports = router;