const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('../../models/products/Products');

const product = mongoose.model('Products');


// Create a customer
app.post('/newProduct', (req,res)=>{
    let data = req.body;
    let slug = req.body.slug;
    product.findOne({
        slug: slug
    }).then(productFound => {
        if(productFound){
            res.send("product with same slug name already exists")
        }else{
            let newProduct = new product({
                name: req.body.name,
                slug: req.body.slug,
                short_description: req.body.short_description,
                description: req.body.description,
                type: req.body.type,
                price: req.body.price,
                featured_img: req.body.featured_img,
                regular_price: req.body.regular_price,
                sale_price: req.body.sale_price,
                date_on_sale_from: req.body.date_on_sale_from,
                category: req.body.category,
                status: req.body.status,
                in_stock: req.body.in_stock
            }).save().then(savedData => {
                res.json(savedData);
                console.log(savedData);
            });
        }
    }).catch(err =>{
        console.log(err)
        res.send(err);
        
    });
});


// List all products available
app.get('/listAllProducts', (req,res)=>{
    product.find()                      //use skip and limit for pagination
        .then(products =>{
            console.log(products)
            res.json(products)
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
});

// edit a product
app.put('/editProduct',(req,res)=>{
    let data = req.body;
    let slug = data.slug
    product.findOne({
        slug: slug
    }).then(productFound => {
        if(productFound){
            productFound.name = data.name
            productFound.slug = data.slug
            productFound.short_description = data.short_description;
            productFound.description = data.description;
            productFound.featured_img = data.featured_img;
            productFound.type = data.type;
            productFound.price = data.price;
            productFound.regular_price = data.regular_price;
            productFound.sale_price = data.sale_price;
            productFound.date_on_sale_from = data.date_on_sale_from;
            productFound.category = req.body.category;
            productFound.status = data.status;
            productFound.in_stock = data.in_stock
    
            productFound.save().then(updatedData => {
                console.log(updatedData);
                res.json(updatedData);
            }).catch(err => {
                res.send(err);
                console.log(err);
            });
        }else{
            console.log("no product found matching this slug");
            res.send("no product found matching this slug");
           
        }   
    }).catch(err =>{
        
        console.log(err);
        res.send(err);
    });    
});

module.exports = app;