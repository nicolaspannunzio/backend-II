import { Router } from "express";
import passport from "passport";  

const router = Router();

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

export default router;