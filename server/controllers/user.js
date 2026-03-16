const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: 'wpxy njoc lgov wqfb'
    }
});



const userRegister = async (req, res) => {
    console.log(req.body);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const { firstname, lastname, hobbies, age, gender, email, password, username, checkRolePassword } = req.body;

    if (!firstname || !lastname || !email || !hobbies || !age || !gender || !password || !username) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }
    console.log(checkRolePassword, 'checkRolePassword');

    let assignedRole = 'user';

    if (checkRolePassword && checkRolePassword === process.env.ADMIN_SECRET_PASSWORD) {
        assignedRole = 'admin';
    }

    try {
        const emailLower = email.toLowerCase();
        let hobbiesArray = hobbies;
        if (typeof hobbiesArray === 'string') {
            hobbiesArray = hobbiesArray.split(',').map(hobby => hobby.trim());
        }

        const findUser = await User.findOne({ email: emailLower });
        if (findUser) {
            return res.status(400).json({ status: false, message: 'user already register!' });
        }

        const createdUser = new User({ firstname, lastname, email: emailLower, age, hobbies: hobbiesArray, username, gender, password, role: assignedRole, image: req.file ? req.file.filename : 'default.jpg', statusField: true });

        await createdUser.save();
        return res.status(201).json({ status: true, data: createdUser, message: `User created successfully as ${assignedRole}!`, role: assignedRole });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (!(email && password)) {
            return res.status(400).json({ status: false, message: 'all fields are required!' });
        }

        // const findUserData = await User.findOne({ $or: [{ email: email }, { username: email }] });
        const findUserData = await User.findOne({ $and: [{ statusField: true }, { $or: [{ email: email }, { username: email }] }] });
        if (!findUserData) {
            return res.status(400).json({ status: false, message: 'email or password is not valid!' });
        }

        const trimPassword = password.trim();
        const comparePassword = await bcrypt.compare(trimPassword, findUserData.password);
        if (!comparePassword) {
            return res.status(400).json({ status: false, message: 'email or password is not valid!' });
        }

        const token = await findUserData.generateAuthToken();

        const refreshToken = jwt.sign({
            _id: findUserData._id,
            email: findUserData.email,
            role: findUserData.role
        }, process.env.SECRET_REFRESH_KEY, { expiresIn: '1d' });

        const updatedUserData = await User.findByIdAndUpdate(findUserData._id, { $set: { token } }, { new: true });

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });

        return res.status(201).json({ status: true, data: updatedUserData, token: token, message: 'user loggedIn successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const userProfile = async (req, res) => {
    try {
        const userProfile = req.user;
        if (!userProfile) {
            return res.status(404).json({ status: false, message: 'user not found!' });
        }

        return res.status(201).json({ status: true, data: userProfile, message: 'get userProfile successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getUserDataForChange = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ status: false, message: 'user not found!' });
        }

        return res.status(201).json({ status: true, data: user, message: 'get userProfile successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const editFirstname = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstname } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { firstname: firstname } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        return res.status(200).json({ status: true, data: updatedUser, message: 'Firstname updated successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstname, lastname, age, hobbies } = req.body;

        let hobbiesInArray = hobbies;
        if (typeof hobbiesInArray === 'string') {
            hobbiesInArray = hobbiesInArray.split(',').map(ho => ho.trim());
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { firstname, lastname, age, hobbies: hobbiesInArray } }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        return res.status(200).json({ status: true, data: updatedUser, message: 'Profile updated successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const refreshTokenGenerate = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'strict' });
            return res.status(403).json({ message: "Session expired." });
        }

        try {
            const verifyToken = jwt.verify(token, process.env.SECRET_REFRESH_KEY);

            if (!verifyToken) {
                return res.status(400).json({ status: false, message: 'retry, token is not valid!' });
            }

            const accessToken = jwt.sign({
                _id: verifyToken._id
            }, process.env.SECRET_TOKEN_KEY, { expiresIn: '120m' });

            return res.status(200).json({ status: true, accessToken, message: 'access Token generate!' });
        } catch (error) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'strict' });
            return res.status(403).json({ status: false, message: "Refresh token expired or invalid" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const sendLinkToEmail = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ status: false, message: 'Email is required!' });
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ status: false, message: 'user not found!' });
        }

        const token = jwt.sign({
            _id: findUser._id
        }, process.env.SEND_PASSWORD_TOKEN, { expiresIn: '1d' });

        const setUserToken = await User.findOneAndUpdate({ _id: findUser._id }, { $set: { verifyToken: token } }, { new: true });

        if (setUserToken) {
            let mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: email,
                subject: 'Email for password reset',
                text: `This link is valid for 2 MINUTES: http://localhost:5173/forgotpassword/${findUser._id}/${setUserToken.verifyToken}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        return res.status(200).json({ status: true, message: "Email Send Successfully!" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const forgotPasswordUserCheck = async (req, res) => {
    try {
        const { id, token } = req.params;

        const validUserFind = await User.findOne({ _id: id, verifyToken: token });

        const verifyTokenCheck = jwt.verify(token, process.env.SEND_PASSWORD_TOKEN);

        if (validUserFind && verifyTokenCheck._id) {
            return res.status(200).json({ status: true, data: validUserFind });
        } else {
            return res.status(401).json({ status: false, message: 'user noit Existed' });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const changeNewPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ status: false, message: 'password is required!' });
        }

        const validUser = await User.findOne({ _id: id, verifyToken: token });

        const verifyToken = jwt.verify(token, process.env.SEND_PASSWORD_TOKEN);

        if (validUser && verifyToken._id) {
            const newPassword = await bcrypt.hash(password, 10);

            const setNewUserPAssword = await User.findByIdAndUpdate({ _id: id }, { password: newPassword, verifyToken: null }, { new: true });
            setNewUserPAssword.save()
            return res.status(201).json({ status: true, message: 'password change !' });
        } else {
            return res.status(401).json({ status: false, message: 'user noit Existed' });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const userLogout = (req, res) => {
    try {
        res.clearCookie('refreshToken', { httpOnly: true })

        return res.status(200).json({ status: true, message: 'logout successfully!' })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}



module.exports = {
    userRegister,
    userLogin,
    userProfile,
    refreshTokenGenerate,
    sendLinkToEmail,
    forgotPasswordUserCheck,
    changeNewPassword,
    getUserDataForChange,
    editFirstname,
    updateProfile,
    userLogout
}