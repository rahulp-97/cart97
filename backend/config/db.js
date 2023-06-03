const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB connected: ${conn.connection.host}`);
    } catch(error){
        console.log(`Mongo DB ERROR: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;