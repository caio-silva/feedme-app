import jwt from 'jsonwebtoken';
import {User} from '../models/user';

module.exports = async function (req, res, next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try{
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(400).send('Access denied. User token.');
    req.user = decoded;
    next();
  }
  catch(ex){
    res.status(400).send('Access denied. Invalid token.');
  }
}