const { randomBytes, createHmac } = require('node:crypto');
let { Schema , model, default: mongoose } = require("mongoose")
let {genrateUserToken} = require('../services/authentication')
let userSchema = new Schema(
    {
        fullName : {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        salt: {
            type: String,
          
        },
        password: {
            type: String,
            required: true,
        },
        profileImageUrl: {
            type: String,
            default: "/images/default.png",
        },
        role: {
            type: String,
            enum: ['USER' , 'ADMIN'],
            default: "USER",
        },

    },
    {timestamps : true}
)

userSchema.pre('save' , function(next)
{
    let user = this;

    if (!user.isModified('password')) return;
    let salt = randomBytes(16).toString();
    let hashedPassword = createHmac('sha256' , salt)
    .update(user.password).digest('hex')
    this.salt = salt;
    this.password = hashedPassword;
    next();
})

userSchema.static('matchPassword' ,async function (email , password)
{
    
    let user = await this.findOne({email});
    if(!user) throw new Error('user not found');
    let salt = user.salt
    let hashedPassword = user.password;
    let userprovidedHash = createHmac('sha256' , salt)
    .update(password)
    .digest('hex');
    if (hashedPassword !== userprovidedHash) throw new Error('incorrect password');
    let token = genrateUserToken(user);
    return token
})

let user = mongoose.model('user' , userSchema)

module.exports = user;