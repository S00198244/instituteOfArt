const { Event, validate } = require('../models/event');

class eventController{

    // Get events

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

    // Add an event

    async addEvent(req, res)
    {
        console.log('In addEvent()');

        let result = validate(req.body);

        if (result.error) {
            res.status(400).json(result.error);
            return;
          }

        try{
            
            let event = new Event(req.body);

            event = await event.save();

            res.status(200).json(event);
        }
        catch {

            res.status(500).json(error)

        }


    }

    // Update an event

    async updateEvent(req, res) 
    {
        console.log('In updateEvent()');

        const id = { _id: req.params.id }

        const data = {
            title: req.body.title,
            summary: req.body.summary
        }

        console.log(data);

        try {
            const event = await Event.findByIdAndUpdate(id, {$set: data}, { new: true })

            if (event) {
                res.status(200).json(event);
            }
            else {
                res.status(404).json(`Event with id of ${req.params.id} was not found`)
            }
        }
        catch (error) {
            console.log(error)
            res.status(404).json(`Event with id of ${req.params.id} was not found`);
        }
    }

    // Delete an event

    async deleteEvent(req, res) 
    {
        console.log('In deleteEvent()');

        try {
            const event = await Event.findByIdAndDelete(req.params.id);

            if (event) {
                res.json(event._id)
            }
            else {
                res.status(404).json(`Event with id of ${req.params.id} was not found`);
            }
        }
        catch (error) {
            console.log(error)
            res.status(404).json(`Event with id of ${req.params.id} was not found`);
        }
    }

    // Get comments

    async getComments(req, res)
    {
        console.log("In getComments()");

        try {

        }
        catch (error) {

        }
    }

    // Add comment

    async addComment(req, res)
    {
        console.log("In addComment()");

        try {

        }
        catch (error) {

        }
    }

    // Edit comment

    async editComment(req, res)
    {
        console.log("In editComment()");

        try {

        }
        catch (error) {

        }
    }

    // Delete comment

    async deleteComment(req, res)
    {
        console.log("In deleteComment()");

        try {

        }
        catch (error) {

        }
    }

    // Delete comments

    async deleteComments(req, res)
    {
        console.log("In deleteComments()");

        try {

        }
        catch (error) {

        }
    }

}
module.exports = new eventController();