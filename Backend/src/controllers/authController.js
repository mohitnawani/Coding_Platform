const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
env.config();

// Initialize OAuth2Client with your Google credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oAuth2Client = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

// Google Login Route
const googleLogin = async (req, res) => {
  try {
    const { token:token1 } = req.body;

    if (!token1) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify the token with Google
  //  console.log('tocken:', token1); // Log the received token
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token1,
      audience: CLIENT_ID,
    });

    // console.log('Ticket:', ticket); 
    const payload = ticket.getPayload();

    // Extract user information
    const userId = payload?.sub;
    const emailId = payload?.email;
    const firstname = payload?.name;
    const lastname = payload?.family_name;
    const picture = payload?.picture;

    // TODO: Save user to database or create session
      let user = await User.findOne({emailId });
      console.log('User found:', user); // Log the user found in the database

      if (!user) {
        user = await User.create({  emailId, firstName: firstname, lastName: lastname, profilePicture: picture, googleId: userId });
      }

      const token =jwt.sign(
        {
          emailId: user.emailId,
          _id: user._id,
         },
        process.env.JWT_KEY,
        { expiresIn: "1h" 
        }
      );

      res.cookie("token" , token, { maxAge: 60 * 60 * 1000 });

      console .log('User after creation:', user); // Log the user after creation or retrieval

      const reply={
        firstName:user.firstName,
        emailId:user.emailId,
        _id:user._id,
        role:user.role
      }

      res.send({
        user:reply,
        message:"Login Successfully"
      })

      res.status(200).json({
        user:reply,
        message:"Login Successfully"
      })

  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ 
      error: 'Authentication failed',
      details: error.message 
    });
  }
};

module.exports = { googleLogin };