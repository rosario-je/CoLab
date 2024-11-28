import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();


const SECRET_KEY = process.env.JWT_SECRET_KEY;  // Store this securely!
const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    username: user.username,
    profile_pic: user.profile_pic
  }, SECRET_KEY, {
    expiresIn: '1h'
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
module.exports = { generateToken, verifyToken };