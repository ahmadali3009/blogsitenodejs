require("dotenv").config();

let express = require('express')
let blog  = require('./models/blog')
let path = require('path')
let cookieParser = require('cookie-parser')
let userRouter = require('./routes/user')
let blogRouter = require('./routes/blog')
let connect = require('./connection')
const cheakAuthenticationUser = require('./middleware/authentication')
const user = require('./models/user')
let PORT = process.env.PORT || 8000;
server = express()

connect(process.env.MONGO_URL).then(()=>{console.log("connection connected")}).catch((err)=>{console.log(err)})

server.set('view engine' , "ejs")
server.set('views' , path.resolve('./views'))

server.use(cookieParser())
server.use(cheakAuthenticationUser('token'))
server.use(express.urlencoded({extended : false}))
server.use(express.static(path.resolve("./public")))

server.get('/' , async (req , res)=>
{
    let allBlogs = await blog.find({})
    
    res.render('index' , {
        user: req.user,
        blogs: allBlogs,
    })
})

server.use('/blog' , blogRouter)
server.use('/user' , userRouter)
server.listen(PORT ,()  => {
    console.log("the server is running port:8000")
})