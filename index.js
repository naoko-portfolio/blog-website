const express =require("express")
const app = express()
app.use(express.urlencoded({extended: true}))
const mongoose =require("mongoose")
const session =require("express-session")

app.set("view engine", "ejs")
app.use(express.static("public"))

//Session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000},
}))

app.use((req, res, next) => {
  res.locals.session = req.session.userId;
  next();
});

//Connecting to MongoDB
mongoose.connect("mongodb+srv://naokomca:4DV3wwzaOzYdu5iD@cluster0.cedhibt.mongodb.net/blogUserDatabase?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Success: Connected to MongoDB")
})
.catch((error)=>{
    console.error("Failure: Unconnected to Mongo DB")
})

//Defining Schema and Model
const Schema= mongoose.Schema
const BlogSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String,

})

const UserSchema=new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

const BlogModel = mongoose.model("Blog", BlogSchema)
const UserModel = mongoose.model("User", UserSchema)

//Create a user
app.get("/user/create", (req, res)=>{
    res.render("userCreate")
})

app.post("/user/create", (req,res)=>{
    UserModel.create(req.body)
    .then(()=>{
       res.redirect("/user/login")
    })
    .catch((error)=>{
        res.render("error", {message: "Error of /user/create"})
    })
})

//Create a blog
app.get("/blog/create", (req, res)=>{
    if(req.session.userId){
        res.render("blogCreate")
    }else{
        res.redirect("/user/login")
    }  
})

app.post("/blog/create", (req, res)=>{
    BlogModel.create(req.body)
    .then(()=>{
        res.redirect("/")
    })
    .catch((error)=>{
        res.render("error", {message: "Error of /blog/create"})
    })   
})

//Read all blogs
app.get("/", async(req, res)=>{
   
    const allBlogs =await BlogModel.find()
    res.render("index", {
        allBlogs: allBlogs,
        session: req.session.userId
    })
})

//Read Single blog

app.get("/blog/:id", async(req, res)=>{
   const singleBlog=await BlogModel.findById(req.params.id)
   res.render("blogRead", {
    singleBlog,
   session: req.session.userId
    });
});

//Update blog
app.get("/blog/update/:id", async(req, res)=>{
   const singleBlog=await BlogModel.findById(req.params.id)
   res.render("blogUpdate", {singleBlog})
});

app.post("/blog/update/:id", (req, res)=>{
    BlogModel.updateOne({_id: req.params.id}, req.body)
    .then(()=>{
        res.redirect("/")
    })
    .catch((error)=>{
         res.render("error", {message: "Error of /blog/update"})
    })
})

//Delete blog
app.get("/blog/delete/:id", async(req, res)=>{
    const singleBlog=await BlogModel.findById(req.params.id)
    res.render("blogDelete", {singleBlog})
})

app.post("/blog/delete/:id", (req, res)=>{
    BlogModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/")
    })
    .catch((error)=>{
         res.render("error", {message: "Error of /blog/delete"}) 
    })
})

//Create user
app.get("/user/create", (req, res)=>{
    res.render("userCreate")
})

//Login
app.get("/user/login", (req, res)=>{
    res.render("login")
})

app.post("/user/login", (req, res)=>{
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
})

//Connecting to port
const port = process.env.PORT || 3000

app.listen(port, ()=>{

    console.log(`Listening on ${port}`)
})
