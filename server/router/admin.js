const express = require('express');
const { getAllUserDataAdmin, getAllUserWithOrderDetailsAdmin, adminCanDisabledUserData, adminCanDeleteUserData, adminCanGetBooksData, getSingleBookDetailAdmin, getAllBookWithSoftDeleteAdmin, addBookDataAdmin, deleteBookDetailsAdmin, deleteBookDetailSoftDataAdmin, updateBookDetailsAdmin, adminCanSeeSingleUserData } = require('../controllers/admin');
const bookauthorise = require('../middlewares/bookauthorise');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/bookImage')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });


//   user data
router.get('/get-all-user-data-admin', bookauthorise(['admin']), getAllUserDataAdmin);

router.get('/get-all-user-data-with-orders-admin', bookauthorise(['admin']), getAllUserWithOrderDetailsAdmin);

router.get('/get-single-user-details-admin/:id', bookauthorise(['admin']), adminCanSeeSingleUserData);

router.patch('/user-disabled-admin/:id', bookauthorise(['admin']), adminCanDisabledUserData);

router.delete('/user-data-delete-admin/:id', bookauthorise(['admin']), adminCanDeleteUserData);



//   book data
router.get('/get-books-data-admin', bookauthorise(['admin']), adminCanGetBooksData);

router.get('/get-book-detail-admin/:id', bookauthorise(['admin']), getSingleBookDetailAdmin);

router.get('/get-all-soft-delete-book-admin', bookauthorise(['admin']), getAllBookWithSoftDeleteAdmin);

router.post('/add-book-detail-admin', bookauthorise(['admin']), upload.single('bookImage'), addBookDataAdmin);

router.delete('/delete-book-detail-admin/:id', bookauthorise(['admin']), deleteBookDetailsAdmin);

router.patch('/delete-book-detail-soft-admin/:id', bookauthorise(['admin']), deleteBookDetailSoftDataAdmin);

router.patch('/update-book-detail-admin/:id', bookauthorise(['admin']), upload.single('bookImage'), updateBookDetailsAdmin);

module.exports = router;