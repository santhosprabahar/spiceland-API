const mongoose  = require('mongoose');
const schema    = mongoose.Schema;

const CustomerSchema = new schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_modified: {
        type: Date,
        default: Date.now
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'USER'
    }
});

mongoose.model('customers', CustomerSchema);