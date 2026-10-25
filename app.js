import express from "express";
import "dotenv/config";

const app = express();

app.get("/",(req,res)=>{
    res.send("Hii");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) {
        console.error(err);
        return;
    }
    console.log("Server is listening at PORT",PORT);
});