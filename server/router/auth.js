const express = require('express');
const { userRegister, userLogin, userProfile, refreshTokenGenerate, sendLinkToEmail, forgotPasswordUserCheck, changeNewPassword, getUserDataForChange, editFirstname, updateProfile, userLogout } = require('../controllers/user');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authorise = require('../middlewares/authorise');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/userImage')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

router.post('/user-register', upload.single('image'), userRegister);

router.post('/user-login', userLogin);

router.post('/user-logout', authorise, userLogout);

router.get('/user-profile', authorise, userProfile);

router.post('/refresh-token', refreshTokenGenerate);

router.post('/sendpasswordlink', sendLinkToEmail);

router.get('/forgotpassword/:id/:token', forgotPasswordUserCheck);

router.post('/change-new-password/:id/:token', changeNewPassword);

router.get('/get-user-data-change', authorise, getUserDataForChange);

router.patch('/edit-first-name', authorise, editFirstname);

router.patch('/update-profile', authorise, updateProfile);

module.exports = router;