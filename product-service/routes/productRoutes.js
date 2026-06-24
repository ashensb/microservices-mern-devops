const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', exports.updateProduct || require('../controllers/productController').updateProduct);
router.delete('/:id', exports.deleteProduct || require('../controllers/productController').deleteProduct);

module.exports = router;