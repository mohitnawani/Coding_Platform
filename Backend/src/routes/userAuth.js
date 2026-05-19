const express =require('express');
const authRouter = express.Router();
const User = require('../models/user');
const {register, login, logout, adminRegister, deleteUser} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const {googleLogin} = require('../controllers/authController');

//Registar
//login
//logout
//GerProfile
authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',userMiddleware,logout)
authRouter.post('/admin/register',adminMiddleware,adminRegister);
authRouter.post('/deletedUser', userMiddleware,deleteUser);

// Public Routes
authRouter.post('/google-login', googleLogin);

// Protected check route
authRouter.get('/check', userMiddleware, (req, res) => {
  return res.status(200).json({
    user: req.user || null,
    message: 'valid user'
  });
});

module.exports = authRouter;
