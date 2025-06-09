const UserModel = require("../../models/blog")

module.exports= (req, res)=>{
    UserModel.findOne({email: req.body.email})
    .then((savedData) =>{
        if(savedData){
            if(req.body.password === savedData.password){
                req.session.userId=savedData._id.toString()
              res.redirect("/")
            }else{
               res.render("error", {message: "Error of /user/login:wrong password"})
            }
            
        }else{
             res.render("error", {message: "Error of /user/login:Doesn't exist the user"})
        }
    })
    .catch(()=>{
         res.render("error", {message: "Error of /user/login:Error occurred"})
    })
}