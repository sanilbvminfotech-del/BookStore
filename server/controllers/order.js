const Address = require("../model/address");
const Book = require("../model/book");
const Cart = require("../model/cart");
const Order = require("../model/order");



const createUserOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { phone, pincode, city, state, addressLine } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate('items.book');

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ status: false, message: 'Your cart is empty!' });
        }

        const orderItems = [];
        for (const item of cart.items) {
            if (item.book.stock < item.quantity) {
                return res.status(404).json({ status: false, message: 'this book is out of stock!' })
            }
            orderItems.push({
                book: item.book._id,
                title: item.book?.title,
                quantity: item?.quantity,
                price: item.book?.price,
                oldPrice: item.book?.oldPrice,
                bookImage: item.book?.bookImage,
                stock: item.book?.stock
            })
            // await Book.findByIdAndUpdate(item.book._id, { $inc: { stock: -item.quantity } }, { new: true })
        }


        const totalPrice = cart.items.reduce((item, pri) => item + (pri.book?.price * pri?.quantity), 0);

        const order = await Order.create({ user: userId, items: orderItems, totalAmount: totalPrice })

        // const fullOrderDetails = await Order.findById(order._id).populate('user', 'username email image').populate('items.book', 'title author description price bookImage').lean()

        await order.save();

        const address = await Address.create({ phone, pincode, city, state, addressLine });

        const updateduserDetails = await Order.findByIdAndUpdate(order._id, { $set: { shippingAddress: address._id } }, { new: true }).populate('user').populate('items.book').populate('shippingAddress');

        // await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }, { new: true });

        return res.status(200).json({ status: true, data: updateduserDetails, message: 'checkout successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



const getUserOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.book').sort({ createdAt: -1 }).lean();
        if (orders.length === 0) {
            return res.status(200).json({ status: true, data: { items: [] }, message: 'have no orders!' });
        }

        return res.status(200).json({ status: true, data: orders, message: 'checkout successfully!' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



module.exports = {
    createUserOrder,
    getUserOrder
}