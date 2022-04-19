/** @format */
require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

//Port

const PORT = process.env.PORT || 5000;

//Connection

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('DB CONNECTED.'))
	.catch((e) => console.log('Oops1', e));

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//My Routes

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => console.log(`app is running at ${PORT}`));
