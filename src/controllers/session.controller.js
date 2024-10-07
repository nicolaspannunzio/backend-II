import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { cartModel } from '../models/cart.model.js';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).redirect('/login');
        }
        
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).redirect('/login');
        }

        const token = jwt.sign(
            {
                email: user.email,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age
            }, 
            process.env.JWT_SECRET || "coderhouse", 
            { expiresIn: "1h" } 
        );

        res.cookie("coderCookieToken", token, { 
            maxAge: 3600000, 
            httpOnly: true
        });

        if (!user.cart) {
            const newCart = await cartModel.create({ products: [] });
            user.cart = newCart._id;
            await user.save();
        }

        res.redirect('/'); 

    } catch (error) {
        res.status(500).json({ error: "Login error: " + error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const newCart = await cartModel.create({ products: [] });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,  
            cart: newCart._id, 
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ error: "Registration error: " + error.message });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect('/login');
};

export const getCurrentUser = (req, res) => {
    try {
        const token = req.cookies.coderCookieToken; 

        if (!token) {
            return res.status(401).redirect('/login'); 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "coderhouse");

        res.status(200).render('userProfile', { user: decoded }); 
    } catch (error) {
        return res.status(500).send("Error getting information from the user: " + error.message);
    }
};