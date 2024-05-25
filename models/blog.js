let { Schema , model} = require("mongoose")
let blogSchema = new Schema(
{   Title : {
        type: String,
        required: true,
    },
    body : {
        type: String,
        required: true,
    },
    coverImageUrl : {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
{timestamps : true}
)

let blog = model("blog" , blogSchema)

module.exports = blog;