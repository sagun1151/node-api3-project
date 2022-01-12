const express = require('express');

const userRouter = require('./users/users-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
server.use('/api/users', userRouter);

// server.use((req,res,next)=>{
//   res.set('X-web-49', 'Rocks');
//   res.set('Set-Cookie','foo=bar');
//   next({status:422, message:'bad'});
// });

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// server.use('*', (req, res)=> {
//   res.status(404).json({message:"user not found"})
// })

// server.use((err, req, res, next)=> {  // eslint-disable-line
//   res.status(err.status || 500).json({
//     message:`${err.message}`,
//   });
// });

module.exports = server;
