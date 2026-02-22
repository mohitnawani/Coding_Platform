const express =require('express');
const authRouter = express.Router();
const User = require('../models/user');
const {register, login, logout, adminRegister, deleteUser} = require('../controllers/userAuthent');
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
authRouter.post('/deletedUser', userMiddleware,deleteUser)
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply={
        firstName: req.result.firstName,
        emailId:req.result.firstName,
        _id:req.result._id
    }

    res.status(200).json(
        {
            user:reply,
            message:"valid user"
        }
    );
})


module.exports=authRouter;