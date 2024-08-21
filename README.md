# Module_4_TUMMOG375_JSE2407_GroupD_Tumelo-Mogono_JSF04
# Refactor the e-commerce store in Vue.js
# Youtube video
https://youtu.be/ExKqhi4Je9E

# Peoject Overview
The aim of this project is to re-build the e-commerce store using Vue.js, utilizing the built e-commerce store in react.js.

The project was built using the Vue template using vite thus to run the project you will first need to install the node modules running npm install. Then you can run the code using npm run dev.

# Tech Stack 
* HTML
* CSS Tailwind
* JavaScript
* Vue.js

# Content
* Home Page
* Filter and Sort buttons
* Product List with cards of individual products
* A page that displays product details.
* A Cart page to display products added to cart.
* A Comparison page to compare products with a limit of four products.
* A Wishlist to have favourite products inside the wishlist.
* Checkout page to checkout products from the cart
* Paypal payment

# Usage 
The website is an e-commerce store which users can browse for different products from different categories.

* The home page which displays the product list displays all the products in cards in default sorting.
* The website contains a filter dropdown and the sort options.
* When the filter option for a category is selected a new api call is made to get new data for products of that specific category.
* The user can than sort the data based on price from low to high and high to low.
* The user can then see more details about the product by clicking a product card to go to another page which will display the product details.
* The user can now only access cart, wishlist and comparison if they are logged in.
* The user can add items to cart, wishlist or comparison.
* The user can see comparison between different product which is capped to 4 inside the comparison page.
* The user can see his/her favourite products inside the wishlist.
* The user can increase product quantities inside the cart and also checkout.
* The user can pay using paypal.

# Area of mastery
Working with Vue.js, the different ways to handle data compared to React.js and Alpine.js, how to structure components in Vue, as it differs from React.js using script tags, style tags and straight html nested inside a template tag, although I decided to use tailwind which rendered style tags unnecessary. The usage of pinia for state management, the usage of ref for reactivity, The usage of v-if and v-else for directives, Understood more of lifecycles such as using onMount. Then there was Routing which for my vue project I used vue-router which works slighlty similar to react-routers without the need for importing useParam. I learned to use dynamic tokens for different users using JWT. I learned to better reuse components using vue.js. I also learned to bind data more using different components.

# Project Process

# Challenges
In this project I struggled a bit with the carousel as it didn't function the way I needed which is why I decided to not use it at all. I then struggled alot with the paypal usage, the code was a struggle to make it work. Also to find resources that showed the usage of paypal using javascript.

# Feedback
This was a great introduction to another different JavaScript framework different from React.js, Alpine.js and Svelte.js . The project was diverse but thanks to the reference project and the knowledge of React.js, Svelte.js and JavaScript, this was fun to work on. The stretch goals helped to advance my knowledge of vue and how to build diverse things utilizing different techniques and methods.
