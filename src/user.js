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


  addToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
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

  static getUserData(userId) {
    const userUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData'
    const promise = fetch(userUrl)
      .then(response => response.json())
      .then(data => data.wcUsersData.find(user => user.id === userId))
    return promise;
  }

}

export default User;
