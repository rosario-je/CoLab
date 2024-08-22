import express from 'express';
import { createUser, getUserByEmail, validateUserLogin } from '../db/queries/user_queries.js';

const router = express.Router();

router.get('/register', (req, res) => {
  res.send('Create a new user');
});

// Create a new user
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, username, profile_pic } = req.body;

  if (!first_name || !last_name || !email || !password || !username) {
    return res.status(400).send('Missing required fields');
  }
  const user = { first_name, last_name, email, password, username, profile_pic };
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).send('User already exists');
    }
    const newUser = await createUser(user);
    if (!newUser) {
      return res.status(500).send('Error creating user');
    }
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).send('Error creating user');
  }
});

// Login a user and create a session
// Pass up user info to frontend
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

    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      username: user.username,
      profile_pic: user.profile_pic
    };

    res.status(200).json({ message: 'Logged in successfully',
    user_id: req.session.user.id });

  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).send('Error logging in');
  }
});

// Logout a user and destroy the session
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logged out successfully');
  });
});

router.get('/current-user', (req, res) => {
  console.log(req.session.user)
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send('No user logged in');
  }
});

export default router;
