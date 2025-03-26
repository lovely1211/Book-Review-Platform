const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Mongodb connection error'});
        process.exit(1);
    }
}

module.exports = connectDB;