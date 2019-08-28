const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/* Rules */

router.post('/register', async (req, res) => {

  /* Validation */

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  /* Checking if email already exists in database */

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).send("Email already exists");

  /* Hashing the password */

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  /* Creating a new user */

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
})

router.post('/login', async (req, res) => {

  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  /* Checking if email already exists in database */

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found!");

  /* Checking if the password is incorrect */

  const validatePassword = await bcrypt.compare(req.body.password, user.password);

  if (!validatePassword) return res.status(400).send("Password is incorrect");

  /* Creating and Assing a Token */

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;