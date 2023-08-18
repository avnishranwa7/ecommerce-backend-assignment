import express from 'express';

import isAuth from '../middlewares/is-auth.js';
import { getCategories, getProductList, createProduct, getProductDetail } from '../controllers/ecommerce.js';

const router = express.Router();

router.get('/categories', isAuth, getCategories);
router.get('/product-list/:categoryId', isAuth, getProductList);
router.get('/product/:productId', isAuth, getProductDetail);
router.post('/create-product', isAuth, createProduct);

export default router;