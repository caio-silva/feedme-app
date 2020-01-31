import auth from '../middleware/auth'
import {getSettings, changeSettings} from '../controllers/settings';
import express from 'express';

let router = express.Router();

router.get('/', auth, getSettings);
router.post('/', auth, changeSettings);


module.exports = router;