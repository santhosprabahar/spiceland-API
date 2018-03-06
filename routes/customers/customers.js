const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('../../models/customers/Customers');

const Customer = mongoose.model('customers');

// create new customer

app.post('/newCustomer', (req,res)=>{
    let data = req.body;
    console.log(data);
    Customer.findOne({email: req.body.email})
            .then(user=> {
                if(user){
                    res.send('User Already Exists with the same Email');
                }else{
                    let newCustomer =new Customer({
                        email : data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        password: data.password,
                        role: data.role
                    });
                    newCustomer.save().then(savedData =>{
                        console.log(savedData);
                        res.send(savedData);
                        
                    }).catch(err=>{
                        console.log(err);
                        res.send(err);
                        
                    });
                }
            });
            
});

// List all customers

app.get('/listAllCustomers',(req,res)=>{
    Customer.find().then(CustomersData =>{
        res.json(CustomersData);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    });
});

// update a Customer's Details

app.put('/editCustomer',(req,res)=>{
    let data = req.body;
    let email = data.email

    Customer.findOne({
        email: email
    }).then(customerData => {
        customerData.firstName  = data.firstName;
        customerData.lastName   = data.lastName;
        customerData.role       = data.role;
        customerData.save().then(updatedData =>{
            console.log(updatedData);
            res.json(updatedData);
        });
    }).catch(err => {
        console.log(err);
        res.send(err)
    });
});

// fetch customer with email
app.post('/customerWithEmail', (req,res)=>{
    let data = req.body;
    Customer.findOne({
        email: data.email,
    }).then(fetchedData=>{
        if(fetchedData){
            console.log(fetchedData);
            res.json(fetchedData);
        }else{
            console.log("customer doesn't exist with this email");
            res.json("customer doesn't exist with this email");
        }
    }).catch(err=>{
        console.log(err);
        res.json(err);
    });
});



module.exports = app;