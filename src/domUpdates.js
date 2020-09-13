// import scripts from './DomUpdates';

class DomUpdates {
  constructor() {
    this.name = 'Dom'
  }
  
  populateCards(recipes, cardArea, selectedIds, button, propertyName) {
    cardArea.innerHTML = '';
    recipes.forEach(recipe => {
      let buttonStatus, message, icon;
      if (selectedIds && selectedIds.includes(recipe.id) && propertyName === 'favoriteRecipes') {
        // if(propertyName === 'favoriteRecipes'){
        buttonStatus = `favorite-active`
        message = 'Favorited'
        icon = `<i class="fas fa-utensil-spoon icon" id = "${recipe.id}"></i>`
      } else {
        // if(propertyName === 'recipesToCook'){
        message = 'Bon apetite!'
        icon = `<i class="fas fa-utensils icon" id = "${recipe.id}"></i>`
      }
      cardArea.insertAdjacentHTML('afterbegin', `
            <div id='${recipe.id}'class='card'>
              <h1>${message || 'Recipe Card'}</h1>
              <header id='${recipe.id}' class='card-header'>
              ${icon || `<i class="fas fa-utensil-spoon icon" id = "${recipe.id}"></i>`}
              <div class='header-container'>
                <label id='' for='add-button' class='hidden '></label>
                <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
                <img id='${recipe.id}' class="add add-button"
                src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
                recipes to cook'>
                </button>
                <label for='favorite-button' class='hidden'>Click to favorite recipe
                </label>
                <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} ${buttonStatus} card-button'></button>
              </div>
              <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
              <img id='${recipe.id}' tabindex='0' class='card-picture'
                src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
              </header>
          </div>
          `
      )
    }) 
  }

  viewSelectedCards(cardArea, user, button, recipeIds, propertyName) {
    if (!user[propertyName].length) {
      button.innerHTML = 'You have no recipes!';
      return
    } else {
      button.innerHTML = 'recipes';
      cardArea.innerHTML = '';
      this.populateCards(user[propertyName], cardArea, recipeIds, button, propertyName)
    }
  }

  //👇🏽 changed the name 
  toggleNameClass(event, button, nameClass) {
    if (!event.target.classList.contains(`${nameClass}`)) {
      event.target.classList.add(`${nameClass}`);
      button.style.backgroundColor = 'orange';
      return  true
    } else if (event.target.classList.contains(`${nameClass}`)) {
      event.target.classList.remove(`${nameClass}`);
      return false
    }
  }
  
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
  }

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
  }

  greetUser(currentUser) {
    const userName = document.querySelector('.user-name');
    userName.innerHTML = `
    Welcome ${currentUser.name.split(' ')[0]} ${currentUser.name.split(' ')[1][0]}.`;
  }
}

export default DomUpdates;

