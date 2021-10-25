const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//ajout du mdp du corps de la requête venant du frontend
        .then(hash => {
            models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            image: req.body.image
            })
                .then(() => res.status(201).json({ message: 'Utilisateur créé '}))
                .catch( error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    models.User.findOne({ where: {email: req.body.email} })
        .then(user => {
            if (!user) {//Si l'email n'est pas bon, renvoie l'erreur suivante 
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)//Comparaison du mot de passe envoyé par la requête avec le hash de la base de données
                .then(valid => {//Si l'email rentré n'est pas bon, renvoie l'erreur suivante
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });                 
                    }
                    res.status(200).json({//Si la comparaison est valable, renvoi d'un userid et d'un token à l'utilisateur
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        },
                        token: jwt.sign(                    
                               { userId: user.id },//Données qu'on veut encoder dans le token(payload)   
                               process.env.JWT_SIGN_SECRET,//Clef secrète pour l'encodage
                               { expiresIn: '24h'}//Date d'expiration du token                   
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteAccount = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    const UserId = decodedToken.userId;

    if (UserId != null) {
        models.User.findOne({
            where: {
                id: UserId
            }
        })
        .then(user => {
            if (user != null) {
                models.Post.destroy({
                    where: { UserId: user.id }
                })
                .then(() => {
                    console.log("Toutes les publications de l'utilisateur ont été supprimées")
                })
                models.Comment.destroy({
                    where: { UserId: user.id }
                })
                .then(() => {
                    console.log("Tous les commentaires de l'utilisateur ont été supprimés")
                })
                models.User.destroy({
                    where: { id: user.id }
                })
                .then(() => res.status(200).json({ message: "Compte supprimé !"}))
                .catch(error => res.status(500).json(error))
            }
        })
    }
}