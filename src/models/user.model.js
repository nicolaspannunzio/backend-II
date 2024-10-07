import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
});
    
const userModel = mongoose.model(userCollection, userSchema);

export default userModel; 