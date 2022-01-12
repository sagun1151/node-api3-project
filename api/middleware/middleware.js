const Users =  require('../users/users-model')

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.baseUrl);
  console.log(req.timestamp);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if(user){
      req.user = user;
      next();
    } else {
      res.status(404).json({message:"user not found"})
    }
  }
  catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  try {
    if(name){
      next();
    }else {
      res.status(400).json({message: `missing required name field`})
    }
  }
  catch(err) {
    next(err)
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  try {
    if(text){
      next();
    }else {
      res.status(400).json({message: `missing required text field`})
    }
  }
  catch(err) {
    next(err)
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}