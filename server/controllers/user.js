const crypto = require('crypto');
const { User, validate } = require('../models/user');

const ACCESS_TOKEN_SECRET = "";
const secret = ACCESS_TOKEN_SECRET;

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

    if (!user) return res.status(400).send('Invalid email or password');

    // get the stored salt from the stored passport field

    let passwordFields = user.password.split('$');
    let salt = passwordFields[0];

    // encrypt the received password using the stored salt and compare it to
    // stored password.

    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    if (hash !== passwordFields[1]) {
        return res.status(400).send({ errors: ['Invalid e-mail or password'] });
    }

    // here we know the received password is the same as the one stored.

    // set the payload for the jwt.
    let payload = {};
    payload._id = user._id;
    payload.email = user.email;
    payload.firstName = user.firstName;
    payload.lastName = user.lastName;

    // sign the jwt and return it in the body of the request.       

    let token = jwt.sign(payload, secret, { expiresIn: 60 });

    setRefreshCookie(user, res);

    res.status(201).json({ 
    accessToken: token,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email });
    console.log('login success');

  }
    // Setting a refresh cookie

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

  //____________________________________________________________________________________________________ Signup function

  async signup(req, res)
  {
    console.log('Signup function called');

    let result = validate(req.body)
  
    if (result.error) {
      res.status(400).json(result.error);
      return;
    }
  
    // Check if a user with that e-mail already exists
    let user = await User.findOne({ email: req.body.email });
  
    if (user) return res.status(400).send('User already registered');
  
    // Encrypt the password using a salt 
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
  
    user = new User(req.body);
    user = await user.save();
  
    // Note we don't want to return the entire user object as that includes the password.
    res.location(user._id).
      status(201).
      json(user._id);
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

}
module.exports = new userController();