class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
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

  calculateCost() {
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
        }
      })
    });
    return costCounter;
  }
}

export default Recipe;
