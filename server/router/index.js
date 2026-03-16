const express = require('express');
const router = express.Router();
const auth = require('./auth');
const book = require('./book');
const cart = require('./cart');
const order = require('./order');
const admin = require('./admin');

router.use('/auth', auth);

router.use('/book', book);

router.use('/cart', cart);

router.use('/order', order);

router.use('/admin', admin);

module.exports = router;