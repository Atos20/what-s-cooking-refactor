let domUpdates = {
  populateCards(recipes) {
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
    // getFavorites();
  },
  cardButtonConditionals(event) {
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
}
export default domUpdates;

