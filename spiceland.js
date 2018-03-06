const express = require('express')
const app = express();
const path = require('path');
const port = process.env.PORT || 4300;
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const passport = require('passport');
const favicon = require('serve-favicon');
const multer = require('multer');



mongoose.Promise = global.Promise //to get rid of deprecated warnings

// mongoose.connect('mongodb://localhost/spicelandAPI').then(()=>{   //development
//     console.log('MongoDB connected');
// });

mongoose.connect('mongodb://root:toor@ds125618.mlab.com:25618/spiceland').then(()=>{     //production
    console.log('MongoDB connected');
})

require('./models/customers/Customers');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse application/json
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));


// app.use(passport.initialize());
// app.use(passport.session());



// require('./config/passport.js')(passport);
const customersRoute = require('./routes/customers/customers');
const productsRoute  = require('./routes/products/products');
const categoriesRoute = require('./routes/categories/categories');
const ordersRoute = require('./routes/orders/orders');

app.use('/customers', customersRoute);
app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);
app.use('/orders', ordersRoute);


app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})