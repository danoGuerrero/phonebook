const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

const postController = require('../controllers/postController');

router.get('/', postController.baseRoute);
router.get('/getPosts', postController.getPosts);
router.post('/create', jsonParser, postController.createPost);
router.get('/getPost/:id', postController.getSinglePost);
router.put('/post/:id/update', jsonParser, postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;
