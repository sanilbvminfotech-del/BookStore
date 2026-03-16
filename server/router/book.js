const express = require('express');
const { addBookDataBackend, deleteBookDataBackend, getAllBooksBackend, getSingleBookBackend, updateBookBackend, deleteSoftBookDataBackend, getAllBookWithSoftDeleteBackend } = require('../controllers/book');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bookauthorise = require('../middlewares/bookauthorise');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/bookImage')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

router.post('/add-book-data', upload.single('bookImage'), addBookDataBackend);

router.delete('/delete-book-data/:id', bookauthorise(['admin']), deleteBookDataBackend);

router.patch('/delete-book-soft-data/:id', bookauthorise(['admin']), deleteSoftBookDataBackend);

router.patch('/update-book-data/:id', bookauthorise(['admin']), updateBookBackend);

router.get('/get-all-book', getAllBooksBackend);

router.get('/get-one-book/:id', getSingleBookBackend);

router.get('/get-all-soft-delete-book', getAllBookWithSoftDeleteBackend);

module.exports = router;