const express = require('express');
const { Sequelize } = require('sequelize');
//Pour accéder au chemin de système de fichiers, les images
const path = require('path');
//Appel du module Helmet qui permet d'améliorer la sécurité de l'appli en sécurisant les requêtes http, les entêtes, empêcher le détournement de clics 
const helmet = require('helmet');
// const cors = require('cors');
// const nocache = require('nocache');
const commentRoutes = require('./routes/comment.js');
const postRoutes = require('./routes/post.js');
const userRoutes = require('./routes/user.js');

require('dotenv').config();

//express sera appelé partout où est utilisé app 
const app = express();

// app.use = (cors());

//Connection à la base de données 

app.get('/', async function (req, res) {
    const sequelize = new Sequelize('groupomania', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3308,
});
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

res.setHeader('Content-Type', 'text/html');
res.status(200).send('Test ok');
});


//Middleware pour contrer l'erreur de CORS bloquant les appels HTTP
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//Pour accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Pour ajouter les headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour permettre d'envoyer les requêtes mentionnées
  next();
});


app.use(helmet());// app.use(nocache());//Permet de désactiver la mise en cache du navigateur
//Middleware permettant de parser les requêtes envoyées par l'utilisateur
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })


//Exporter cette const pour y accéder depuis les autres fichiers dont le serveur node
module.exports = app;