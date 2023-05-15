const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if(!users) return res.send(204).json({'message': 'no users found'});
    res.json(users);

}
const deleteUser = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message': 'user id required'});

    const user = await User.findOne({_id: req.body.id}).exec();
    if(!user) return res.status(204).json({"message": `No user matches ID ${req.body.id}`});
    const result = await user.deleteOne({_id: req.body.id});
    
    res.json(result);
}

const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'user id required'});
    const user = await User.findOne({_id: req.params.id}).exec();
    if(!user) return res.status(204).json({'message': 'no user with specified id'});
    res.json(user);
}

module.exports = {getAllUsers, deleteUser, getUser }