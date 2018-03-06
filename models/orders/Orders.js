const mongoose  = require('mongoose');
const schema    = mongoose.Schema;

const orderSchema = new schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_modified: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: 'PENDING'
    },
    discount: {
        type: Number
    },
    total: {
        type: Number,
        required: true
    },
    shipping_total:{
        type: Number,
        required: true
    },
    customer_id:{
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    billing_details: 
        {
            firstName:{
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            address_1:{
                type: String,
                required: true
            },
            address_2:{
                type: String,
                required: true
            },
            phoneNumber:{
                type: Number,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            state:{
                type: String,
                required: true
            },
            pin_code:{
                type: Number,
                required: true
            },
            country:{
                type:String,
                default: 'INDIA'
            }
        },
    shipping_details: 
        {
            firstName:{
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            address_1:{
                type: String,
                required: true
            },
            address_2:{
                type: String,
                required: true
            },
            phoneNumber:{
                type: Number,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            state:{
                type: String,
                required: true
            },
            pin_code:{
                type: Number,
                required: true
            },
            country:{
                type:String,
                default: 'INDIA'
            }
        }
});

mongoose.model('Orders', orderSchema);