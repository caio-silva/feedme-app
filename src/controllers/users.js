import { User } from '../models/user';
import { validationResult } from 'express-validator';
import { errorHandler } from '../helpers/errorHandler';
import _ from 'lodash';
import { genSalt, hash, compare } from 'bcrypt';

export async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json('User already registered');

    user = new User(
      _.assign(
        _.pick(
          req.body, ['name', 'email', 'password']),
        { settings: {} } // all settings set to false by default
      )
    );

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    await user.save();
    const token = await user.generateAuthToken();
    const response = _.pick(user, ['_id', 'name', 'email']);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(response);
  }
  catch (ex) {
    errorHandler(ex, 'register');
  }

};

export async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    let validPassword = await compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    const token = await user.generateAuthToken();
    const response = { ..._.pick(user, ["_id", "name", "email"]), token }
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(response);
  }
  catch (ex) {
    errorHandler(ex, 'login');
  }
};

export async function updateProfile(req, res) {
  try {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json('No user registered with this details');

    user.name = name;
    user.email = email;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
    const token = await user.generateAuthToken();
    const response = _.pick(user, ['_id', 'name', 'email']);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(response);



  } catch (ex) {
    errorHandler(ex, 'updateProfile')
  }
}

export async function deleteAccount(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    res.send(_.pick(user, ['_id', 'name', 'email']));
  }
  catch (ex) {
    errorHandler(ex, 'removeUser')
  }
};