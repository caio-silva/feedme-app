import jwt from 'jsonwebtoken';
import { User } from '../models/user';

module.exports = async function (req, res, next) {
  /*  
  * verify whether x-auth-token (jwt) is valid and it
  * verify user against databse.
  */
  const token = req.header('x-auth-token');
  if (!token) return res.status(403).json({ msg: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(403).send('Access denied. Invalid user token.');
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Access denied. Invalid token.');
  }
}