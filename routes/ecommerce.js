import express from 'express';

import isAuth from '../middlewares/is-auth.js';
import { getCategories, getProductList, createProduct, getProductDetail, placeOrder, getOrderHistory, getOrder } from '../controllers/ecommerce.js';
import { addToCart, getCart, updateProductQuantity, removeProductFromCart } from '../controllers/cart.js';

const router = express.Router();

router.get('/categories', isAuth, getCategories);
router.get('/product-list/:categoryId', isAuth, getProductList);
router.get('/product/:productId', isAuth, getProductDetail);
router.get('/cart', isAuth, getCart);
router.get('/order-history', isAuth, getOrderHistory);
router.get('/order/:orderId', isAuth, getOrder);
router.post('/create-product', isAuth, createProduct);
router.post('/cart/add-to-cart', isAuth, addToCart);
router.post('/cart/update-product', isAuth, updateProductQuantity);
router.post('/cart/remove-product', isAuth, removeProductFromCart);
router.post('/place-order', isAuth, placeOrder);

export default router;