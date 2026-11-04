import { Router } from "express";
import { getLoginForm } from "../controllers/logincontroller.js";
import passport from "passport";

const loginRouter = Router();

loginRouter.get("/",getLoginForm);
loginRouter.post("/",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/log-in",
    failureMessage:true,
}));

export default loginRouter;