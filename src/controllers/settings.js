import { User } from '../models/user';
import { errorHandler } from '../helpers/errorHandler';
import _ from 'lodash';

export async function getSettings(req, res) {
  /*
 * getSettings accessed via GET. returns a json object with
 * user settings.
 * 
 * @return {settings: user.settings}
 * 
 */
  try {
    const user = await User.findById(req.user._id);
    return res.json({ settings: user.settings });
  }
  catch (ex) {
    errorHandler(ex, 'getSettings');
  }
}

export async function changeSettings(req, res) {
  /*
 * changeSettings accessed via POST. returns a json object with
 * user settings updated.
 * 
 * @body { property:  value}
 * @return {settings: user.settings}
 * 
 */
  try {
    const user = await User.findById(req.user._id);
    user.settings = (
      _.assign(
        user.settings,
        _.pick(req.body, ['vegetarian', 'vegan', 'glutenFree', 'dairyFree'])
      )
    );
    await user.save();
    return res.send(user.settings);
  }
  catch (ex) {
    errorHandler(ex, 'changeSettings');
  }
}