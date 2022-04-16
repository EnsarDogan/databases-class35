**What columns violate 1NF?**

1. According to 1NF "All data must be atomic (every column should only contain a single value)". As seen on food_code column and on food_description column , they contain multiple values like (C1, C2) or (Curry, Cake). Instead it can be used order id to identify what the customers want.

2. According to 1NF "Attribute domain should not change (all values in a column must be of the same kind or type)." As seen on dinner_date column, it contains different kind of values like (2020-03-15, 2020/03/15, Mar 25 '20, 01-04-2020)

**What entities do you recognize that could be extracted?**

1. According to 2NF " No non prime attribute should be functionally dependant on any proper subset of candidate key". AS seen on table member_name and member_address columns are dependent on member id. Those could be extracted.
2. venue_code, venue_description, food_code and food_description columns are dependent on dinner_id column. Those could be extracted as well.

**Name all the tables and columns that would make a 3NF compliant solution.**

**Member Info Table**

1. member_id primary key
2. member_name
3. member_address

**Dinner Info Table**

1. dinner_id primary key
2. venue_code
3. dinner_date

**Venues Info Table**

1. venue-code primary key
2. venue_description

**Foods Info Table**

1. food-code primary key
2. food_description

**Dinners_Food_Codes Table**

1. dinners-food-codes-id primary key
2. dinner id foreign key
3. food_code foreign key

**Client_Orders_Table**

1. client-order-id primary key
2. member_id foreign key
3. dinner_id foreign key
