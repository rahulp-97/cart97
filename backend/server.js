const express = require('express');
require('dotenv').config({path: '../.env'});
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000;

connectDB();    //connect to MongoDB

const app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});