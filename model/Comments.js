
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema =new Schema({
    text: String,
    commentor: String,
    commentedOn: String,
    date: String

})

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema)