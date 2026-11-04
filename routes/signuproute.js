import { Router } from "express";
import { getSignupForm,createUser } from "../controllers/signupcontroller.js";

const signupRouter = Router();

signupRouter.get("/",getSignupForm);
signupRouter.post("/",createUser);

export default signupRouter;