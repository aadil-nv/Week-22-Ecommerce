const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; 
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgBrightMagenta
.bold.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;