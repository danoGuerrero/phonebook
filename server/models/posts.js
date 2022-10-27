const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const PostsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
});

module.exports = mongoose.model('posts', PostsSchema);
