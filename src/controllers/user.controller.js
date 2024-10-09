import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import { cartModel } from '../models/cart.model.js';

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.coderCookieToken; 

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret"); 
        const user = await UserModel.findById(decoded.id); 

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next(); 
    } catch (error) {
        res.status(500).json({ error: "Error authenticating user: " + error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const newCart = await cartModel.create({ products: [] });

        const hashedPassword = bcrypt.hashSync(password, 10); 

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword, 
            cart: newCart._id
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
        
    } catch (error) {
        res.status(500).json({ error: "Error registering user: " + error.message });
    }
};

export const getCurrentUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    res.status(200).json({ user: req.user });
};