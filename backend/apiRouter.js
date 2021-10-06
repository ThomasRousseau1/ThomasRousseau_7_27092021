// //Imports
// const express = require('express');
// const usersCtrl = require('./routes/usersCtrl');
// const postsCtrl = require('./routes/postsCtrl');


// //Router
// exports.router = (function() {
//     const apiRouter = express.Router();

// //User routes
// apiRouter.route('/users/register/').post(usersCtrl.register);
// apiRouter.route('/users/login/').post(usersCtrl.login);
// // apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
// // apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

// //Message routes 
// apiRouter.route('/posts/new').post(postsCtrl.createPost);
// apiRouter.route('/posts').get(postsCtrl.listPost);

// return apiRouter;
// })();