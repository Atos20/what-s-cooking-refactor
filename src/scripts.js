import './css/base.scss';
import './css/styles.scss';

import ingredientsData from './data/ingredients';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import domUpdates from './domUpdates';
let cookbook, currentUser, userPantry;

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
  User.getUserData(userId) 
    .then(data => currentUser = new User(data))
    .then(() => domUpdates.greetUser(currentUser))
    .then(() => userPantry = new Pantry(currentUser.pantry))
}
function favoriteCard(event) {
  console.log(cookbook)
  let specificRecipe = cookbook.recipes.find(recipe => {
    return recipe.id  === Number(event.target.id)
  })
  let favoriteStatus = domUpdates.displayFavorite(specificRecipe, event, favButton)
  favoriteStatus ? currentUser.addToFavorites(specificRecipe) : currentUser.removeFromFavorites(specificRecipe)
}

function findDirections() {
  let newRecipeInfo = cookbook.recipes.find(recipe => recipe.id === Number(event.target.id))
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  domUpdates.displayDirections(cardArea, recipeObject, costInDollars)
}

function cardButtonConditionals(event) {
  console.log(event.target)
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    findDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    domUpdates.populateCards(cookbook.recipes);
  }
}




