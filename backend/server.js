const express = require('express');
const products = require('./data/products');
const port = 5000;

const app = express();

app.get('/', (req, res)=>{
    res.send('API is running');
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});