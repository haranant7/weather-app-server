/*

JWT authentication module

*/

let jwt = require('jsonwebtoken');
require('dotenv').config()

let checkToken = (req, res, next) => {
  console.log(req.headers.authorization);
  let token = '';
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Remove Bearer from string
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.JWT_KEY,{'clockTimestamp':Math.floor(Date.now() / 1000),'maxAge':'1h'}, (err, decoded) => {
      if (err) {
        console.log('err',err)
        return res.json({
          errorCode: 99,
          message: 'Invalid Token'
        });
      } else {
        req.decoded = decoded;
        console.log('decoded',decoded)
        next();
      }
    });
  } else {
    return res.json({
      errorCode: 99,
      message: 'Auth token is not supplied'
    });
  }
};

function getToken(username)  {
  let token = jwt.sign(
    {username: username},
    process.env.JWT_KEY,
    {expiresIn: '1h'}
  );
  return token
}

module.exports = {
  getToken: getToken,
  checkToken: checkToken
}
