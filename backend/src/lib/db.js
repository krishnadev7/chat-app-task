import mongoose from 'mongoose'

export const connectMongoDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDb connected successfully ${db.connection.host}`);
    } catch (error) {
        console.log("mongodb connection error",error);
    }
}