let { Router } = require('express');
let router = Router();
let blog = require('../models/blog') 
let multer = require('multer')
let path = require('path')
let comment = require('../models/comment') 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
        let fileName = `${Date.now()} - ${file.originalname}`
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })
router.get('/addblog', (req, res) => {
    return res.render('addblog', {
        user: req.user
    })
})


router.post('/', upload.single("img"), async (req, res) => {
    
    let {title , body} = req.body
    let file = req.file
   let blogs = await blog.create({
        Title : title,
        body  : body,
        coverImageUrl : `/uploads/${file.filename}`,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${blogs._id}`)
})

router.get("/:id" , async (req , res) => 
{
    let blogs = await blog.findById(req.params.id).populate('createdBy')
   let comments = await comment.find({blogId: req.params.id}).populate('createdBy')
   console.log(comments)
    return res.render("blog" , {user : req.user , blogs , comments})
})

router.post("/comment/:blogId" , async (req, res) =>
{
    let comments = await comment.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy: req.user._id
        
    })
    return res.redirect(`/blog/${req.params.blogId}`)
} )


module.exports = router;