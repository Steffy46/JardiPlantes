const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    token: String,
    status: {
        type: String,
        enum: ['client', 'admin']
    },
    // favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]

})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;