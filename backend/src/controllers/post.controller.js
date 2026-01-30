const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { randomUUID } = require("crypto");

async function postController (req,res){
    const file = req.file
    console.log("file received:",file);

    const base64Image = Buffer.from(file.buffer).toString("base64")
   
    const caption = await generateCaption(base64Image);
    const result= await uploadFile(file.buffer, `${randomUUID()}`)

    const post = await postModel.create({
        caption:caption,
        image: result.url,
        user:req.user._id
    })

   res.status(201).json({
    message:"post created successfully",
    post
   })
}
module.exports={
    postController
}