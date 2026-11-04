import bcrypt from "bcryptjs";
import { addUserInDB } from "../db/queries.js";

function getSignupForm(req,res) {
    res.render("sign-up");
}
async function createUser(req,res) {
    const {username,password,confirmpassword} = req.body;
    if(password!==confirmpassword) {
        return res.render("sign-up");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await addUserInDB(username,hashedPassword);
    res.redirect("/log-in");
}
export {getSignupForm,createUser};