const mongoose = require('mongoose');

const categorySchema = mongooseSchema({
    name: String,
    descritpion: String,
    age: Number,
    type: String
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel