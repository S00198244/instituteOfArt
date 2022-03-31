const router = require('express').Router();
const artController = require('../controllers/art');
const eventController = require('../controllers/event');
const userController = require('../controllers/user');

// User routes
// Auth routes
router.post('/login', userController.login);
router.post('/signup', userController.signup)
router.delete('/deleteAccount', userController.deleteAccount);

// Event routes
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);
router.patch('/event/:id', eventController.updateEvent);
router.delete('/event/:id', eventController.deleteEvent);

// Art routes 

module.exports = router;