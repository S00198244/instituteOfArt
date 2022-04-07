const { string } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    summary: String,
    art: [
        {
            objectID: Number,
            primaryImage: String,
            primaryImageSmall: String,
            department: String,
            objectName: String,
            title: String,
            culture: String,
            period: String,
            artistRole: String,
            artistDisplayName: String,
            artistDisplayBio: String,
            medium: String,
            dimensions: String,
            classification: String
        }
    ]
    },
);

function validateEvent(event) {
    const schema = Joi.object({
        title: Joi.string(),
        summary: Joi.string(),
        art: [
            {
                objectID: Joi.number(),
                primaryImage: Joi.string(),
                primaryImageSmall: Joi.string(),
                department: Joi.string(),
                objectName: Joi.string(),
                title: Joi.string(),
                culture: Joi.string(),
                period: Joi.string(),
                artistRole: Joi.string(),
                artistDisplayName: Joi.string(),
                artistDisplayBio: Joi.string(),
                medium: Joi.string(),
                dimensions: Joi.string(),
                classification: Joi.string()
            }
        ]
    })
    return schema.validate(event);
}

const Event = mongoose.model('events', eventSchema);

exports.Event = Event;
exports.validate = validateEvent;