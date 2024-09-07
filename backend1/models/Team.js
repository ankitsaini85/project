// backend/models/Team.js

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    members: {
        type: [String], // Array of member emails
        required: true,
    },
});

module.exports = mongoose.model('Team', TeamSchema);