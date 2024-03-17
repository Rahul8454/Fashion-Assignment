const { createCategory, updateCategory, deleteCategory } = require('../service/fashion');

test("create category and subcategory test", () => {
    let data = [{
        "category": "update  post",
        "personkey": "M",
        "sub_category": [{
            "sub_category_name": "update  Shirts"
        }
        ]
    }];
    expect(createCategory(data).then((result) => {
        expect(result.rowCount).toBeGreaterThan(0);
    }));
});

test("Failed to create category and subcategory test", () => {
    let data = [{
        "categor": "update  post", // invalid column
        "personkey": "M",
        "sub_category": [{
            "sub_category_name": "update  Shirts"
        }
        ]
    }];
    expect(createCategory(data).catch((error) => {
        expect(error);
    }));
});

// Should be a valid categoryId subCategoryId
test("Update category and subcategory test", () => {
    let categoryId = 169;
    let subCategoryId = 68;
    let data = [{
        "category": "update  post",
        "personkey": "M",
        "sub_category": [{
            "sub_category_name": "update  Shirts"
        }
        ]
    }];
    expect(updateCategory(data, categoryId, subCategoryId).then((result) => {
        expect(result.rowCount).toBeGreaterThan(0);
    }));
});

test("Failed to update category and subcategory test", () => {
    let categoryId = 169;
    let subCategoryId = 68;
    let data = [{
        "categor": "update  post", // invalid column
        "personkey": "M",
        "sub_category": [{
            "sub_category_name": "update  Shirts"
        }
        ]
    }];
    expect(updateCategory(data, categoryId, subCategoryId).catch((error) => {
        expect(error);
    }));
});

// Should be a valid categoryId subCategoryId
test("Delete category and subcategory test for valid", () => {
    let categoryId = 172;
    expect(deleteCategory(categoryId).then((result) => {
        expect(result.rowCount).toBeGreaterThan(0);
    }));
});

// Should be a invalid categoryId subCategoryId
test("Failed to delete category and subcategory test", () => {
    let categoryId = 168;
    expect(deleteCategory(categoryId).catch((error) => {
        expect(error);
    }));
});