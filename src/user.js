class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

//need to change addto favorite to just add and 
  // elements
  addToFavorites(property, recipe) {
    if (!this[property].includes(recipe) && typeof recipe === 'object') {
      this[property].push(recipe)

    }
  }

  validateDataType(attribute, dataType) {
    return typeof attribute === dataType ? attribute : this.giveDefaultValue(dataType);
  }

  giveDefaultValue(dataType) {
    switch (dataType) {
      case 'string':
        return 'Invalid value given';
        break;
      case 'number':
        return 0;
        break;
    }
  }


  removeFromFavorites(property, recipe) {
    const i = this[property].indexOf(recipe);
    this[property].splice(i, 1)
  }

  filterFavorites(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(strgToSrch) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(strgToSrch)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(strgToSrch)
      });
    });
  }


  filterRecipesToCook(tag) {
    return this.recipesToCook.filter(recipe => {
      return recipe.tags.includes(tag);
    })
  }


  static getUserData(userId) {
    const userUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData'
    const promise = fetch(userUrl)
      .then(response => response.json())
      .then(data => data.wcUsersData.find(user => user.id === userId))
    return promise;
  }

  static updateUserPantry(someDataToSend) {
    console.log(someDataToSend)
    const recipesUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData'
    const promise = fetch(recipesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(someDataToSend),
    })
    return promise; 
  }
}

export default User;
