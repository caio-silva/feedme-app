import {User} from '../models/user';
import {errorHandler} from '../helpers/errorHandler';
import _ from 'lodash';

export async function getSettings(req,res){
  try{
    const user = await User.findById(req.user._id);
    return res.send(user.settings);
  }
  catch(ex){
    errorHandler(ex, 'getSettings');
  }
}

export async function changeSettings(req, res){
  try{
    const user = await User.findById(req.user._id);
    user.settings = (
      _.assign(
        user.settings,
        _.pick(req.body, ['vegetarian', 'vegan', 'glutenFree', 'dairyFree'])
      )
    );
    await user.save();
    res.send(user.settings);
  }
  catch(ex){
    errorHandler(ex, 'changeSettings');
  }
}