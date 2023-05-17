const User = require('../model/User');

const handlePost = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    await User.updateOne({_id: foundUser.id}, { post: req.body.post });
    res.json(foundUser)
   
}

module.exports = {handlePost}