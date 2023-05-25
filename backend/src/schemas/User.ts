// --- Imports
import mongoose, { Schema } from "mongoose";


// --- Define the schemas
const bookSchema = new Schema({
    title: {
        type: String,
        default: "New Book"
    },
    text: {
        type: String,
    },
    age: {
        type: Number,
    }
});

const userSchema = new Schema({
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
    password: {
        type: String,
        required: true,
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
    books: {
        type: [bookSchema]
    }
});


// Export schema
export default mongoose.model('User', userSchema);