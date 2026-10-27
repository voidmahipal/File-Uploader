import bcrypt from "bcryptjs";
import { addUserInDB } from "../db/queries.js";

function getIndexContent(req,res) {
    res.render("index",{user:req.user});
}
function getLoginForm(req,res) {
    res.render("log-in");
}
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
function logUserOut(req,res) {
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
};
function getAddNewFileForm(req,res) {
    res.render("addnewfileform");
}
function addFile(req,res) {
    res.redirect("/");
}

export {getIndexContent,getLoginForm,getSignupForm,createUser,logUserOut,getAddNewFileForm,addFile};