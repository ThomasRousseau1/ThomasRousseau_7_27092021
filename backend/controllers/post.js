const models = require('../models');
const { Post } = require('../models/post');
const jwt = require('jsonwebtoken');

//Création d'un post
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);//Décodage du token, vérification du token avec la clef secrète
    const UserId = decodedToken.userId;//Récupération de l'userId dans le TOKEN
    //  models.User.findOne({
    //   where: { id: userId },
    // })
    models.Post.create ({
        // id: 
        UserId: UserId, 
        title: req.body.title,
        content: req.body.content,
        attachement: req.body.attachement,
        likes: req.body.likes,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch((error) => res.status(400).json({ error:error }));
};


//Controller pour modifier une sauce
exports.modifyPost = (req, res, next) => {
    Post.modifyOne
}


exports.deletePost = (req, res, next) => {
    models.Post.destroy({
        where: {
          id: req.params.id 
        }
      })
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch((error) => res.status(400).json({ error }));
}


exports.getAllPosts = (req, res, next) => {
    models.Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

//PARTIE LIKES

