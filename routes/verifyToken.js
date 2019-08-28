const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  /* Checking if token cames in the header */

  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Acess Denied!');

  /* Treating the Token */

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send('Invalid Token');
  }

}