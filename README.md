# What's Cookin?  🧑‍🍳🍲 


## Table of Contents
  - [Introduction](#introduction)
  - [Project Specs](#project-specs)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Deployed Page](#deployed-page)
  - [Possible Future Extensions](#possible-future-extensions)
  - [Set Up](#set-up)
  - [Organizational Resources](#organizational-resources)
  - [Contributors](#contributors)
  - [Challenges](#challenges)



## Introduction
  On the landing page, a randomized user will see all available recipes displayed after scrolling through some testimonials for displayed recipes. The user may click on any single recipe that shows a modal with details such as instructions, ingredients and cost of ingredients. The user can search a keyword and when the "search" button is clicked, any recipe with the keyword included in its name will appear. The user can also select one or multiple filter tags. 
  If a user clicks the "star" icon on a recipe card, that recipe will be added to the "cookbook" tab. When the user goes to the "cookbook" tab, they can search and filter their favorite recipes, and remove a recipe from favorites by deselecting the "star" icon.
  At the top of the page, the user will see their welcome message, as well as their pantry drop down in the top righthand corner. Here they can see what recipes exist in their pantry. After they 'star' some of their favrite recipes, they can check their cookbook to see if they are able to cook the recipe, or need to add ingredients. If they need to add ingredients, they can click "Add ingredients" and the needed ingredients will be added to their recipe. If they are able to cook the recipe, they can click "Cook Recipe!" and the recipe's ingredients will be removed from their pantry.
  
<img width="1375" alt="Screenshot 2022-11-07 at 9 28 28 PM" src="https://user-images.githubusercontent.com/106535343/200469143-08938abd-f256-4379-86ad-22e71f82a625.png">
 
<img width="1375" alt="Screenshot 2022-11-07 at 9 28 54 PM" src="https://user-images.githubusercontent.com/106535343/200469270-7a7f6369-d176-46d7-850a-0dc880577763.png">

<img width="1374" alt="Screenshot 2022-11-07 at 9 29 45 PM" src="https://user-images.githubusercontent.com/106535343/200469340-047a345c-b480-451b-a4ef-80f87c9d7dcf.png">

<img height="440" width="478" alt="Screenshot 2022-11-07 at 9 31 31 PM" src="https://user-images.githubusercontent.com/106535343/200470248-6f0117cf-5555-4115-84f7-5fcc7894f058.png">    <img height="440" width="478" alt="Screenshot 2022-11-07 at 9 40 09 PM" src="https://user-images.githubusercontent.com/106535343/200470087-b0cc7809-2dfc-4eae-905e-10531713e68e.png">



  


## Project Specs
  - Part 1 of the project spec & rubric can be found [here](https://frontend.turing.edu/projects/whats-cookin-part-one.html)
  - Part 2 of the project spec & rubric can be found [here] https://frontend.turing.edu/projects/whats-cookin-part-two.html


## Technologies
  - Javascript
  - HTML
  - CSS
  - Mocha/Chai 
  - Webpack 
  - Glide
  - API
  - Adobe Illustrator
  

## Features
- This project features API fetches to collect data on recipes, ingredients, and site users. 
- A slider to carousel food pictures and testimonials via the Glide library
- Recipes can be favorited, which will save them to the user's cookbook. 
- A user can search all recipes and their own cookbook by tag or by name.
- Recipes can be viewed in a modal, where their ingredients, instructions, and total cost will be displayed.


## Organizational Resources
- [Project Trello Board](https://trello.com/invite/b/yxwzcu4N/ATTIc45ed256e332178bfc2ae4c46e0babb27D482CC7/whatscookin)


## Deployed Page
- This project is currently not deployed, please see Set Up instructions below for directions on running this project locally!


## Possible Future Extensions
  - Ability to create reviews for their favorite (or not-so-favorite recipes)
  - GitHub Pages integration


## Set Up
1. Fork this repo  
2. Clone the repo to your local machine
3. In your terminal, run - `npm install`
4. View the project by starting the server by running `npm start` and view at  http://localhost:8080/


## Contributors
  - [Adelle Pitsas](https://github.com/Adelle-Pitsas)
  - [Tricia Holmes](https://github.com/tricia-holmes)
  - [James Wasmer](https://github.com/jwasmer)
  - [Ian McIntosh](https://github.com/grainymac)


## Challenges
This was our team's first time working with the following technology and concepts, which naturally came with a learning curve as we implemented them into our project:

- External data sets
- Using API Fetch calls to pull in the data
- Writing our own tests in order to follow TDD - we have previously followed pre-existing tests when building projects
- This project was in two parts, each completed over the span of one week for a total of two weeks.
