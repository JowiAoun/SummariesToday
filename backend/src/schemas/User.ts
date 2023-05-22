// --- Imports
import mongoose from "mongoose";


// --- Define the schemas
const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});

const userSchema = new mongoose.Schema({
    username: { // TODO: Allow no special characters and add max/min length
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    },
    country: {
        type: String,
        required: true
    },
    settings: {
        type: String
    },
    documents: {
        type: [documentSchema]
    }
});


// Export schema
export default mongoose.model('User', userSchema);