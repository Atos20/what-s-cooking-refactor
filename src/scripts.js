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

homeButton.addEventListener('click', homeHandler);
cardArea.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', determineFavorites);
searchInput.addEventListener('input', domUpdates.updateSearch);
tagContainer.addEventListener('click', tagHandler);


function onStartup() {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let promise1 = Cookbook.getIngredients()
  let promise2 = Cookbook.getRecipes()
  let promise3 = User.getUserData(userId) 
  Promise.all([promise1, promise2, promise3])
    .then(values => {
      cookbook = new Cookbook(values[1].recipeData, values[0].ingredientsData)
      currentUser = new User(values[2])
      domUpdates.greetUser(currentUser)
      domUpdates.populateCards(cookbook.recipes, cardArea)
    })
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    return recipe.id  === Number(event.target.id)
  })
  let favoriteStatus = domUpdates.displayFavorite(event, favButton)
  favoriteStatus ? currentUser.addToFavorites(specificRecipe) : currentUser.removeFromFavorites(specificRecipe)
}

function findDirections() {
  let newRecipeInfo = cookbook.recipes.find(recipe => recipe.id === Number(event.target.id))
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  domUpdates.displayDirections(cardArea, recipeObject, costInDollars)
}

function currentFavs() {
  return currentUser.favoriteRecipes.map(recipe => recipe.id)
}

function determineFavorites() {
  domUpdates.viewFavorites(cardArea, currentUser, favButton, currentFavs())
}

function tagHandler(event) {
  let filteredRecipes;
  const tagName = event.target.innerText;
  if (!currentUser.favoriteRecipes.length) {
    filteredRecipes = cookbook.filterRecipesByTag(tagName)
    console.log(currentUser.favoriteRecipes)
  }else {
    filteredRecipes = currentUser.filterFavorites(tagName)
  }
  domUpdates.populateCards(filteredRecipes, cardArea, currentFavs())
}
  
function homeHandler() {
  favButton.innerHTML = 'View Favorites';
  domUpdates.populateCards(cookbook.recipes, cardArea, currentFavs());
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    findDirections(event);
  } 
}




