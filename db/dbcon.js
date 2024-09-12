import mongoose from "mongoose";

const dbConn = async () => {
    try {
        const dbcond = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', err);
    }
}

export default dbConn;