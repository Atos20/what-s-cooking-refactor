class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
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

  addToFavorites(recipe) {
    if(typeof recipe === 'object') {
      this.favoriteRecipes.push(recipe)
    }
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
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

  addToCook(recipe) {
    if (typeof recipe === 'object') {
      this.recipesToCook.push(recipe)
    }
  }

  removeFromRecipesToCook(recipe) {
    let cooked = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(cooked, 1)
  }

  static getUserData(userId) {
    const userUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData'
    const promise = fetch(userUrl)
      .then(response => response.json())
      .then(data => data.wcUsersData.find(user => user.id === userId))
    return promise;
  }

}

export default User;
