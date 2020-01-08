import {User} from '../models/user';
import { validationResult } from 'express-validator';
import {errorHandler} from '../helpers/errorHandler';
import _ from 'lodash';
import {genSalt, hash, compare} from 'bcrypt';

export async function register(req,res){
  /*
  * register accessed via GET. returns a json object with
  * new user.
  * 
  * @return header x-auth-token -> save this header (jwt) to gain access to system
  * @return {_id, name, email}
  * 
  */
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');

    user = new User (
      _.assign(
        _.pick(
          req.body, ['name', 'email', 'password']),
          {settings: {}} // all settings set to false by default
      )
    );
    
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);
    await user.save();

    const token = await user.generateAuthToken();
    return res.header('x-auth-token', token).json(_.pick(user,['_id', 'name', 'email']));
  }
  catch(ex){
    errorHandler(ex,'register');
  }
  
};

export async function login(req, res){
  /*
  * login accessed via POST. returns a json object with
  * user.
  * 
  * @return header x-auth-token -> save this header (jwt) to gain access to system
  * @return {_id, name, email}
  * 
  */
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');
    
    let validPassword = await compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    const token = await user.generateAuthToken();
    return res.header('x-auth-token', token).json({_id: user._id, name: user.name, email: user.email});
  }
  catch(ex){
    errorHandler(ex,'authLogIn');
  }
};

export async function deleteAccount(req,res){
  try{
    const user = await User.findOneAndDelete({_id: req.user._id});
    res.send(_.pick(user,['_id', 'name']));
  }
  catch(ex){
    errorHandler(ex,'removeUser')
  }
};