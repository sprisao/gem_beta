const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = mongoose.Schema({
    // 이곳에 필드 설정

    //작성자, User에 가서 내용을 불러온다.
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title: {
        type:String,
        maxlength: 50
    },
    description : {
        type:String,
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }


}, { timestamps: true})

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }