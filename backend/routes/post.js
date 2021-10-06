// //Imports 
// const models = require('../models');
// const asyncLib = require('async');
// const jwtUtils = require('../utils/jwt.utils');//Pour récupérer la fonction getUserId

// //Constants
// const TITLE_LIMIT = 2;
// const CONTENT_LIMIT = 4;

// //Routes 
// module.exports = {
//     createPost: function(req,res) {
//         //Get auth header
//         const headerAuth = req.headers['authorization'];
//         const userId = jwtUtils.getUserId(headerAuth);

//         //Params
//         const title = req.body.title;
//         const content = req.body.content;

//         if (title == null || content == null) {//Pour vérifier si le titre et le contenu ne sont pas vides
//             return res.status(400).json({ 'error': 'missing parameters' });
//         }

//         if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
//             return res.status(400).json({ 'error': 'invalid parameters' });
//         }

//         asyncLib.waterfall([
//             function(done) {
//                 models.User.findOne({
//                     where: { id: userId }//On récupère l'utilisateur qui possède l'id du token parsé
//                 })
//                 .then(userFound => {
//                     done(null, userFound);
//                 })
//                 .catch(error => {
//                     res.status(500).json({ error });
//             });
//             },
//             function(userFound, done) {//Pour s'assurer que l'utilisteur trouvé est valide
//                 if(userFound) {
//                     models.Post.create({
//                         title: title,
//                         content: content,
//                         likes: 0,
//                         UserId: userFound.id
//                     })
//                     .then(newPost => {
//                         done(newPost);
//                     });
//                 } else {

//                     res.status(404).json({ 'error': 'user not found' });
//                 }
//             },
//         ], function(newPost) {
//             if (newPost) {
//                 return res.status(201).json(newPost);
//             } else {
//                 return res.status(500).json({ 'error': 'cannot post message' });
//             }
//         });
//     },
//     listPost: function (req, res) {
//         const fields = req.query.fields;//sélectionner les colonnes que l'on souhaite afficher
//         const limit = parseInt(req.query.limit);//limit et offset pour éviter de récupérer tous les messages d'un coup, par segmentation (ex: premiers messages dans la première page etc)
//         const offset = parseInt(req.query.offset);
//         const order = req.query.order;//permet de sortir la liste des messages via un order particulier

//         if (limit > ITEMS_LIMIT) {
//             limit = ITEMS_LIMIT;
//         }

//         models.Posts.findAll({
//             order: [(order != null) ? order.split(':') : ['title', 'ASC']],
//             attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
//             limite: (!isNaN(limit)) ? offset : null,
//             offset: (!isNaN(offset)) ? offset : null,
//             include: [{//pour inclure la relation avec la table users
//                 model: models.User,
//                 attributes: ['username']
//             }]
//         }) .then(posts => {
//             if (posts) {
//                 res.status(200).json(posts);
//             } else {
//                 res.status(404).json({ 'error': 'no posts found' });
//             }
//         }).catch(error => {
//             console.log(error);
//             res.status(500).json({ 'error': 'invalid field' });
//         })
//     }
// }
