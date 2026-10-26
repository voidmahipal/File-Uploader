import { prisma } from "../lib/prisma.js";

async function addUserInDB(username,password) {
    await prisma.users.create({
        data:{
            username : username,
            password : password
        }
    });
};
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

export {addUserInDB,getUserById,getUserByUsername};