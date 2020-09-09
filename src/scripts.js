import './css/base.scss';
import './css/styles.scss';

import ingredientsData from './data/ingredients';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
<<<<<<< Updated upstream
=======
import domUpdates from './domUpdates';
>>>>>>> Stashed changes

let favButton = document.querySelector('.view-favorites');
let cardArea = document.querySelector('.all-cards');
let homeButton = document.querySelector('.home')
let searchInput = document.querySelector('#inpt_search');
let cookbook = new Cookbook(recipeData);
const tagContainer = document.querySelector('.tag-container');
<<<<<<< Updated upstream
let user, pantry;
=======

>>>>>>> Stashed changes

window.onload = onStartup();

homeButton.addEventListener('click', domUpdates.cardButtonConditionals);
cardArea.addEventListener('click', domUpdates.cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
searchInput.addEventListener('input', updateSearch);
tagContainer.addEventListener('click', findRecipeBytag);

<<<<<<< Updated upstream

function onStartup() {
=======

function onStartup() {
  populateCookBook();
  populateUserData();
}

function populateCookBook() {
  let ingredients, recipes;
  Cookbook.getIngredients()
    .then(data => ingredients = data)
  Cookbook.getRecipes()
    .then(data => recipes = data)
    .then(() => new Cookbook(recipes, ingredients))
    .then(data =>  domUpdates.populateCards(data.recipes.recipeData))
}

function populateUserData() {
>>>>>>> Stashed changes
  let userId = (Math.floor(Math.random() * 49) + 1)
  let newUser = users.find(user => {
    return user.id === Number(userId);
  });
  user = new User(userId, newUser.name, newUser.pantry)
  pantry = new Pantry(newUser.pantry)
  populateCards(cookbook.recipes);
  greetUser();
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




function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  console.log(newRecipeInfo)
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
