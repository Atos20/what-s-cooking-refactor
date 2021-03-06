import './css/styles.scss';

import ingredientsData from './data/ingredients';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import DomUpdates from './DomUpdates';

let cookbook, currentUser, userPantry, currentRecipe;

const favButton = document.querySelector('.view-favorites');
const homeButton = document.querySelector('.home');
const searchInput = document.querySelector('#inpt_search');
const tagContainer = document.querySelector('.tag-container');
const cardArea = document.querySelector('.all-cards');
const recipesToCookButton = document.querySelector('#recipes-to-cook-button');
const domUpdates = new DomUpdates();

const displaySearch = () => {
  const inputByUser = searchInput.value
  let results = cookbook.findRecipe(inputByUser).map(recipe => recipe.id)
  domUpdates.updateSearchByRecipeName(results)
}

const addToCookLater = (event) => {
  let targetRecipe = cookbook.recipes.find(recipe => recipe.id === +event.target.id);
  let cookingStatus = domUpdates.toggleNameClass(event, recipesToCookButton, 'cook-active')
  cookingStatus ? currentUser.addToFavorites('recipesToCook', targetRecipe) : currentUser.removeFromFavorites('recipesToCook', targetRecipe);
}

const findRecipesToCook = () => {
  const recipeIds = currentUser.recipesToCook.map(recipe => recipe.id)
  domUpdates.viewSelectedCards(cardArea, currentUser, recipesToCookButton, recipeIds, 'recipesToCook');
}

const favoriteCard = (event) => {
  let specificRecipe = cookbook.recipes.find(recipe =>recipe.id  === +event.target.id);
  let favoriteStatus = domUpdates.toggleNameClass(event, favButton, 'favorite-active')
  favoriteStatus ? currentUser.addToFavorites('favoriteRecipes', specificRecipe) : currentUser.removeFromFavorites('favoriteRecipes', specificRecipe);
}

const declareRecipe = (event) => {
  let newRecipeInfo = cookbook.recipes.find(recipe => recipe.id === +event.target.id)
  const currentRecipe = new Recipe(newRecipeInfo, ingredientsData);
  return currentRecipe
}

const findDirections = (event) => {
  const currentRecipe = declareRecipe(event)
  let cost = currentRecipe.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  domUpdates.displayDirections(cardArea, currentRecipe, costInDollars, cookbook)
}

const postIngredients = (currentRecipe, condition) => {
  let ingredientToUpdate = userPantry.ingredientsToPantryRemote(currentRecipe, condition)
  let promisesReturned = ingredientToUpdate.reduce((returnValues, ingredient) => {
    returnValues.push(User.updateUserPantry(ingredient))
    return returnValues
  }, [])
  return Promise.all(promisesReturned)
}

const currentFavs = () => currentUser.favoriteRecipes.map(recipe => recipe.id);

const locateFavorites = () => {
  domUpdates.viewSelectedCards(cardArea, currentUser, favButton, currentFavs(), 'favoriteRecipes');
}

const tagHandler = (event) => {
  let filteredRecipes;
  const tagName = event.target.innerText;
  if (document.querySelector('.view-favorites').innerText === 'Refresh Favorites' ) {
    filteredRecipes = currentUser.filterFavorites(tagName)
  } else {
    filteredRecipes = cookbook.filterRecipesByTag(tagName)
  }
  domUpdates.populateCards(filteredRecipes, cardArea, currentFavs());
}

const homeHandler = () => {
  favButton.innerHTML = 'View Favorites';
  domUpdates.populateCards(cookbook.recipes, cardArea, currentFavs());
}

const cardButtonConditionals = (event) => {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  }
  if (event.target.classList.contains('instruction')) {
    declareRecipe(event)
    findDirections(event);
  } 
  if (event.target.classList.contains('add-button')) {
    addToCookLater(event);
  }
  if (event.target.classList.contains('icon')) {
    let id = event.target.id
    let currentRecipe = cookbook.recipes.find(x => x.id === +id)
    let ingredientFeedback = Object.values(userPantry.giveFeedbackOnIngredients(currentRecipe, cookbook))
    domUpdates.displayIngredientFeedback(ingredientFeedback, id)
  }
  if (event.target.classList.contains('back-button')) {
    domUpdates.populateCards(cookbook.recipes, cardArea, currentFavs())
  }
  if (event.target.classList.contains('purchase-button')) {
    let id = event.target.id
    const recipe = declareRecipe(event)
    const post = postIngredients(recipe, 'add') 
    post.then(values => Promise.all(values))
      .then(data => data.map(response => response.json()))
      .then(promises => Promise.all(promises))
      .then(messages => domUpdates.updateMessage(messages, id, recipe))
      .catch(err => alert(err))
  }
  if (event.target.classList.contains('cooked')) {
    let id = event.target.id
    const recipe = declareRecipe(event)
    const post = postIngredients(recipe, 'remove') 
    post.then(values => Promise.all(values))
      .then(data => data.map(response => response.json()))
      .then(promises => Promise.all(promises))
      .then(messages => domUpdates.updateMessage(messages, id, recipe))
      .catch(err => alert(err))
  }
}

const onStartup = () => {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let promise1 = Cookbook.getIngredients()
  let promise2 = Cookbook.getRecipes()
  let promise3 = User.getUserData(userId) 
  Promise.all([promise1, promise2, promise3])
    .then(values => {
      cookbook = new Cookbook(values[1].recipeData, values[0].ingredientsData)
      currentUser = new User(values[2])
      domUpdates.greetUser(currentUser)
      domUpdates.populateCards(cookbook.recipes, cardArea);
      userPantry = new Pantry(currentUser)  
    })
}

window.onload = onStartup();

homeButton.addEventListener('click', homeHandler);
cardArea.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', locateFavorites);
searchInput.addEventListener('input', displaySearch);
tagContainer.addEventListener('click', tagHandler);
recipesToCookButton.addEventListener('click', findRecipesToCook)

