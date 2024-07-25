import express from 'express';
const router = express.Router();

// http://localhost:5000/projects/create
router.get ('/create', (req, res) => {
  res.send('Create a new project');
});

// http://localhost:5000/projects/create/:id
router.post ('/create/:id', (req, res) => {
  res.send('Project created');
});
export default router;