import express from 'express';
import { emailValidation, passwordValidation } from '../middleware/validation'
import { register, login, updateProfile, deleteAccount } from '../controllers/users';
import auth from '../middleware/auth';

let router = express.Router();

router.post('/', [emailValidation, passwordValidation], register);
router.put('/', [emailValidation, passwordValidation], updateProfile);
router.post('/login', [emailValidation, passwordValidation], login);
router.get('/delete', auth, deleteAccount);


module.exports = router;