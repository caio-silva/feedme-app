import {User} from '../models/user';
import {errorHandler} from '../helpers/errorHandler';
import _ from 'lodash';
import {genSalt, hash, compare} from 'bcrypt';

export async function register(req,res){
  try{
    
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');

    // user = new User (_.pick(req.body, ['name', 'email', 'password']));
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

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email']));
  }
  catch(ex){
    errorHandler(ex,'register');
  }
  
};

export async function login(req, res){
  try{
    
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');
    
    let validPassword = await compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    // change this to send token as header
    const token = user.generateAuthToken();
    res.send(token);
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