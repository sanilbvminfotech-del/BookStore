const express = require('express');
const { createUserOrder, getUserOrder } = require('../controllers/Order');
const authorise = require('../middlewares/authorise');
const router = express.Router();

router.post('/create-order', authorise, createUserOrder);

router.get('/get-user-order', authorise, getUserOrder);

module.exports = router;