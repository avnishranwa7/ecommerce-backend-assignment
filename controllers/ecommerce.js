import Category from '../models/category.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import User from '../models/user.js';

const CATEGORIES_PER_PAGE = 5;

export const getCategories = async (req, res, next) => {
    const currentPage = req.query.page || 1;

    try {
        const categories = await Category.find()
            .skip((currentPage - 1) * CATEGORIES_PER_PAGE)
            .limit(CATEGORIES_PER_PAGE);

        res.status(200).json({
            message: 'Fetched categories',
            count: categories.length,
            categories
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const getProductList = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            const error = new Error('No such category found.');
            error.statusCode = 401;
            throw error;
        }

        const products = await Product.find({ category: categoryId })
            .select('title price description availability');

        res.status(201).json({
            category: category.name,
            products
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const getProductDetail = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId)
            .populate({ path: 'createdBy', select: 'email name -_id' })
            .populate({ path: 'category', select: 'name -_id' });
        if (!product) {
            const error = new Error('No such product id.')
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({
            product
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    const userId = req.userId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const availability = req.body.availability;
    const categoryName = req.body.category;

    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            const error = new Error('No such category found.');
            error.statusCode = 401;
            throw error;
        }

        const categoryId = category._id;
        const product = new Product({
            createdBy: userId,
            title,
            price,
            description,
            availability,
            category: categoryId
        });

        const result = await product.save();
        res.status(201).json({
            message: 'New product created',
            product
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const placeOrder = async (req, res, next) => {
    const user = await User.findById(req.userId)
        .populate({ path: 'cart.items.product', select: '-availability -category -createdBy -_id -__v' });

    let amount = 0;
    const products = user.cart.items.map(item => {
        amount += item.product.price * item.quantity;
        return { product: item.product._doc, quantity: item.quantity };
    });
    console.log('yoo');
    console.log(products);

    const order = new Order({
        products,
        amount,
        user: {
            email: user.email,
            userId: req.userId
        }
    });

    await order.save();
    await user.clearCart();
    res.status(201).json({
        message: 'Order placed.',
        order
    });
}

export const getOrderHistory = async (req, res, next) => {
    const orders = await Order.find({ 'user.userId': req.userId })
        .select('-user -products._id');

    const result = orders.map(order => {
        return { _id: order._id, items: order.products.length, amount: order.amount };
    })

    res.status(201).json({
        orders: result
    });
}

export const getOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    const orders = await Order.findById({ 'user.userId': req.userId, '_id': orderId })
        .select('-_id -__v -user -products._id');

    res.status(201).json({
        orders
    });
}