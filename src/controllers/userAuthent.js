const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

const register = async (req, res) => {
  try {
    //validate the data;
    validate(req.body);
    const { firstName, emailId, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);
    const token = jwt.sign(
      { emailId: emailId, _id: user._id },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(201).send("User Registered Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { emailId: user.emailId, _id: user._id , role:user.role},
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).send("Logged In Successfully");
  } catch (err) {
    res.status(401).send(err.message);
  }
};

//logout  feauture

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);

    await redis.set(`token:${token}`, "Blocked");
    await redis.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, {
      maxAge: payload.exp,
    });

    res.status(200).send("Logged Out Successfully");
  } 
  catch (err) {
    res.status(500).send("Error:" + err.message);
  }
};


const adminRegister = async (req, res)=>{
    try{
        //validate the data;
        validate(req.body);
        const {firstName, emailId, password} = req.body;

        req.body.password =await bcrypt.hash(password,10);
        req.body.role = 'admin';
        const user=await User.create(req.body);

        const token =jwt.sign({emailId:user.emailId,_id:user._id, role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});

        res.status(201).send("Admin Registered Successfully");

    }

    catch(err)
    {
        res.status(500).send("Error:" + err.message);
    }
}
module.exports = { register, login, logout,adminRegister};
