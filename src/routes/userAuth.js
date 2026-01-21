const express =require('express');
const authRouter = express.Router();
const User = require('../models/user');
const {register, login, logout, adminRegister} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//Registar
//login
//logout
//GerProfile
authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',userMiddleware,logout)
authRouter.post('/admin/register',adminMiddleware,adminRegister);
// authRouter.get('/profile',getProfile)

module.exports=authRouter;