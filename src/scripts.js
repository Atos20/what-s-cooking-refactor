import './css/base.scss';
import './css/styles.scss';

import ingredientsData from './data/ingredients';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import DomUpdates from './DomUpdates';
let cookbook, currentUser, userPantry;

window.onload = onStartup();
const favButton = document.querySelector('.view-favorites');
const homeButton = document.querySelector('.home')
const searchInput = document.querySelector('#inpt_search');
const tagContainer = document.querySelector('.tag-container');
const cardArea = document.querySelector('.all-cards');
const toCookLaterIcon = document.querySelector('.add-button');
const recipesToCookButton = document.querySelector('#recipes-to-cook-button')

const domUpdates = new DomUpdates()
homeButton.addEventListener('click', homeHandler);
cardArea.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', locateFavorites);
searchInput.addEventListener('input', domUpdates.updateSearch);
tagContainer.addEventListener('click', tagHandler);
recipesToCookButton.addEventListener('click', findRecipesToCook)

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

function addToCookLater(event) {
  let targetRecipe = cookbook.recipes.find(recipe => recipe.id === Number(event.target.id));
  let cookingStatus = domUpdates.toggleNameClass(event, recipesToCookButton, 'cook-active')
  cookingStatus ? currentUser.addToFavorites('recipesToCook', targetRecipe) : currentUser.removeFromFavorites('recipesToCook', targetRecipe);
  console.log(currentUser.recipesToCook)
 }

 function findRecipesToCook(){
   const recipeIds = currentUser.recipesToCook.map(recipe => recipe.id)
   domUpdates.viewSelectedCards(cardArea, currentUser, recipesToCookButton, recipeIds, 'recipesToCook');
 }

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe =>recipe.id  === +event.target.id);
  let favoriteStatus = domUpdates.toggleNameClass(event, favButton, 'favorite-active')
  favoriteStatus ? currentUser.addToFavorites('favoriteRecipes', specificRecipe) : currentUser.removeFromFavorites('favoriteRecipes', specificRecipe);
  // console.log(currentUser.favoriteRecipes)
}

function findDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => recipe.id === Number(event.target.id))
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  domUpdates.displayDirections(cardArea, recipeObject, costInDollars)
}

function currentFavs() {
  return currentUser.favoriteRecipes.map(recipe => recipe.id);
}

function locateFavorites() {
  domUpdates.viewSelectedCards(cardArea, currentUser, favButton, currentFavs(), 'favoriteRecipes');
}

function tagHandler(event) {
  let filteredRecipes;
  const tagName = event.target.innerText;
  if (document.querySelector('.view-favorites').innerText === 'Refresh Favorites' ) {
    filteredRecipes = currentUser.filterFavorites(tagName)
  } else {
    filteredRecipes = cookbook.filterRecipesByTag(tagName)
  }
  domUpdates.populateCards(filteredRecipes, cardArea, currentFavs());
}

function homeHandler() {
  favButton.innerHTML = 'View Favorites';
  domUpdates.populateCards(cookbook.recipes, cardArea, currentFavs());
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  }
  if (event.target.classList.contains('card-picture')) {
    findDirections(event);
  } 
  if(event.target.classList.contains('add-button')){
    // console.log(typeof event.target.id)
    addToCookLater(event);
  }
 }





