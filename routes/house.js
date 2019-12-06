const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.houses.show);
router.get('/:HouseId', ctrl.houses.index);
router.post('/create', ctrl.houses.create);
router.delete('/destroy', ctrl.houses.destroy);
router.put('/update', ctrl.houses.update);

module.exports = router;