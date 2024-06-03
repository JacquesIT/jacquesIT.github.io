import users from "../data/user_data.js"
 
export function checkLogin(req, res){
    const foundUser = users.find((u) => u.email == req.body.email);

    if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
    }

    if (foundUser.password === req.body.password){
        req.session.userId = foundUser.id
        req.session.authenticated = true
        req.session.type = foundUser.type
        return res.status(201).json(foundUser);
    }

    return res.status(401).json( {error: "Incorrect password"});
}

export function logout(req, res){
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.status(201).json({ message: 'Logout successful' });
    });
}