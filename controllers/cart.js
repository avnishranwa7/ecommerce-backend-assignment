import Product from '../models/product.js';
import User from '../models/user.js';

export const addToCart = async (req, res, next) => {
    const productId = req.body.productId;

    try {
        const user = await User.findById(req.userId);
        const result = await user.addToCart(productId);
        res.status(201).json({
            message: 'Product added to cart',
            productId,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
            .populate({ path: 'cart.items.product', select: 'title price description -_id' })
            .select('-cart.items._id');
        const cart = user.cart.items;
        res.status(200).json({
            cart
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const updateProductQuantity = async (req, res, next) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    console.log(productId);
    console.log(quantity);

    try {
        const user = await User.findById(req.userId);
        const result = await user.updateProductQuantity(productId, quantity);
        res.status(201).json({
            message: 'Product quantity updated.',
            product: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const removeProductFromCart = async (req, res, next)=>{
    const productId = req.body.productId;

    try{
        const user = await User.findById(req.userId);
        await user.removeProductFromCart(productId);
        res.status(201).json({
            message: 'Product removed from cart',
            productId
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}