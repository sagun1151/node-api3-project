const express = require('express');
const { json } = require('express/lib/response');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', logger, async (req, res) => {
  try{
    const user = await Users.get()
    res.json(user)
  }catch(err){
    res.status(500).json()
  }
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
    res.status(200).json(req.user);
});

router.post('/', logger, validateUser, async (req, res, next) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
});

router.put('/:id', logger, validateUserId, validateUser, async (req, res) => {
  try{
    const user = await Users.update(req.params.id, req.body)
    res.status(200).json(user)
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
});

router.delete('/:id', logger, validateUserId, async (req, res) => {
  try{
    const x = await Users.getById(req.params.id);
    const user = await Users.remove(req.params.id);
    res.json(x)
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res) => {
  try{
    const userPost = await Users.getUserPosts(req.params.id)
    res.status(200).json(userPost)
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
});

router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const post = await Posts.insert({
      user_id: req.params.id,
      text: req.text
      });
    res.status(201).json(post);
  } catch (err){
    res.status(500).json({message: err.message})
  }
});

// do not forget to export the router

module.exports = router;