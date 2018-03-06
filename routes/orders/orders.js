const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('../../models/orders/Orders');

const order = mongoose.model('Orders');

// create new order
app.post('/newOrder', (req,res)=>{
    let data = req.body;

    order.findOne({
        _id : data.id
    }).then(orderFound=>{
        if(orderFound){
            console.log("order already exists with this id")
            res.send("order already exists with this id");
        }else{
            let newOrder = new order({
                total: data.total,
                status: data.status,
                shipping_total: data.shipping_total,
                customer_id: data.customer_id,
                product_id: data.product_id,
                billing_details: data.billing_details,
                shipping_details: data.shipping_details,
            });
            newOrder.save()
                .then(savedOrder=>{
                    console.log(savedOrder);
                    res.json(savedOrder);
                }).catch(err=>{
                    console.log(err);
                    res.send(err);
                })
        }
    }).catch(err=>{
        console.log(err);
        res.send(err);
    });
});

// List all orders
app.get('/listOrders',(req,res)=>{
    order.find()
        .then(allOrders =>{
            console.log(allOrders);
            res.json(allOrders);
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
});

// edit an order
app.put('/editOrder', (req,res)=>{
    let data = req.body;
    order.findOne({
        _id: data.id
    }).then(orderFound=>{
        if(orderFound){
            orderFound.status = data.status;
            orderFound.billing_details = data.billing_details;
            orderFound.shipping_details = data.shipping_details;
            orderFound.total = data.total;
            orderFound.shipping_total = data.shipping_total;
            orderFound.customer_id = data.customer_id;
            orderFound.product_id = data.product_id;

            orderFound.save()
                .then(updatedData=>{
                    console.log("updatedData "+ updatedData);
                    res.json(updatedData);
                }).catch(err=>{
                    console.log(err);
                    res.json(err);
                })
        }else{
            console.log("Order doesn't exist with this id");
            res.send("Order doesn't exist with this id");
        }
    }).catch(err=>{
        console.log(err);
        res.json(err);
    });
});

// fetch order with id
app.post('/orderWithId', (req,res)=>{
    let data = req.body;
    order.findOne({
        _id: data.id
    }).then(fetchedData=>{
        console.log(fetchedData);
        res.json(fetchedData);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    });
});

module.exports = app;