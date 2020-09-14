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
              <header id='${recipe.id} name' class='card-header'>
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
                <button id='${recipe.id}' class="instruction">Instructions</button>
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
    const ingredientsIds = recipeObject.ingredients.map(ingredient => ingredient.id)
    const currentRecipe = ingredientsIds.map(id => recipeObject.ingredientsData.find(ing => ing.id === id))
    const amounts = recipeObject.ingredients.map(ingredient => ({id: ingredient.id, amount : ingredient.quantity.amount, unit: ingredient.quantity.unit}))
    const data = currentRecipe.map(ingredient => ({id: ingredient.id, name: ingredient.name}))
    const mergedData = amounts.map((amount, i) => {
      if(amount.id === data[i].id){
        return Object.assign({},amount,data[i])
      }
    })
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
    // console.log(recipeObject.ingredients)
    mergedData.forEach(ingredient => {
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
      ${ingredient.amount.toFixed(2)} ${ingredient.unit}
      ${ingredient.name}</li></ul>
      `)
    })
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
      ${instruction.instruction}</li>
      `)
    })
  }

  updateSearchByRecipeName(inputByUser) {
    const recipeCards = document.querySelectorAll('.recipe-name')
    const lowerInput = inputByUser.toLowerCase()
    recipeCards.forEach(recipe => {
      let lowerCaseRecipe = recipe.innerText.toLowerCase()
        if (!lowerCaseRecipe.includes(lowerInput)) {
          document.getElementById(recipe.id).classList.add("hidden")
          } else {
            document.getElementById(recipe.id).classList.remove("hidden");
          }
      })
  }

  updateSearchByIngredientName(inputByUser, cookbook){
    const lowerCaseInput = inputByUser.toLowerCase()
    
    //by iterating through the cookbook.ingredients => ing names || ing.name 
    //when the user types milk => i should me able to find the ing id
    //iterating through the coobkbook.recipes[]/map(e => e.ingredient.includes(ing.id)find the recipe the recipe)
    const ingredientsNames = cookbook.ingredients.map(ingredient => ingredient.name) //array of names
    const ingredientsIds = cookbook.ingredients.map(ingredient => ingredient.id) //array of ids
    //find the id of the ingredient input by the user
    // console.log(cookbook.ingredients)

    //if I am able to returnt the id I should be able to target the recipes and do the add and remove hidden
}


  greetUser(currentUser) {
    const userName = document.querySelector('.user-name');
    userName.innerHTML = `
    Welcome ${currentUser.name.split(' ')[0]} ${currentUser.name.split(' ')[1][0]}.
    `
  }

  displayIngredientFeedback(feedback, id) {
    let card = document.getElementById(id)
    // let name = document.getElementById(`${id} name`)
    card.innerHTML = ``;
    card.insertAdjacentHTML('beforeend', `
    <div class="user-options">
      <button class="back-button">No Thanks</button>
      <button id="${id}" class="purchase-button">Add Ingredients</button>
    </div>
    `)
    feedback.forEach(ingredient => card.innerHTML += `
    <ul class="feedback">
      <li>${ingredient}</li>
    </ul>
    `)
  }

  updatePurchase(messages, id){
    let card = document.getElementById(id)
    const values = messages.map( message => message.message)
    card.innerHTML = ``;
    values.forEach(message => card.innerHTML +=`
    <ul class="feedback">
      <li>${message}</li>
    </ul>
    `)
    card.insertAdjacentHTML('beforeend', `
    <button class='cooked'>Check when cooked</button>
    <i class="fas fa-arrow-circle-left back-button"></i>
    `)
 }
}

export default DomUpdates;
