const models = require('../models');
const { Post } = require('../models/post');
const jwt = require('jsonwebtoken');

//Création d'un post
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    const UserId = decodedToken.userId;
    models.Post.create ({
        // include: [
        //     {
        //       model: models.User,
        //       attributes: ['firstName', 'lastName', 'id'],
        //     },
        //   ],
        // id: 
        UserId: UserId, 
        // title: req.body.title,
        content: req.body.content,
        attachement: req.body.attachement,
        likes: req.body.likes,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch((error) => res.status(400).json({ error:error }));
};


exports.modifyPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    const UserId = decodedToken.userId;
    const post = models.Post.findOne({
        where: {
            id: req.params.id,
        },
    })
    models.Post.update({
        // title: req.body.title,
        content: req.body.content ? req.body.content: post.content,
        attachement: req.body.attachement ? req.body.attachement: post.attachement
    },
        {
            where: {
            id: req.params.id,
            userId: UserId
        }
    })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch((error) => res.status(400).json({ error }));
}


exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    const UserId = decodedToken.userId;
    models.Comment.destroy({ //Pour suppr le post avec le comment
        where: { PostId: req.params.id }
    })
    models.Post.destroy({
        where: {
          id: req.params.id,
          UserId: UserId 
        }
      })
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch((error) => res.status(400).json({ error }));
}


exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({  include: [
        {
          model: models.User,
          attributes: ['firstName', 'lastName', 'id'],
        },
      ],
      order: [["createdAt", "DESC"]]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

//PARTIE LIKES