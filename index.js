import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import eCommerceRouter from './routes/ecommerce.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/ecommerce', eCommerceRouter);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(statusCode).json({ message, data });
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err));