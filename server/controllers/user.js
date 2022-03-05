const crypto = require('crypto');

const { User, validate } = require('../models/user');

class userController
{
    //____________________________________________________________________________________________________ login

    async login(req, res)
    {
        console.log('deleteAccount controller');

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

    //____________________________________________________________________________________________________ deleteAccount

    async deleteAccount(req, res) {

        console.log('deleteAccount controller');
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