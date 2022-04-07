const router = require('express').Router();
const eventController = require('../controllers/event');
const userController = require('../controllers/user');

// User routes / Auth routes
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.delete('/deleteAccount', userController.deleteAccount);

// Event routes
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);
router.patch('/event/:id', eventController.updateEvent);
router.delete('/event/:id', eventController.deleteEvent);

// Comment routes
router.get('/event/:id/comments', eventController.getComments);
router.post('/event/:id/addComment', eventController.addComment);
router.patch('/event/:id/comment/:commentId', eventController.editComment);
router.delete('/event/:id/comment/:commentId', eventController.deleteComment);
router.delete('/event/:id/comments', eventController.deleteComments);

module.exports = router;