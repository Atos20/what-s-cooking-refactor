import './css/base.scss';
import './css/styles.scss';

import ingredientsData from './data/ingredients';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import domUpdates from './domUpdates';
let cookbook, user;

window.onload = onStartup();
const favButton = document.querySelector('.view-favorites');
const homeButton = document.querySelector('.home')
const searchInput = document.querySelector('#inpt_search');
const tagContainer = document.querySelector('.tag-container');
const cardArea = document.querySelector('.all-cards');

homeButton.addEventListener('click', cardButtonConditionals);
cardArea.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', domUpdates.viewFavorites);
searchInput.addEventListener('input', domUpdates.updateSearch);
tagContainer.addEventListener('click', domUpdates.findRecipeBytag);


function onStartup() {
  populateCookBook();
  populateUserData();
}

function populateCookBook() {
  let ingredients, recipes;
  Cookbook.getIngredients()
    .then(data => ingredients = data.ingredientsData)
  Cookbook.getRecipes()
    .then(data => recipes = data.recipeData)
    .then(() => cookbook = new Cookbook(recipes, ingredients))
    .then(data =>  domUpdates.populateCards(data.recipes))
}

function populateUserData() {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let currentUser, userPantry
  User.getUserData(userId) 
    .then(data => currentUser = data)
    .then(() => domUpdates.greetUser(currentUser))
    .then(() => userPantry = new Pantry(currentUser.pantry))
    .then(() => console.log(userPantry))
}
function favoriteCard(event) {
  console.log(cookbook)
  let specificRecipe = cookbook.recipes.find(recipe => {
    return recipe.id  === Number(event.target.id)
  })
  let favoriteStatus = domUpdates.displayFavorite(specificRecipe, event, favButton)
  favoriteStatus ? user.addToFavorites(specificRecipe) :user.removeFromFavorites(specificRecipe)
}

function cardButtonConditionals(event) {
  console.log(event.target)
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    domUpdates.displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    domUpdates.populateCards(cookbook.recipes);
  }
}




