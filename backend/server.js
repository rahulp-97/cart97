const express = require('express');
require('dotenv').config({path: '../.env'});
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000;

connectDB();    //connect to MongoDB

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});