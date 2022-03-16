const { Event, validate } = require('../models/event');

class eventController{

    // getEvents() - Get events

    async getEvents(req, res)
    {
        console.log('getEvents() called | eventController');

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

    // addEvent() - Add an event

    async addEvent(req, res)
    {
        console.log('addEvent() called | eventController');

    }

    // updateEvent() - Update an event

    async updateEvent() 
    {
        console.log('updateEvent() called | eventController');

    }

    // deleteEvent() - Delete an event

    async deleteEvent() 
    {
        console.log('deleteEvent() called | eventController');

    }

}
module.exports = new eventController();