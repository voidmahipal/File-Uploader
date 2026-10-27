import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import session from "express-session";
import "./config/passport.js";
import passport from "passport";
import indexRouter from "./routes/indexroutes.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,

        cookie:{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        },
        store:new PrismaSessionStore(prisma,{
            checkPeriod:2*60*1000,
            dbRecordIdIsSessionId:true
        })
    })
);
app.use(passport.session());

app.use("/",indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) {
        console.error(err);
        return;
    }
    console.log("Server is listening at PORT",PORT);
});