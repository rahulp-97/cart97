const express = require('express');
require('dotenv').config({path: '../.env'});
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const port = process.env.PORT || 8000;

connectDB();    //connect to MongoDB

const app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.send('API is running');
});

app.use('/api/products', productRoutes);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});