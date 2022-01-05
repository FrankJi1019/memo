const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
})

const Memo = mongoose.model('memo', memoSchema)

module.exports = Memo