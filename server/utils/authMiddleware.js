import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalid' });
    }
    req.user = user; // Attach decoded user data to the request object
    next();
  });
};

export default authenticateToken
