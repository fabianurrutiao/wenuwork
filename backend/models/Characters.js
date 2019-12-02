const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    id_char: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = Character = mongoose.model('Character', characterSchema);