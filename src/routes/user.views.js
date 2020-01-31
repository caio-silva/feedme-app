import express from 'express';

let router = express.Router();

router.get('/register', (req,res) => {
  return res.render('register', {title: "Register"});
});
// router.post('/login', [emailValidation, passwordValidation], login);
// router.get('/delete', auth, deleteAccount);


module.exports = router;