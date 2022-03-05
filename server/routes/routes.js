const router = require('express').Router();
const artController = require('../controllers/art');
const eventController = require('../controllers/event');
const userController = require('../controllers/user');

// User routers
router.post('/login', userController.login);
router.delete('/deleteAccount', userController.deleteAccount);

// Event routes
router.get('/events', eventController.getEvents);

// Art routes 
module.exports = router;