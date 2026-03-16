const express = require('express');
const authorise = require('../middlewares/authorise');
const { createUserOrder, getUserOrder } = require('../controllers/order');
const router = express.Router();

router.post('/create-order', authorise, createUserOrder);

router.get('/get-user-order', authorise, getUserOrder);

module.exports = router;