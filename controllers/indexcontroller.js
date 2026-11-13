import { addFolderInDB,addFileInDB,getFilesById,getFoldersById,getFileInfoFromdb,getFileInFolderFromdb,addFileInFolderIndb,getFileDetailsFromDB } from "../db/queries.js";
import { supabase } from "../config/supabase.js";
import path from "node:path";
import {randomUUID} from "node:crypto";

async function uploadToSupabase(file, userId, folderId = null) {
    const safeName = file.originalname.replace(/[\\/]/g, "_");

    const storagePath = [
        userId,
        ...(folderId ? [String(folderId)] : []),
        `${randomUUID()}-${safeName}`
    ].join("/");

    const { data, error } = await supabase.storage
        .from("file-uploader")
        .upload(storagePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });

    if (error) throw error;

    return data.path;
}
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
    let storagePath;
    try{
        const file = req.file;
        const {id} = req.user;
        storagePath = await uploadToSupabase(file,id);
        await addFileInDB(file.originalname,storagePath,file.mimetype,file.size,id); 
    }catch(err) {
        if(storagePath) {
            await supabase.storage.from("file-uploader").remove([storagePath]);
        }
        return next(err);
    }
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

async function getFileInfoById(req, res, next) {
    try {
        const { fileId } = req.params;

        const file = await getFileInfoFromdb(Number(fileId));

        if (!file || String(file.userid) !== String(req.user.id)) {
            return res.sendStatus(404);
        }

        const { data, error } = await supabase.storage
            .from("file-uploader")
            .createSignedUrl(file.filepath, 60);

        if (error) throw error;

        res.redirect(data.signedUrl);

    } catch (err) {
        next(err);
    }
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
    let storagePath;
    try{
        const {folderId} = req.params;
        const file = req.file;
        const {id} = req.user;
        storagePath=await uploadToSupabase(file,id,folderId);
        await addFileInFolderIndb(file.originalname,storagePath,file.mimetype,file.size,id,Number(folderId)); 
    }catch(err) {
        if(storagePath) {
            await supabase.storage.from("file-uploader").remove([storagePath]);
        }
        return next(err);
    }
    res.redirect(`/folder/${folderId}`);
}
async function getFileDetails(req,res) {
    const {fileId} = req.params;
    const {originalname,size} = await getFileDetailsFromDB(Number(fileId));
    res.render("details",{originalname,size,fileId});
}

async function sendFileToDownload(req, res, next) {
    try {
        const { fileId } = req.params;

        const file = await getFileInfoFromdb(Number(fileId));

        if (!file || String(file.userid) !== String(req.user.id)) {
            return res.sendStatus(404);
        }

        const { data, error } = await supabase.storage
            .from("file-uploader")
            .createSignedUrl(
                file.filepath,
                60,
                { download: file.originalname }
            );

        if (error) throw error;

        res.redirect(data.signedUrl);

    } catch (err) {
        next(err);
    }
}


export {getIndexContent,getAddNewFileForm,addFile,getAddNewFolderForm,addFolder,getFileInfoById,getFilesInFolder,getAddNewFileFormInFolder,addFileInFolder,getFileDetails,sendFileToDownload};
