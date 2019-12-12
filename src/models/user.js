import jwt from 'jsonwebtoken';
import {Schema, model} from 'mongoose';
import {settingSchema} from '../models/settings';

const userSchema = new Schema ({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    min: 6,
    max: 500,
    required: true
  },
  settings:{
    type: settingSchema
  },
  created: { 
    type: Date, 
    default: Date.now 
  }

});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id},process.env.JWT); 
  return token;
}

const User = new model(
  /* User model */
  'User', userSchema);

export {User};