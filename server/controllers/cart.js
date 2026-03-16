const Book = require("../model/book");
const Cart = require("../model/cart");


const incrementBackend = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addLot } = req.body;
        const { id } = req.params;
        console.log(id,'sssssssssssss');

        await new Promise((resolve) => setTimeout(resolve, 350));

        const book = await Book.findOne({ _id: id, isDeleted: false });
        if (!book) {
            return res.status(404).json({ status: false, message: 'Book not found!' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] })
        }

        const findIndexx = cart.items.find(itm => itm.book.toString() === id);
        if (findIndexx) {
            findIndexx.quantity += addLot ? addLot : 1
        } else {
            cart.items.push({ book: id, quantity: addLot ? addLot : 1 })
        }

        await cart.save();
        await cart.populate('items.book');
        return res.status(200).json({ status: true, data: cart, message: 'Cart updated successfully!' });
    } catch (error) {
        console.error("Error in incrementBackend:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};



const decrementBackend = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        await new Promise((resolve) => setTimeout(resolve, 350));
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ status: false, message: 'cart not found!' });
        }

        const existingItem = cart.items.find(itm => itm.book.toString() === id);
        // console.log(existingItem,'existingItem');

        if (!existingItem) {
            return res.status(404).json({ status: false, message: "Item not found in cart" });
        }

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1
        } else {
            cart.items = cart.items.filter(itm => itm.book.toString() !== id)
        }

        await cart.save();
        await cart.populate('items.book');
        return res.status(200).json({ status: true, data: cart, message: 'Quantity decreased' });
    } catch (error) {
        console.error("Error in incrementBackend:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};


const getCartBackend = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            // return res.status(404).json({ status: false, message: 'cart not found' });
            return res.status(200).json({ status: true, data: { items: [] }, message: 'No items in cart yet' });
        }
        await cart.populate('items.book');
        return res.status(200).json({ status: true, data: cart, message: 'get order successfully!' });
    } catch (error) {
        console.error("Error in incrementBackend:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};



const clearCartBackend = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ status: false, message: 'cart not found' });
        }
        if (cart) {
            cart.items = []
        }

        await cart.save();
        return res.status(200).json({ status: true, data: cart, message: 'cart have been cleared!' });
    } catch (error) {
        console.error("Error in incrementBackend:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};


const removeItemBackend = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const cart = await Cart.findOne({ user: userId });
        // console.log(cart, 'cart-cart');

        if (!cart) {
            return res.status(404).json({ status: false, message: 'item in cart is not found!' });
        }

        cart.items = cart.items.filter(itm => itm.book.toString() !== id);

        await cart.save();
        await cart.populate('items.book');
        return res.status(200).json({ status: true, data: cart, message: "Item removed successfully" });
    } catch (error) {
        console.error("Error in incrementBackend:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};





module.exports = {
    incrementBackend,
    decrementBackend,
    getCartBackend,
    clearCartBackend,
    removeItemBackend
}