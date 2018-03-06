const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    featured_img:{
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_modified: {
        type: Date,
    },
    type:{
        type: String,
        required: true
    },
    short_description:{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    regular_price: {
        type: Number,
        required: true
    },
    sale_price:{
        type:Number,
        required: true
    },
    discount: {
        type: Number
    },
    date_on_sale_from:{
        type: Date,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    in_stock: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    stock_quantity: {
        type: Number
    },
    reviews: {
        type: String,
    }

});


mongoose.model('Products', productSchema);

