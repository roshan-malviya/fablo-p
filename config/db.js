const mongoose = require('mongoose')
const config = require("config")

const url = config.get('mongoURI')

const connectDB = async() => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true            
        });
        console.log('MongoDB is now working....')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
