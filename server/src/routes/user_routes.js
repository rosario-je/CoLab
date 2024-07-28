import express from 'express';
import { createUser, getUserByEmail } from '../db/queries/user_queries.js';

const router = express.Router();

router.get ('/register', (req, res) => {
  res.send('Create a new user');
});


router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, username, profile_pic, github_repo } = req.body;

  if (!first_name || !last_name || !email || !password || !username) {
    return res.status(400).send('Missing required fields');
  }
  const user = { first_name, last_name, email, password, username, profile_pic, github_repo };
  try {
    const newUser = await createUser(user);
    if (!newUser) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).send('Error creating user');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Missing required fields');
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).send('User not found');
    }
    req.session.user = {
      id: user.id,
      email: user.email
    };
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).send('Error logging in');
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logged out successfully');
  });
});

export default router;
