import { Router } from "express";
import { getIndexContent,getLoginForm,getSignupForm,createUser } from "../controllers/indexcontroller.js";
import passport from "passport";

const indexRouter = Router();

indexRouter.get("/",getIndexContent);
indexRouter.get("/log-in",getLoginForm);
indexRouter.get("/sign-up",getSignupForm);

indexRouter.post("/sign-up",createUser);
indexRouter.post("/log-in",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/log-in",
    failureMessage:true,
}));

export default indexRouter;