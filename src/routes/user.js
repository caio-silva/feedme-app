import express from 'express';
import {register, login, deleteAccount} from '../controllers/users';
import auth from '../middleware/auth';

let router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/delete', auth, deleteAccount);


module.exports = router;