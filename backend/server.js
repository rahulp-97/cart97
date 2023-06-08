const express = require('express');
const cookieParser =  require('cookie-parser');
require('dotenv').config({path: '../.env'});
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000;

connectDB();    //connect to MongoDB

const app = express();

app.use(cors({origin:'http://localhost:3000',credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});