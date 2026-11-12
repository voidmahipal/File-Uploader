import { Router } from "express";
import { getIndexContent,getAddNewFileForm,addFile,getAddNewFolderForm,addFolder,getFileInfoById,getFilesInFolder,getAddNewFileFormInFolder,addFileInFolder,getFileDetails,sendFileToDownload } from "../controllers/indexcontroller.js";
import { upload } from "../config/multer.js";

const indexRouter = Router({mergeParams:true});

indexRouter.get("/",getIndexContent);

indexRouter.get("/upload",getAddNewFileForm);
indexRouter.post("/upload",upload.single("file"),addFile);


indexRouter.get("/:userId/folder",getAddNewFolderForm);
indexRouter.post("/:userId/folder",addFolder);

indexRouter.get("/file/:fileId",getFileInfoById);
indexRouter.get("/folder/:folderId",getFilesInFolder);

indexRouter.get("/upload/:folderId",getAddNewFileFormInFolder);
indexRouter.post("/upload/:folderId",upload.single("file"),addFileInFolder);

indexRouter.get("/detail/:fileId",getFileDetails);
indexRouter.get("/download/:fileId",sendFileToDownload);

export default indexRouter;