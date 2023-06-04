const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema =new Schema({
    File:{
        type: String,
        default: ""
    },
    user: String,
    title: {
        type: String,
        default: ""
    },
    comment:{
        type: String,
        default: ""
    },
    date: String
});

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema)