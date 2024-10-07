import UserModel from '../models/user.model.js';
import { cartModel } from '../models/cart.model.js';

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const newCart = await cartModel.create({ products: [] });

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password, 
            cart: newCart._id 
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({ message: "User registered successfully", user: newUser });
        
    } catch (error) {
        res.status(500).json({ error: "Error registering user: " + error.message });
    }
};
