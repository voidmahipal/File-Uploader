import { Router } from "express";
import { getIndexContent,getLoginForm,getSignupForm,createUser,logUserOut,getAddNewFileForm,addFile } from "../controllers/indexcontroller.js";
import passport from "passport";
import { upload } from "../config/multer.js";

const indexRouter = Router();

indexRouter.get("/",getIndexContent);
indexRouter.get("/log-in",getLoginForm);
indexRouter.get("/sign-up",getSignupForm);
indexRouter.get("/upload",getAddNewFileForm);

indexRouter.post("/sign-up",createUser);
indexRouter.post("/log-in",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/log-in",
    failureMessage:true,
}));

indexRouter.post("/log-out",logUserOut);
indexRouter.post("/upload",upload.single("file"),addFile)


export default indexRouter;