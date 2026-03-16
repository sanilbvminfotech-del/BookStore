const Book = require("../model/book");
const Order = require("../model/order");
const User = require("../model/user");

const getAllUserDataAdmin = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ status: false, message: 'no user found!' });
        }

        return res.status(200).json({ status: true, data: userData, message: 'it admin=> get all user data' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getAllUserWithOrderDetailsAdmin = async (req, res) => {
    try {
        // .populate('user').populate('items.book').populate('shippingAddress')
        const getDatawithDorder = await Order.find().populate('user').populate('items.book').populate('shippingAddress');
        if (!getDatawithDorder) {
            return res.status(404).json({ status: false, message: 'user and order not found' });
        }
        return res.status(200).json({ status: true, data: getDatawithDorder, message: 'it admin=> get all user data with order details!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



const adminCanDisabledUserData = async (req, res) => {
    try {
        const userId = req.params.id;
        const { statusField } = req.body;
        const updateUserforDisable = await User.findByIdAndUpdate(userId, { $set: { statusField: statusField } }, { new: true });

        if (!updateUserforDisable) {
            return res.status(400).json({ status: false, message: 'user not found!' });
        }

        return res.status(200).json({ status: true, data: updateUserforDisable, message: 'user has been disabled successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const adminCanDeleteUserData = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteUser = await User.findOneAndDelete({ _id: userId }, { new: true });

        if (!deleteUser) {
            return res.status(404).json({ status: false, message: 'user not found!' });
        }

        return res.status(200).json({ status: true, message: 'user data has been deleted!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const adminCanSeeSingleUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({ status: false, message: 'user not found!' });
        }

        return res.status(200).json({ status: true, data: userDetails, message: 'get user details' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const adminCanGetBooksData = async (req, res) => {
    try {
        const getAllBooksByAdmin = await Book.find();

        return res.status(200).json({ status: true, data: getAllBooksByAdmin, message: 'books data!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getSingleBookDetailAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const getOneBookDetail = await Book.findById(id);
        if (!getOneBookDetail) {
            return res.status(404).json({ status: false, message: 'book not found!' });
        }

        return res.status(200).json({ status: true, data: getOneBookDetail, message: 'get book detail!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getAllBookWithSoftDeleteAdmin = async (req, res) => {
    try {
        const getAllSodtBooks = await Book.find({ isDeleted: false });
        if (!getAllSodtBooks) {
            return res.status(404).json({ status: false, message: 'books not found!' });
        }
        return res.status(200).json({ status: true, data: getAllSodtBooks, message: "get all soft books" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const addBookDataAdmin = async (req, res) => {
    try {
        const { title, author, description, genre, price, oldPrice, category, trending, rating, stock } = req.body;
        if (!title || !author || !description || !genre || !price || !oldPrice || !category || !stock) {
            return res.status(400).json({ status: false, message: 'all fields are required!' });
        }

        const addBookData = new Book({ bookID: Date.now(), title, author, description, genre, price, oldPrice, category, stock, trending: trending || false, rating: rating || 0, bookImage: req.file ? req.file.filename : "default-book.jpg" });
        await addBookData.save();
        return res.status(201).json({ status: true, data: addBookData, message: 'book created successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const deleteBookDetailsAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletezBook = await Book.findByIdAndDelete(id);
        if (!deletezBook) {
            return res.status(404).json({ status: false, message: 'book not found' });
        }
        return res.status(200).json({ status: true, message: 'book deleted!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const deleteBookDetailSoftDataAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { isDeleted } = req.body;
        const booksoftdata = await Book.findByIdAndUpdate(id, { $set: { isDeleted: isDeleted } }, { new: true });

        if (!booksoftdata) {
            return res.status(404).json({ status: false, message: 'book not found!' });
        }
        return res.status(200).json({ status: true, data: booksoftdata, message: 'Book has been disabled successfully' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



const updateBookDetailsAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        console.log(updateData, 'updateData');

        if (req.file) {
            updateData.bookImage = req.file.filename;
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedBook) {
            return res.status(404).json({ status: false, message: 'Book not found!' });
        }

        return res.status(200).json({ status: true, data: updatedBook, message: 'Updated successfully' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


module.exports = {
    getAllUserDataAdmin,
    getAllUserWithOrderDetailsAdmin,
    adminCanDisabledUserData,
    adminCanDeleteUserData,
    adminCanSeeSingleUserData,
    adminCanGetBooksData,
    getSingleBookDetailAdmin,
    getAllBookWithSoftDeleteAdmin,
    addBookDataAdmin,
    deleteBookDetailsAdmin,
    deleteBookDetailSoftDataAdmin,
    updateBookDetailsAdmin
}