import users from "../data/user_data.js"
import {getHighestIdOfDataSet} from "../utils/utils.js"


export function getAllUsers(req, res) {
    if (users.length != 0) res.json(users);
}


export function getUserByEmail(req, res){
    const foundUser = users.find((u) => u.email == req.params.email);

    if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json(foundUser);
}


export function addUser(req, res) {
    const user = users.find((u) => u.email == req.body.email);

    if (user) return res.status(400).json({ error: 'User already exists' });

    req.body.type = "user"
    users.push(req.body);

    return res.status(201).json(req.body);
}


export function updateUser(req, res){
    const foundUser = users.find((u) => u.email == req.params.email);

    if (foundUser) {
        if (req.body.name) foundUser.name = req.body.name;
        if (req.body.surname) foundUser.surname = req.body.surname;
        if (req.body.email) foundUser.email = req.body.email;
        if (req.body.password) foundUser.password = req.body.password;
        res.status(200).json({message: `User is successfully updated`});
    } else {
        res.status(404).json({error: `User is not found`});
    }
}


export function deleteUser(req, res){
    const foundUser = users.find((u) => u.email == req.params.email);

    if (foundUser !== -1) {
        users.splice(foundUser, 1);
        res.status(200).json({message:`User is successfully deleted`});
    } else {
        res.status(404).json({error: `User provided is not found`});
    }
}