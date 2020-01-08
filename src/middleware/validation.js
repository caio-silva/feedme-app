import { check } from 'express-validator';

export async function emailValidation(req,res,next){
  check('email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape();
  next();
}

export async function passwordValidation(req,res,next){
  check('password')
    .isLength({ min: 6 })
    .contains()
    .escape();
  next();
}