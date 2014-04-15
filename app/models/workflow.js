var mongoose = require('mongoose');
var wfSchema = mongoose.Schema({
    queue        : String,
    category     : String,
    sender       : String,
    state        : String,
    when         : Date,
    payload      : String,
    assignedTo   : String,
    comment      : String
});

module.exports = mongoose.model('Workflow', wfSchema);
