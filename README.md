# Ecommerce Backend Assignment

## Project Setup

1. Clone the GitHub repo
2. Open command line, navigate to the project directory, and run '**npm install**'.
3. Create an account on MongoDB and get a connection URI.
4. Create '**.env**' file in the directory and the following to the file
   * MONGODB_URI='**YOUR_CONNECTION_URI**'
   * CRYPTO_SECRET='**ANY_SECRET_OF_YOUR_CHOICE**'
5. Run '**npm start**' in the command line to start the server.

## API Documentation
For making API requests use Postman or any other application of your choice.

### Authentication
#### SignUp
Endpoint: **PUT** '**/auth/signup**'  
Request body: {"email": "**YOUR_EMAIL**", "password": "**YOUR_PASSWORD**", "name": "**YOUR_NAME**"}  
Constraints:
1. All fields are required
2. Password should contain at least 8 characters

#### Login
Endpoint: **POST** '**/auth/login**'  
Request body: {"email": "**YOUR_EMAIL**", "password": "**YOUR_PASSWORD**"}  
Constraints:
1. All fields are required

The response will a JWT token which will be required for making API further requests.  
  
Note that all of the following API requests will contain the following header  
Authorization: Bearer {**JWT_TOKEN**}  
The JWT token has an expiration time of **1 hour**. After it has expired, a new JWT token has to be generated to make the following API requests.

### Category
#### Category List
Endpoint: **GET** '**/categories**'  
Query parameters: '**page={PAGE_NUMBER}**'  
The response will contain maximum 5 categories per page. Use the query parameters to move to other pages.  
For example, to view categories on page 2 the endpoint will be '**/ecommerce/categories?page=2**'.

### Product
#### Create new product
Endpoint: **POST** '**/create-product**'  
Request body: {"title": "**TITLE_OF_PRODUCT**, "price": "**PRICE_OF_PRODUCT**", "description": "**DESCRIPTION_OF_PRODUCT**", "availability": "**QUANTITIY_TO_BE_ADDED**", "categoryName": "**CATEGORY_NAME**"}  
The response will be a confirmation message and the details of the newly created product.

#### Product List
Endpoint: **GET** '**/product-list/{categoryId}**'  
The response will be a list of products belonging to the category of which category ID is passed in the url.

#### Product Details
Endpoint: **GET** '**/product/{productId}**'  
The response will be detailed version of the product.

### Cart Management
#### Add product to Cart
Endpoint: **PUT** '**/cart/add-to-cart**'  
Request body: {"productId": "**PRODUCT_ID**"}  
The product with the given product ID will be added to the cart with quantity 1.

#### View Cart
Endpoint: **GET** '**/cart**'  
The response will be the list of products and their respective quantity in the cart.

#### Update quantity
Endpoint: **PUT** '**/cart/update-product**'  
Request body: {"productId": "**PRODUCT_ID**", "quantity": "**NEW_QUANTITY**"}  
The response will be the updated product details with new quantity.

#### Remove item from cart
Endpoint: **PUT** '**/cart/remove-product**'  
Request body: {"productId": "**PRODUCT_ID**"}  
The response will be a confirmation message and product ID of the product which is removed from the cart.

### Order Management
#### Place order
Endpoint: **POST** '**/place-order**'  
The response will be a confirmation message and the newly placed order.

#### Order history
Endpoint: **GET** '**/order-history**'  
The response will be a list of all orders placed in the past.

#### Order detail
Endpoint: **GET** '**/order/{orderId}**'  
The response will be a detailed version of order.
