class Cookbook {
  constructor(recipes, ingredients) {
    this.recipes = recipes;
    this.ingredients = ingredients;
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return (ingredient.name.includes(searchText)) ||
        (recipe.name.includes(searchText))
      });
    })
  }

  static getIngredients() {
    const ingredientsUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData'
    const promise = fetch(ingredientsUrl)
      .then(response => response.json());
    return promise; 
  }

  static getRecipes() {
    const recipesUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData'
    const promise = fetch(recipesUrl) 
      .then(response => response.json());
    return promise; 
  }
}

export default Cookbook;
