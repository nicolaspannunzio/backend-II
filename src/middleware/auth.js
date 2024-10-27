export function soloAdmin(req, res, next) {
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(403).send("Access denied, this place is for admins only.");
    }
}

export function soloUser(req, res, next) {
    if (req.user.role === "user") {
        next();
    } else {
        res.status(403).send("Access denied, this place is for regular users only.");
    }
}
