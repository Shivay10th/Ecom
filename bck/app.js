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

//Port

const PORT = process.env.PORT || 5000;

//Connection

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('DB CONNECTED.'))
	.catch(() => console.log('Oops1'));

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//My Routes

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

app.listen(process.env.PORT, () => console.log(`app is running at ${PORT}`));
