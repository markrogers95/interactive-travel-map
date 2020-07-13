var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const validationString = {
    type: String,
    required: true,
}

var logEntrySchema = new Schema({
    title:  validationString,
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: [0, 'It can\'t have been that bad'],
        max: 5,
        default: 2,
    },
    image: String,
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
    visitDate: {
        required: true,
        type: Date,
    },
}, {
    timestamps: true,
});

const logEntry = mongoose.model('logEntry', logEntrySchema);

module.exports = logEntrySchema;