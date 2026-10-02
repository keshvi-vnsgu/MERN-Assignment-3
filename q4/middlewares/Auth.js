const validateSession=(req,res,next)=>
{
    if(req.session.username === "admin" && req.session.isLoggedIn)
        next();
    else res.redirect("/login");
}

module.exports = validateSession;