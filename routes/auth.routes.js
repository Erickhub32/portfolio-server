const router = require('express').Router();

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');

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

})

module.exports = router;