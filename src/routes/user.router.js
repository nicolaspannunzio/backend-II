import { Router } from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"; 
import passport from "passport";
import { createHash, isValidPassword } from "../utils/util.js";

const router = Router(); 

router.post("/register", async (req, res) => {
    let {user, password} = req.body; 

    if (!user || !password) {
        return res.status(400).send("User and password are required");
    }

    try {
        const userexists = await userModel.findOne({user}); 

        if (userexists) {
            return res.status(400).send("The user already exists");
        }

        const newuser = new userModel({
            usuario, 
            password: createHash(password)
        });

        await newuser.save(); 

        const token = jwt.sign({user: newuser.user}, "coderhouse", {expiresIn: "1h"}); 

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true
        })

        res.redirect("/api/sessions/current"); 

    } catch (error) {
        res.status(500).send("Internal server error"); 
    }
})

router.post("/login", async (req, res) => {
    let {user, password} = req.body; 

    if (!user || !password) {
        return res.status(400).send("User and password are required");
    }

    try {
        const userfound = await userModel.findOne({ user }); 

        if (!userfound) {
            return res.status(401).send("Unidentified user"); 
        }

        if(!isValidPassword(password, userfound)) {
            return res.status(401).send("Invalid password"); 
        }

        const token = jwt.sign({ usuario: userfound.user, role: userfound.role }, "coderhouse", {expiresIn: "1h"}); 

         res.cookie("coderCookieToken", token, {
             maxAge: 3600000, 
             httpOnly: true
         })
 
         res.redirect("/api/sessions/current"); 


    } catch (error) {
        res.status(500).send("Internal server error"); 
    }
});

router.get("/profile", passport.authenticate("current", {session: false}), (req, res) => {
    res.render("profile", { user: req.user.user }); 
});

router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken"); 
    res.redirect("/login"); 
});

router.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Access denied"); 
    }

    res.render("admin");
});

export default router; 