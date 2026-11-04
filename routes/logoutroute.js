import { Router } from "express";
import { logUserOut } from "../controllers/logoutcontroller.js";

const logOutRouter = Router();

logOutRouter.post("/",logUserOut);

export default logOutRouter;