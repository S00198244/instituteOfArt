const crypto = require('crypto');
const { User, validate } = require('../models/user');
const jwt = require('jsonwebtoken')

// process.env.ACCESS_TOKEN_SECRET ||

const secret = "242c7393bada6fdcc97ed8feadc2cdfb681774d4f6b5444e24bcb02e5b155f46897e2f7c2e9c4fc92464a3b1096a70ab463a4322ae2edb763e1b0c1075063b58";

class userController
{
  
  //____________________________________________________________________________________________________ Login function

  async  login(req, res)
  {
    // check that the body contains an email and a password.

    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).json({ errors: errors.join(',') });
        }
    } else {
        return res.status(400).json({ errors: 'Missing email and password fields' });
    }

    // get the user information from the database 

    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json('Invalid email or password');

    // get the stored salt from the stored passport field

    let passwordFields = user.password.split('$');
    let salt = passwordFields[0];

    // encrypt the received password using the stored salt and compare it to
    // stored password.

    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    if (hash !== passwordFields[1]) {
        return res.status(400).json({ errors: ['Invalid e-mail or password'] });
    }

    // here we know the received password is the same as the one stored.

    // ----- JWT config 

    // set the payload for the jwt.
    let payload = {};
    payload._id = user._id;
    payload.email = user.email;
    payload.firstName = user.firstName;
    payload.lastName = user.lastName;

    // sign the jwt and return it in the body of the request.       

    let token = jwt.sign(payload, secret, { expiresIn: 60 });

    // setRefreshCookie(user, res);

    res.status(201).json({ 
    accessToken: token,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email });

    console.log('login success');

  }

  //____________________________________________________________________________________________________ Signup function

  async signup(req, res)
  {
    console.log('Signup function called | user controller');

    delete req.body.confirmPassword;

    // console.log(req.body);

    let result = validate(req.body);
  
    if (result.error) {
      res.status(400).json(result.error);
      return;
    }

    console.log('Passed validation');
  
    // Check if a user with that e-mail already exists
    let user = await User.findOne({ email: req.body.email });
  
    if (user) return res.status(400).send('User already registered');
  
    // Encrypt the password using a salt 
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
  
    user = new User(req.body);

    user = await user.save();

    // ----- JWT config 

    // set the payload for the jwt.
    let payload = {};
    payload._id = user._id;
    payload.email = user.email;
    payload.firstName = user.firstName;
    payload.lastName = user.lastName;

    // sign the jwt and return it in the body of the request.     

    console.log("Creating token");

    console.log('Secret : ' + secret);

    let token = jwt.sign(payload, secret, { expiresIn: 60 });

    // setRefreshCookie(user, res);

    res.status(201).json({ 
    accessToken: token,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email });
    
    console.log('Signup success');
  }

  //____________________________________________________________________________________________________ Delete account function

  async deleteAccount(req, res) {

    console.log('Delete controller action called');
    try {
      user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.json(user._id);
      }
      else {
        res.status(404).json('User with that ID ${req.params.id} was not found');
      }
      res.send(user._id)
    }
    catch (error) {
      console.log(error)
      res.status(404).json(`User with that ID ${req.params.id} was not found`);
    }
  }

  //____________________________________________________________________________________________________ Cookies

  setRefreshCookie(user, res)  
  {
    let refreshToken = createRefreshToken(user);

    res.cookie('refreshtoken', refreshToken, {
    httpOnly: true,
    //path: '/auth/refresh',
    sameSite: 'none',
    secure : true,
  
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
    })
  }

  createRefreshToken(user, res)
  {
    return 'test4';
  }

}
module.exports = new userController();