function logUserOut(req,res) {
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
};

export {logUserOut};