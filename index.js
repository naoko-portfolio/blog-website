const express =require("express")
const app = express()
app.use(express.urlencoded({extended: true}))
const mongoose=require("mongoose")
const session =require("express-session")
const routers=require("./routes")

app.set("view engine", "ejs")
app.use(express.static("public"))

//Session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000},
}))

//Connecting to MongoDB
mongoose.connect("mongodb+srv://naokomca:4DV3wwzaOzYdu5iD@cluster0.cedhibt.mongodb.net/blogUserDatabase?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Success: Connected to MongoDB")
})
.catch((error)=>{
    console.error("Failure: Unconnected to Mongo DB")
})

app.use(routers)

//Page NotFound
app.get("*", (req, res)=>{
    res.render("error", {message: "The page doesn't exist"})
})

//Connecting to port
const port = process.env.PORT || 3000

app.listen(port, ()=>{

    console.log(`Listening on ${port}`)
})
