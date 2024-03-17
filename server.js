const express = require('express');
const env = require('dotenv').config();
var bodyParser = require('body-parser')
const PoolDB = require('./database/connection');

const app = express();
// parse application/json
app.use(bodyParser.json());
const { createCategory, updateCategory, deleteCategory } = require('./service/fashion');

// To Get Details of category fashion category 
app.get('/fashion-category', (req, res) => {

    try {
        let reponseData = { Women: { clothing: {} }, Men: {} };
        let dress = [];
        let tShirts = [];
        let footwear = [];
        let shirts = [];
        const category = { 80: 'dresss', 79: 'T-shirts', 78: 'footwear', 81: 'shirts' };

        let subCategorysql = "select * from fasion_sub_category";
        PoolDB.query(subCategorysql, (error, result) => {
            if (error)
                throw error;
            for (const obj of result.rows) {
                Object.keys(category).forEach((catprefix) => {
                    if (catprefix == obj.category_id) {
                        if (catprefix == 80) {
                            dress.push(obj.sub_category_name);
                        }
                        if (catprefix == 79) {
                            tShirts.push(obj.sub_category_name);
                        }
                        if (catprefix == 78) {
                            footwear.push(obj.sub_category_name);
                        }
                        if (catprefix == 81) {
                            shirts.push(obj.sub_category_name);
                        }

                    }
                })
            }
            if (dress || tShirts) {
                reponseData.Women.clothing["Dress"] = dress;//uniqueCategory(dress);
                reponseData.Women['T-Shirts'] = tShirts;//uniqueCategory(tShirts);
            }
            if (footwear || tShirts || shirts) {
                reponseData.Men.Footwear = footwear;//uniqueCategory(footwear);
                reponseData.Men['T-Shirts'] = tShirts;//uniqueCategory(tShirts);
                reponseData.Men['Shirts'] = shirts;//uniqueCategory(shirts);
            }
            res.send(reponseData);
        });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
// create new fashion category and subcategory
app.post('/fashion-category', (req, res) => {
    try {
        let fasionData = req.body;
        createCategory(fasionData).then((result) => {
            res.status(200).send({ "Fasion category created": fasionData.length });
        }).catch((error) => {
            res.status(200).send({ "Category can not be created due to": error.detail });
        });

    } catch (error) {
        console.log(error);
        res.send(error);
    }


});
// update fashion category and subcategory
app.put('/fashion-category/:categoryId/:subcategoryID', (req, res) => {
    try {
        let categoryId = req.params.categoryId;
        let subCategoryId = req.params.subcategoryID;
        let categoryUpdate = req.body;

        updateCategory(categoryUpdate, categoryId, subCategoryId).then((result) => {
            res.status(200).send("Fasion category updated");
        }).catch((error) => {
            res.status(200).send({ "Category can not be updated due to": error.detail });
        });

    } catch (error) {
        console.log(error);
        res.send(error);
    }

})
// delete fashion category and subcatgory
app.delete('/fashion-category/:categoryId', (req, res) => {
    try {
        let categoryId = req.params.categoryId;
        deleteCategory(categoryId).then((result) => {
            if (result.rowCount > 0)
                res.status(200).send("Deleted the fasion category Id: " + categoryId);
            else {
                res.status(404).send("Fasion category Id is not valid: " + categoryId);
            }
        }).catch((error) => {
            res.status(200).send({ "Fasion category can not be Deleted due to": error.detail });
        });

    } catch (error) {
        console.log(error);
        res.send(error);
    }

})

// Appp running on PORT 3000 
app.listen(process.env.PORT || 3000);
console.log("app listening on port :", process.env.PORT);

