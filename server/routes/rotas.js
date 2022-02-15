const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const userController = require('../controllers/userController');

router.get('/', produtosController.view);
router.post('/', produtosController.find);
router.get('/addproduto', produtosController.form);
router.post('/addproduto', produtosController.create);

//router.get('/', userController.view);

module.exports = router;