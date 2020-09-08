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
}

export default Cookbook;
