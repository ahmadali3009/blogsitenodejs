let user = require('../models/user') 
let {Router} = require('express');

let router = Router();

router.get('/signup' , (req , res) => 
{
    res.render('signup')
})
router.get('/signin' , (req , res)=>
{
    res.render('signin')
})

router.post('/signup' , async (req , res) => 
{   let{ fullName, email, password } = req.body
    await user.create({fullName , email , password})

    return res.redirect('/')
})
router.post('/signin' , async(req , res) =>
{
    let{email , password} = req.body
    try{
    let token = await user.matchPassword(email , password)
    return res.cookie("token" , token).redirect('/')
    }
    catch(error)
    {
        return res.render('signin' , {error : "incorrect email or password"})

    }
})
router.get('/logout' , (req ,res) => 
{
    res.clearCookie('token').redirect('/')
})

module.exports = router;