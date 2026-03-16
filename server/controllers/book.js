const Book = require("../model/book");


const addBookDataBackend = async (req, res) => {
    try {
        const { title, author, description, genre, price, oldPrice, category, trending, rating, stock } = req.body;

        if ([title, author, description, genre, price, oldPrice, category, stock].some(com => !com || com === ''.trim())) {
            return res.status(400).json({ status: false, message: 'all fielda are required!' });
        }

        const goingToAddBook = new Book({ title, author, description, genre, price, oldPrice, category, trending: trending || false, rating: rating || 0, stock, bookImage: req.file ? req.file.filename : "default-book.jpg" });
        await goingToAddBook.save();
        return res.status(201).json({ status: true, data: goingToAddBook, message: 'book created successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getAllBooksBackend = async (req, res) => {
    try {
        const getAllBooks = await Book.find();

        return res.status(200).json({ status: true, data: getAllBooks, message: "get all books" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getAllBookWithSoftDeleteBackend = async (req, res) => {
    try {
        const getAllSoftBooks = await Book.find({ isDeleted: false });
        if (!getAllSoftBooks) {
            return res.status(404).json({ status: false, message: 'books not found!' });
        }
        return res.status(200).json({ status: true, data: getAllSoftBooks, message: "get all soft books" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getSingleBookBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const getOneBookData = await Book.findById(id);

        if (!getOneBookData) {
            return res.status(404).json({ status: false, message: 'book not found' });
        }

        return res.status(200).json({ status: true, data: getOneBookData, message: "get one book" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const updateBookBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body }

        if (req.file) {
            updatedData.bookImage = req.file.filename
        }
        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ status: false, message: 'book not found!' });
        }

        return res.status(200).json({ status: true, data: updatedBook, message: 'Book updated successfully' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



const deleteBookDataBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const delBook = await Book.findByIdAndDelete(id);
        if (!delBook) {
            return res.status(404).json({ status: false, message: 'book not found' });
        }
        return res.status(200).json({ status: true, message: 'Book has been deleted successfully' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


const deleteSoftBookDataBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const bookSoft = await Book.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

        if (!bookSoft) {
            return res.status(404).json({ status: false, message: 'book not found' });
        }

        return res.status(200).json({ status: true, data: bookSoft, message: 'Book has been disabled successfully' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



module.exports = {
    updateBookBackend,
    getAllBooksBackend,
    addBookDataBackend,
    getSingleBookBackend,
    deleteBookDataBackend,
    deleteSoftBookDataBackend,
    getAllBookWithSoftDeleteBackend
}