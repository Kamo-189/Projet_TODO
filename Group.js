const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    title: {
        type: String,
        requiered: true
    },
    user: {
        type: String,
        requiered: true
    }
}, {timestamps: true})

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;