const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.view);
router.post('/', produtosController.find);
router.get('/addproduto', produtosController.form);
router.post('/addproduto', produtosController.create);
router.get('/editproduto/:id', produtosController.edit);
router.post('/editproduto/:id', produtosController.update);
router.get('/viewproduto/:id', produtosController.viewall);
router.get('/:id', produtosController.delete);


//router.get('/', userController.view);

module.exports = router;