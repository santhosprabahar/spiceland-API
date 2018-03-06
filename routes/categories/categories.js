const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('../../models/categories/Category');

const category = mongoose.model('Categories');


// new category

app.post('/newCategory',(req,res)=>{
    let data = req.body;
    let slug = data.slug;

    category.findOne({
        slug: slug
    }).then(categoryFound => {
        if(categoryFound){
            res.send("slug registered with another category");
        }else{
            let newCategory = new category({
                name: data.name,
                slug: data.slug,
                description: data.description
            });
            newCategory.save()
                .then(savedData => {
                    res.json(savedData);
                    console.log(savedData);
                }).catch(err =>{
                    res.send(err);
                    console.log(savedData)
                });
        }
    }).catch(err =>{
        res.send(err);
        console.log(err);
    });
});


// add new sub-category
app.put('/addNewSubCategory',(req,res)=>{
    let data = req.body;
    let new_category = data.category;
    category.findOne({
        name: new_category
    }).then(categoryFound =>{
        console.log(categoryFound);
        categoryFound.sub_category.push(data.sub_category);
        categoryFound.save()
            .then(updatedSubCategory =>{
                console.log(updatedSubCategory);
                res.json(updatedSubCategory);
            }).catch(err=>{
                console.log(err);
                res.send(err);
            });
    }).catch(err =>{
        console.log(err);
        res.send(err);
    });
});


// edit sub-category
app.put('/editSubCategory', (req,res)=>{
    let data = req.body;
    let categoryToEdit = data.category;
    let subCategoryToEdit = data.sub_category;
    category.findOne({
        category: categoryToEdit,
        sub_category: subCategoryToEdit
    }).then(categoryFound =>{
        if(categoryFound){
            categoryFound.sub_category.name = subCategoryToEdit.name;
            categoryFound.sub_category.slug = subCategoryToEdit.slug;
            categoryFound.sub_category.description = subCategoryToEdit.description;
            categoryFound.save()
                .then(updatedData => {
                    console.log(updatedData);
                    res.json(updatedData);
                }).catch(err =>{
                    console.log(err);
                });
        }else{
            res.send("category not found");
        }
    });
});

// list all categories
app.get('/listAllCategories', (req,res)=>{
    category.find()
        .then(categoriesFound =>{
            if(categoriesFound){
                res.json(categoriesFound);
            }else{
                res.send('no categories available')   
                console.log('no categories found')
            }
            
        }).catch(err =>{
            console.log(err);
            res.send(err);
        });
});

module.exports = app