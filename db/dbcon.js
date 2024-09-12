import mongoose from "mongoose";

const dbConn = async () => {
    try {
        const dbcond = await mongoose.connect('mongodb+srv://admin:admin@azure-node.sapmj.mongodb.net/?retryWrites=true&w=majority&appName=azure-node');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', err);
    }
}

export default dbConn;