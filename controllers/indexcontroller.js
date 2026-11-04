import { addFolderInDB,addFileInDB,getFilesById,getFoldersById } from "../db/queries.js";

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

export {getIndexContent,getAddNewFileForm,addFile,getAddNewFolderForm,addFolder};
