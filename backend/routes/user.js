//Imports 
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
// const verifyPassword = require('../middleware/verifyPassword');

//Routes
router.post('/signup', userCtrl.signup);//rester à ajouter verifyPassword avant userCtrl
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteAccount)

module.exports = router;