const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo db conncetd')
    }catch(err){
        console.error('Mongo db connection failed',err);
        process.exit(1)
    }
}

module.exports = connectDB