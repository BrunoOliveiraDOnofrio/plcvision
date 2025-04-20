const router = require('express').Router();
const consumidorController = require('../controllers/consumidorController');

router.post('/', (req, res) => consumidorController.store(req, res));
router.get('/', (req, res) => consumidorController.index(req, res));
router.get('/:id', (req, res) => consumidorController.show(req, res));
router.put('/:id', (req, res) => consumidorController.update(req, res));

module.exports = router;