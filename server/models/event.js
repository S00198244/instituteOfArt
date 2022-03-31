const Joi = require('joi');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    summary: String
    },
);

function validateEvent(event) {
    const schema = Joi.object({
        title: Joi.string(),
        summary: Joi.string()
    })
    return schema.validate(event);
}

const Event = mongoose.model('events', eventSchema);

exports.Event = Event;
exports.validate = validateEvent;