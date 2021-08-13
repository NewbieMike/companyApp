const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getOne);

router.get('/products/random', ProductController.getRandom)

router.get('/products/:id', ProductController.getOne);

router.post('/products', ProductController.create);

router.put('/products/:id', ProductController.changeOne);

router.delete('/products/:id', ProductController.deleteOne)

module.exports = router;