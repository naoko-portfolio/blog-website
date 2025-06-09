const UserModel = require("../../models/blog")

module.exports= (req, res)=>{
    UserModel.create(req.body)
    .then(() =>{
       res.redirect("/user/login")
    })
    .catch((error)=>{
         res.render("error", {message: "Error of /user/create"})
    })
}