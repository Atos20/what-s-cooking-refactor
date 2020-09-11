import scripts from './domUpdates';

let domUpdates = {
  populateCards(recipes, user) {
    let cardArea = document.querySelector('.all-cards');
    cardArea.innerHTML = '';
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    recipes.forEach(recipe => {
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
    this.getFavorites(user)
  },
  viewFavorites(cardArea, user, favButton) {
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
      this.getFavorites(user)
    }
  },
  displayFavorite(specificRecipe, event, favButton) {
    if (!event.target.classList.contains('favorite-active')) {
      event.target.classList.add('favorite-active');
      favButton.innerHTML = 'View Favorites';
      return  true
    } else if (event.target.classList.contains('favorite-active')) {
      event.target.classList.remove('favorite-active');
      return false
    }
  },
  displayDirections(cardArea, recipeObject, costInDollars) {
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
  },
  findRecipeByTag(event, user, cardArea) {
    const tagName = event.target.innerText;
    const filteredRecipes = user.filterFavorites(tagName);
    cardArea.innerHTML = '';
    if (filteredRecipes.length !== 0) {
      this.populateCards(filteredRecipes, user);
    }
    return false;
  },
  updateSearch() {
    let recipeNames = document.querySelectorAll('.recipe-name');
    recipeNames.forEach(recipe =>{
      let lowerCaseRecipe = recipe.innerText.toLowerCase()
      if (!lowerCaseRecipe.includes(searchInput.value)) {
        document.getElementById(recipe.id).classList.add("hidden")
      } else {
        document.getElementById(recipe.id).classList.remove("hidden");
      }
    })
  },
  greetUser(currentUser) {
    const userName = document.querySelector('.user-name');
    userName.innerHTML = `
    Welcome ${currentUser.name.split(' ')[0]} ${currentUser.name.split(' ')[1][0]}.`;
  },
  getFavorites(user) {
    
    if (user.favoriteRecipes) {
      user.favoriteRecipes.forEach(recipe => {
        document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
      })
    } else {
      return
    }
  },
  
}
export default domUpdates;

