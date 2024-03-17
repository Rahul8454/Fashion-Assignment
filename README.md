# Fashion-Assignment
About fashion assignment.

# Fashion Endpoint 
    1. GET http://localhost:3000/fashion-category
    2. POST http://localhost:3000/fashion-category
    3. PUT http://localhost:3000/fashion-category/:categoryId/:subcategoryID
    4. DELETE http://localhost:3000/fashion-category/:categoryId

# POST Example
     [{
        "category":  "Fashion new category",
        "personkey": "M",
        "sub_category":[{
                "sub_category_name":"Fashion new sub category"
            }
        ]
    }]

# PUT EXAMPLE 
     [{
        "category":  "Fashion Update category",
        "personkey": "MW",
        "sub_category":[{
                "sub_category_name":"Fashion Update sub category"
            }
        ]
    }]

# DB Info

    - database-script.sql
        - personkey can be "M" "W" or "MW" 
