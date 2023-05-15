const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken !!! 
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;
    //is refresh token in db?
    const foundUser = await User.findOne({ refreshToken}).exec();

    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204); 
    }
    

    //Delete the refresh token in db

    foundUser.refreshToken = '';
    const result = foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true}); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }