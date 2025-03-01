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

  res.send('Ahora comenzamos el registro')
})

module.exports = router;