import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.DB_URI;
        const result = await mongoose.connect(uri);
        console.log(result.models);
        console.log('Data Base connected Successfully :)');
    }
    catch(err){ 
        console.log(`Fail to connected to the Data Base`,err);
        
    }
}

export default connectDB;