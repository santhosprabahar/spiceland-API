const mongoose  = require('mongoose');
const schema    = mongoose.Schema;

const categorySchema = new schema({
    name: {
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sub_category:[{
        name: {
            type: String,
            required: true
        },
        slug:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    }],
    date_created: {
        type: Date,
        default: Date.now
    },
    date_modified: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Categories", categorySchema);