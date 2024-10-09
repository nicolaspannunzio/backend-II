import { Router } from "express";
import passport from "passport";

const router = Router();

const isAuthenticated = (req, res, next) => {
    if (req.cookies.coderCookieToken) {
        return next();
    }
    res.redirect("/"); 
};

router.get("/", (req, res) => {
    if (req.cookies.coderCookieToken) {
        return res.redirect("/api/sessions/current");
    }
    res.render("login");
});

router.get("/register", (req, res) => {
    if (req.cookies.coderCookieToken) {
        return res.redirect("/api/sessions/current");
    }
    res.render("register");
});

router.get("/profile", passport.authenticate("current", { session: false }), (req, res) => {
    res.render("profile", { user: req.user });
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        return res.status(200).render("realTimeProducts", { title: "Real Time Products" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "There was an error on the server" });
    }
});

export default router;