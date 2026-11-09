import { prisma } from "../lib/prisma.js";

async function addUserInDB(username,password) {
    await prisma.users.create({
        data:{
            username : username,
            password : password
        }
    });
};
async function addFileInDB(originalname,path,mimetype,size,userId) {
    await prisma.files.create({
        data:{
            originalname : originalname,
            filepath : path,
            mimetype : mimetype,
            size : size,
            userid : userId,
        }
    });
}
async function addFolderInDB(userId,name) {
    await prisma.folders.create({
        data:{
            name : name,
            userid : userId 
        }
    });
}
async function getFilesById(userId) {
    const files = await prisma.files.findMany({
        where:{
            userid:userId,
            folderid:null
        }
    });
    return files;
}
async function getFoldersById(userId) {
    const folders = await prisma.folders.findMany({
        where:{
            userid:userId
        }
    });
    return folders;
}
async function getUserById(id) {
    const user = await prisma.users.findUnique({
        where:{
            id:id
        }
    })
    return user;
};
async function getUserByUsername(username) {
    const user = await prisma.users.findUnique({
        where:{
            username:username
        }
    })
    return user;
}
async function getFileInfoFromdb(id) {
    const file = await prisma.files.findUnique({
        where:{
            id:id
        }
    });
    return file;
}
async function getFileInFolderFromdb(id) {
    const files = await prisma.files.findMany({
        where:{
            folderid:id
        }
    });
    return files;
}
async function addFileInFolderIndb(originalname,path,mimetype,size,userId,folderId) {
    await prisma.files.create({
        data:{
            originalname : originalname,
            filepath : path,
            mimetype : mimetype,
            size : size,
            userid : userId,
            folderid : folderId
        }
    });
}
export {addUserInDB,getUserById,getUserByUsername,addFileInDB,addFolderInDB,getFilesById,getFoldersById,getFileInfoFromdb,getFileInFolderFromdb,addFileInFolderIndb};