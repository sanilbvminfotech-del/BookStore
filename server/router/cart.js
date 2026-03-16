const express = require('express');
const authorise = require('../middlewares/authorise');
const { incrementBackend, decrementBackend, getCartBackend, clearCartBackend, removeItemBackend } = require('../controllers/cart');
const router = express.Router();

router.post('/increment-item/:id', authorise, incrementBackend);

router.post('/decrement-item/:id', authorise, decrementBackend);

router.get('/get-cart', authorise, getCartBackend);

router.delete('/clear-cart', authorise, clearCartBackend);

router.delete('/remove-item/:id', authorise, removeItemBackend);

module.exports = router;