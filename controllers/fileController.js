const Post = require('../model/PostModel');


const handleFile = async (req, res) => {
    try {
        const newImage = await Post.create(req.body)
        newImage.save();
        res.status(201).json({"msg": "new image uploaded !"})
    }

    catch (err){
        res.status(409).json({"msg": error.message})
    }

}
const deleteFile = async (req, res) => {
    if(!req?.body?.user) return res.status(400).json({'message': 'user required'});
    
    const image = await Post.findOne({ user: req.body.user }).exec();
    if(!image) return res.status(204).json({"message": `No user matches  ${req.body.user}`});
    
   const result = await image.deleteOne({user: req.body.user});
    
    res.json(result);
}
const getFile = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'user id required'});
    const image = await Post.findOne({_id: req.params.id}).exec();
    if(!image) return res.status(204).json({'message': 'no user with specified id'});
    res.json(image);
}

const putFile = async (req, res, next) => {
    try{
    
     const file = await Post.findOne({_id: req.params.id}).exec();
     if(!file) return res.status(204).json({"message": "no user matches this id"});
     else{
         let updatedFile = await Post.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
             runVaidator: true
         })
 
     }
 
         res.json({
             success: false,
             message: 'updated success',
             comment: updatedComment
         })
     }
     catch(err) {
         res.status(500)
     }
    
}


module.exports = {handleFile, deleteFile, getFile, putFile}