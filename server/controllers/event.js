const { Event, validate } = require('../models/event');

class eventController{
    //____________________________________________________________________________________________________ login

    async getEvents(req, res)
    {
        console.log('getEvents function called');

        try {
            const events = await Event.find()
            if (events) {
                res.json(events);
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch {
            res.status(500).json('db error')
        }
    }
}
module.exports = new eventController();