const http = require('http'); //Importation du package http
const app = require('./app'); // Importation d'app pour utiliser l'appli sur le server

// normalizePort nous renvoi un port valide et configure le port de connexion en fonction de l'environnement
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Si le port de connexion n'est pas déclaré par l'environnement, écouter sur le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Pour gérer les différentes erreurs grâce à errorHandler
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Mise en place du server avec express en utilisant app
const server = http.createServer(app);

//Pour gérer les erreurs et lancer le server en nous affichant le port de connexion 
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Ecoute du port déclaré ci-dessus
server.listen(port);









// //Imports 
// const express = require('express');
// const { Sequelize } = require('sequelize');
// const usersCtrl = require('./routes/usersCtrl');
// // const apiRouter = require('./apiRouter').router;
// // const cors = require('cors');

// // server.use(cors());

// //Instantiate server
// const server = express();

// //Middleware pour contrer l'erreur de CORS bloquant les appels HTTP
// server.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');//Pour accéder à l'API depuis n'importe quelle origine
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Pour ajouter les headers mentionnés aux requêtes envoyées vers l'API
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour permettre d'envoyer les requêtes mentionnées
//     next();
//   });
  

// //Middleware permettant de parser les requêtes envoyées par l'utilisateur
// server.use(express.urlencoded({extended: true})); 
// server.use(express.json());

// //Configure routes 
// server.get('/', async function (req, res) {
//     const sequelize = new Sequelize('groupomania', 'root', '', {
//         host: 'localhost',
//         dialect: 'mysql'
// });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
// });

// server.use('/api/', usersCtrl);

// // server.use('/login', (req,res) => {
// //     res.send({
// //         token: 'test123'
// //     });
// // });

// //Launch server
// server.listen(3000, function() {
//     console.log('Server en écoute')
// });