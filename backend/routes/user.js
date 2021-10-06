//Imports 
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
// const verifyPassword = require('../middleware/verifyPassword');

//Routes
router.post('/signup', userCtrl.signup);//rester à ajouter verifyPassword avant userCtrl
router.post('/login', userCtrl.login);

module.exports = router;













    // exports.register = ((req, res) => {
        
    //     const firstName = req.body.firstName;
    //     const lastName = req.body.lastName;
    //     const email = req.body.email;
    //     // const username = req.body.username;
    //     const password = req.body.password;
    //     const image = req.body.image

    //     //Condition qui renvoie une erreur si l'email, l'username ou le password n'est pas renseigné
    //     if (firstName == null || lastName == null || email == null || password == null) {
    //         return res.status(400).json({ 'error': 'missing parameters'});
    //     }


    //     //à implémenter: vérification du pseudo, regex mail, password
    //     models.User.findOne({
    //         attributes: ['email'],
    //         where: { email:email }
    //     })
    //     .then(userFound => {
    //         if (!userFound) {

    //             bcrypt.hash(password, 5, function( err, bcryptedPassword) {
    //                 const newUser = models.User.create({ 
    //                     firstName: firstName,
    //                     lastName: lastName,
    //                     email: email,
    //                     password: bcryptedPassword,
    //                     image: image,
    //                     // isAdmin: 0
    //                 })
    //                 .then(newUser => {
    //                     return res.status(201).json({
    //                         'userId': newUser.id
    //                     })
    //                 })
    //             })
    //         } else {
    //             return res.status(409).json({ 'error': 'user already exist' });
    //         }
    //     })
    //     .catch(error => res.status(500).json({ 'error': 'unable to verify user'}));

    // }),
    
    // exports.login =  ((req, res) => {
    //     //Params 
    //     const email = req.body.email;
    //     const password = req.body.password;

    //     if (email == null || password == null) {
    //         return res.status(400).json({ 'error': 'missing parameters' });
    //     }

    //     //à implémenter : vérification regex mail et longueur du password

    //      models.User.findOne({
    //         where: { email: email }
    //     })
    //     .then(userFound => {
    //         if (userFound) {

    //             bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt) {
    //                 if(resBcrypt) {
    //                     return res.status(200).json({
    //                         'userId': userFound.id,
    //                         'token': jwtUtils.generateTokenForUser(userFound)
    //                     });
    //                 } else {
    //                     return res.status(403).json({ 'error': 'invalid password' });
    //                 }
    //             });
    //         } else {
    //             return res.status(404).json({ 'error': 'user not exist in DB' });
    //         }
    //     })
    //     .catch(error => res.status(500).json({ 'error': 'unable to verify user'}));
    // })
