const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const User = require('../models/User.model');
const isAuthenticated = require('../middleware/verifyToken');

router.post('/signup', (req, res, next) => {

  const { email, password, username } = req.body;

  if (email === '' || password === '' || username === '') {
    res.status(400).json({ menssage: 'Provid email, password and name' })
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ menssage: 'Provide a valid email' })
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ menssage: 'Password needs to be at least 8 characters long' })
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ menssage: 'User already exists' })
        return
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      User
        .create({ email, password: hashPassword, username })
        .then(() => res.sendStatus(201))
        .catch((err) => next(err))

    })
    .catch((err) => next(err))

});

router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

  if (email === '' || password === '') {
    return res.status(400).json({ menssage: 'Provid email, password' })

  }

  User
    .findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ menssage: 'User not found' })
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (!passwordCorrect) {
        return res.status(401).json({ menssage: 'Wrong password' })

      }

      const { _id, email, username } = foundUser;
      const payload = { _id, email, username };

      const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: '6h' }

      );

      res.json({ authToken: authToken })



    })
    .catch((err) => next(err))

})

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.json(req.payload)
})



module.exports = router;