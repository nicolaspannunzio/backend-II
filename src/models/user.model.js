import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String , unique: true, required: true },
    age: { type: Number },
    password: { type: String },
    role: { type: String ,
            enum: ["admin", "user"],
            default: "user" },
    cart: { type: mongoose.Schema.Types.ObjectId,
            ref: 'carts' }
}, { timestamps: true });

const userModel = mongoose.model(userCollection, userSchema);

export default userModel; 