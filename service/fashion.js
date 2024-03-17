const PoolDB = require('../database/connection');

/**
 * 
 * @param {*} fasionData 
 * @returns 
 */
const createCategory = (fasionData) => {
    return (new Promise((resolve, reject) => {
        for (obj of fasionData) {

            let catObj = obj;
            let sql = `INSERT INTO fasion_category(category, personkey)VALUES('${catObj.category}','${catObj.personkey}') RETURNING id`;

            PoolDB.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result && result.rows[0].id) {
                        if (catObj?.sub_category) {
                            for (subObj of catObj?.sub_category) {
                                let SubCategorySql = `INSERT INTO fasion_sub_category(sub_category_name, category_id)VALUES('${subObj.sub_category_name}','${result.rows[0].id}')`;
                                PoolDB.query(SubCategorySql, (error, subCatResult) => {
                                    if (error) {
                                        reject(error);
                                    }
                                    resolve(subCatResult);
                                });
                            }
                        }

                    }
                    resolve(result);
                }
            });
        }
    }));

}

/**
 * 
 * @param {*} categoryUpdate 
 * @param {*} categoryId 
 * @param {*} subCategoryId 
 * @returns 
 */
const updateCategory = (categoryUpdate, categoryId, subCategoryId) => {
    return (new Promise((resolve, reject) => {
        for (obj of categoryUpdate) {
            let catObj = obj;
            let updateCategorySql = `UPDATE fasion_category SET category='${catObj.category}', personkey='${catObj.personkey}' where id = ${categoryId}`;
            PoolDB.query(updateCategorySql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result && result.rowCount > 0) {
                        if (catObj?.sub_category) {
                            for (subObj of catObj?.sub_category) {
                                let SubCategorySql = `UPDATE fasion_sub_category SET sub_category_name = '${subObj.sub_category_name}' where sub_category_id = ${subCategoryId}`;
                                PoolDB.query(SubCategorySql, (error, subCatResult) => {
                                    if (error) {
                                        reject(error);
                                    }
                                    resolve(subCatResult);
                                });
                            }
                        }

                    }
                    resolve(result);
                }
            });
        }
    }));
}


/**
 * 
 * @param {*} categoryId 
 * @returns 
 */
const deleteCategory = (categoryId) => {
    return (new Promise((resolve, reject) => {

        let deleteSubSql = `Delete from fasion_sub_category where category_id=${categoryId}`;
        PoolDB.query(deleteSubSql, (error, result) => {
            if (error)
                reject(error);
            else {
                if (result) {
                    let deleteSql = `Delete from fasion_category where id = ${categoryId}`;
                    PoolDB.query(deleteSql, (error, CatResult) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(CatResult);
                    });

                }
                resolve(result);
            }
        });

    }));
}


module.exports = { createCategory, updateCategory, deleteCategory };
