import express from 'express';
import jwt from 'jsonwebtoken'
import { config } from "dotenv";

//DB Queries
import { createUser, getUserByEmail, validateUserLogin } from '../db/queries/user_queries.js';

config();
const router = express.Router();


// New user route
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, username, profile_pic } = req.body;

  if (!first_name || !last_name || !email || !password || !username) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    // Create new user in the database
    const newUser = await createUser({ first_name, last_name, email, password, username, profile_pic });

    if (!newUser) {
      return res.status(500).send('Error creating user');
    }

    // Retrieve the newly created user's ID
    console.log(newUser);
    
    // const userId = createdUser.id;

    // Generate the JWT token using the newly retrieved ID
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        username: newUser.username,
        profile_pic: newUser.profile_pic
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: 'User registered successfully',
      token: token,
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      username: newUser.username,
      profile_pic: newUser.profile_pic
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).send('Error creating user');
  }
});



// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Missing required fields');
  }
  try {
    const user = await validateUserLogin(email, password);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      profile_pic: user.profile_pic
    }, process.env.JWT_SECRET);

    res.status(200).json({
      message: 'Logged in successfully',
      token: token,
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      profile_pic: user.profile_pic

    });

  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).send('Error logging in');
  }
});

// Logout a user and destroy the session
router.post('/logout', (req, res) => {
  res.status(200).json({
    message: 'Logged out successfully',
    token: null
  });
});


export default router;
