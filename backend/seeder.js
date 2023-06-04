const mongoose = require('mongoose');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

require('dotenv').config({path: '../.env'});
connectDB();

// import data to mongoDB 
const importData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        });
        await Product.insertMany(sampleProducts);
        console.log(`data imported!`);
        process.exit();
    } catch(error){
        console.log(`error while importing data ${error}`);
        process.exit(1);
    }
}

// delete data from mongoDB
const destroyData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log(`data destroyed`);
    } catch(error){
        console.log(`failed to destroy data ${error}`);
        process.exit(1);
    }
}

// destroy data & import data terminal commands:-
if(process.argv[2] === 'd'){
    destroyData();  //destroying all data by adding 'd' in nodemon seeder.js d
}
else{
    importData();   //importing data by nodemon seeder.js
}