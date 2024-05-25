let { Schema , model} = require("mongoose")
let commentSchema = new Schema({
    content: {type : String},
    blogId: {type : Schema.Types.ObjectId,
             ref: 'blog'},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },


},
{timestamps : true})

let comment = model("comment" , commentSchema)

module.exports = comment;