import './css/base.scss';
import './css/styles.scss';

import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';
import users from './data/users';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import sampleUserData from '../test/sampleUserData';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let searchInput = document.querySelector('#inpt_search');
const tagContainer = document.querySelector('.tag-container');
let user, pantry, cookbook;

window.onload = onStartup();

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);
searchInput.addEventListener('input', updateSearch);
tagContainer.addEventListener('click', findRecipeBytag);



function onStartup() {
  // populateCookBook();
  // populateUserData()
  greetUser();
  pantry = new Pantry(newUser.pantry)
}

function populateCookBook() {
  let ingredients, recipes;
  Cookbook.getIngredients()
    .then(data => ingredients = data)
  Cookbook.getRecipes()
    .then(data => recipes = data)
    .then(() => new Cookbook(recipes, ingredients))
    .then(data =>  populateCards(data.recipes.recipeData))
}

function populateUserData() {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let currentUser 
  User.getUserData(userId) 
    .then(data => currentUser = data)
    .then(data => console.log(currentUser))
}

function viewFavorites() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    populateCards(cookbook.recipes);
    return
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';
    user.favoriteRecipes.forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', 
        `
      <div id='${recipe.id}'class='card'>
      <header id='${recipe.id}' class='card-header'>
      <div class='header-container'>
        <label for='add-button' class='hidden'></label>
        <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
          <img id='${recipe.id} favorite' class='add'
          src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
          recipes to cook'>
        </button>
        <label for='favorite-button' class='hidden'>Click to favorite recipe
        </label>
        <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
      </div>
      <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
      <img id='${recipe.id}' tabindex='0' class='card-picture'
        src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
      </header>
  </div>
      `)
    })
  }
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML = `
  Welcome ${user.name.split(' ')[0]} ${user.name.split(' ')[1][0]}.`;
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  if (!event.target.classList.contains('favorite-active')) {
    event.target.classList.add('favorite-active');
    favButton.innerHTML = 'View Favorites';
    user.addToFavorites(specificRecipe);
  } else if (event.target.classList.contains('favorite-active')) {
    event.target.classList.remove('favorite-active');
    user.removeFromFavorites(specificRecipe)
  }
}

function cardButtonConditionals(event) {
  console.log(event.target)
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    populateCards(cookbook.recipes);
  }
}


function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  cardArea.classList.add('all');
  cardArea.innerHTML = `
    <h3>${recipeObject.name}</h3>
      <p class='all-recipe-info'>
      <strong>It will cost: </strong><span class='cost recipe-info'>
      $${costInDollars}</span><br><br>
      <strong>You will need: </strong><span class='ingredients recipe-info'></span>
      <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
      </span></ol>
    </p>`;


  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
}

function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  } else {
    return
  }
}

function populateCards(recipes) {
  cardArea.innerHTML = '';
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  recipes.forEach(recipe => {
    console.log(recipe)
    cardArea.insertAdjacentHTML('afterbegin', `
      <div id='${recipe.id}'class='card'>
        <header id='${recipe.id}' class='card-header'>
        <div class='header-container'>
          <label for='add-button' class='hidden'></label>
          <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
            <img id='${recipe.id} favorite' class='add'
            src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
            recipes to cook'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
        </div>
        <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
        <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
        </header>
    </div>
    `
    )
  })
  // getFavorites();
}

function findRecipeBytag(event) {
  const tagName = event.target.innerText;
  const filteredRecipes = user.filterFavoritesByTag(tagName);
  cardArea.innerHTML = '';
  if (filteredRecipes.length !== 0) {
    populateCards(filteredRecipes);
  }
  return false;
}

function updateSearch() {
  let recipeNames = document.querySelectorAll('.recipe-name');
  recipeNames.forEach(recipe =>{
    let lowerCaseRecipe = recipe.innerText.toLowerCase()
    if (!lowerCaseRecipe.includes(searchInput.value)) {
      document.getElementById(recipe.id).classList.add("hidden")
    } else {
      document.getElementById(recipe.id).classList.remove("hidden");
    }
  })
  
}
