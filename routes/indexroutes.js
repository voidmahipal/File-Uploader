import { Router } from "express";
import { getIndexContent,getAddNewFileForm,addFile,getAddNewFolderForm,addFolder } from "../controllers/indexcontroller.js";
import passport from "passport";
import { upload } from "../config/multer.js";

const indexRouter = Router({mergeParams:true});

indexRouter.get("/",getIndexContent);
indexRouter.get("/upload",getAddNewFileForm);
indexRouter.get("/:userId/folder",getAddNewFolderForm);

indexRouter.post("/upload",upload.single("file"),addFile);
indexRouter.post("/:userId/folder",addFolder);

export default indexRouter;