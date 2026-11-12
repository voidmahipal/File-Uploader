import { addFolderInDB,addFileInDB,getFilesById,getFoldersById,getFileInfoFromdb,getFileInFolderFromdb,addFileInFolderIndb,getFileDetailsFromDB } from "../db/queries.js";
import path from "node:path";

async function getIndexContent(req,res) {
    if(req.user) {
        const {id} = req.user;
        const files = await getFilesById(id);
        const folders = await getFoldersById(id);
        return res.render("index",{user:req.user,files:files,folders:folders});
    }
    res.render("index",{user:req.user});
}
function getAddNewFileForm(req,res) {
    res.render("addnewfileform");
}
async function addFile(req,res) {
    const {originalname,path,mimetype,size} = req.file;
    const {id} = req.user;
    await addFileInDB(originalname,path,mimetype,size,id); 
    res.redirect("/");  
}
function getAddNewFolderForm(req,res) {
    const {userId} = req.params;
    res.render("addnewfolderform",{userId:userId});
}
async function addFolder(req,res) {
    const {userId} = req.params;
    const {name} = req.body;
    await addFolderInDB(Number(userId),name);
    res.redirect("/");
}
async function getFileInfoById(req,res) {
    const {fileId} = req.params;
    const file = await getFileInfoFromdb(Number(fileId));
    res.type(file.mimetype);
    res.sendFile(path.resolve(file.filepath));
}
async function getFilesInFolder(req,res) {
    const {folderId} = req.params;
    const files = await getFileInFolderFromdb(Number(folderId));
    res.render("folder",{files:files,folderId});
}
function getAddNewFileFormInFolder(req,res) {
    const {folderId} = req.params;
    res.render("addfileinfolder",{folderId});
}
async function addFileInFolder(req,res) {
    const {folderId} = req.params;
    const {originalname,path,mimetype,size} = req.file;
    const {id} = req.user;
    await addFileInFolderIndb(originalname,path,mimetype,size,id,Number(folderId)); 
    res.redirect(`/folder/${folderId}`);
}
async function getFileDetails(req,res) {
    const {fileId} = req.params;
    const {originalname,size} = await getFileDetailsFromDB(Number(fileId));
    res.render("details",{originalname,size,fileId});
}
async function sendFileToDownload(req,res) {
    const {fileId} = req.params;
    const file = await getFileInfoFromdb(Number(fileId));
    res.download(path.resolve(file.filepath),file.originalname);
}

export {getIndexContent,getAddNewFileForm,addFile,getAddNewFolderForm,addFolder,getFileInfoById,getFilesInFolder,getAddNewFileFormInFolder,addFileInFolder,getFileDetails,sendFileToDownload};
