const Comment = require('../model/Comments')

const handleComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body)
        newComment.save();
        res.status(201).json({"msg": "new comment uploaded !"})
    }

    catch (err){
        res.status(409).json({"msg": error.message})
    }
}

const deleteComment = async (req, res) => {
    if(!req?.body?._id) return res.status(400).json({'message': 'comment id required'});
    
    const comment = await Comment.findOne({ _id: req.body._id }).exec();
    if(!comment) return res.status(204).json({"message": `No user matches  ${req.body._id}`});
    
   const result = await comment.deleteOne({_id: req.body._id});
    
    res.json(result);
}

const putComment = async (req, res, next) => {
   try{
   
    const comment = await Comment.findOne({_id: req.params.id}).exec();
    if(!comment) return res.status(204).json({"message": "no user matches this id"});
    else{
        let updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
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

    module.exports = {handleComment, deleteComment, putComment}