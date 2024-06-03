export function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
}


export function isAdmin(req, res, next){
    if (req.session.type === "admin") {
        return next();
    } else {
        res.status(401).json({ error: 'You are not admin' });
    }
}