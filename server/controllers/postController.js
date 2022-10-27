const mongoose = require('mongoose');
const Posts = mongoose.model('posts');

exports.baseRoute = async (req, res) => {
    res.send('Server Running');
};

exports.getPosts = async (req, res) => {
    const posts = await Posts.find({});
    res.json(posts);
};

exports.createPost = async (req, res) => {
    new Posts(req.body).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong ...",
            });
        } else {
            res.status(200).json({
                message: "Post Created",
                data,
            });
        }
    });
}

exports.getSinglePost = async (req, res) => {
    let postId = req.params.id;

    Posts.findById({ _id: postId }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong ...",
            })
        } else {
            console.log(data);
            res.status(200).json({
                message: "Post Found",
                data,
            })
        }
    });
};

exports.updatePost = async (req, res) => {
    let postId = req.params.id;

    Posts.findByIdAndUpdate({ _id: postId }, { $set: req.body }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong ...",
            })
        } else {
            res.status(200).json({
                message: "Post Updated",
                data,
            })
        }
    });
};

exports.deletePost = async (req, res) => {
    let postId = req.params.id;

    Posts.deleteOne({ _id: postId }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong ...",
            })
        } else {
            console.log(data);
            res.status(200).json({
                message: "Post Deleted",
                data,
            })
        }
    });
};
