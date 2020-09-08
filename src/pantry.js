class Pantry {
  constructor(userIngredients) {
    //this is the users Pantry
    this.pantry = userIngredients;
  }

  consolidateUsersPantry() {
    return this.pantry.reduce((usersPantry, pantryItem) => {
      if(! usersPantry[pantryItem.ingredient]){
        usersPantry[pantryItem.ingredient] = 0
      }
      usersPantry[pantryItem.ingredient] += pantryItem.amount;
      return usersPantry;
    }, {});
  }

  checkPantryForIngredient(recipe) {
    const newPantry = this.consolidateUsersPantry();
    return recipe.ingredients.map(ingredient => ({[ingredient.id]: newPantry[ingredient.id]}));
  }
  
  //this method should know what ar the missing ingredientes
  //shpould give feed back about the ingredients
  giveFeedbackOnIngredients(recipe) { 
    const userIngredients = this.checkPantryForIngredient(recipe);
    const returFeedback = recipe.ingredients.reduce((list , recipeItem) => {
      console.log(list)
      if(!list[recipeItem.name]) {
        list[recipeItem.name] = undefined
      }
      userIngredients.forEach(userIngredient => {
        let total = userIngredient[recipeItem.id] - recipeItem.quantity.amount
        if(userIngredient[recipeItem.id] >= recipeItem.quantity.amount) {
          list[recipeItem.name] = `You will have ${total} ${recipeItem.quantity.unit} of ${recipeItem.name} left`
        } 
        if(userIngredient[recipeItem.id] < recipeItem.quantity.amount) {
          let missing = recipeItem.quantity.amount - userIngredient[recipeItem.id]
          let cost = this.calculateCost(missing, recipe.ingredientsData, recipeItem.id)
          list[recipeItem.name] = 
          `sorry! it seems you are missing ${missing} ${recipeItem.quantity.unit} of ${recipeItem.name} which will cost $${cost}`
        }
        if(!list[recipeItem.name]) {
          // console.log(userIngredient)
          let missing = recipeItem.quantity.amount
          let cost = this.calculateCost(missing, recipe.ingredientsData, recipeItem.id)
          list[recipeItem.name] = 
          `sorry! you need ${missing} ${recipeItem.quantity.unit} of ${recipeItem.name} which will cost $${cost}`
        }
      });
      return list 
    }, {});
    return returFeedback;
  }
  calculateCost(amountMissing, ingredientsData, ingredientID) {
    let costCounter = 0
    let ingredientCost = ingredientsData.find(currentIngredient => {
      return currentIngredient.id === ingredientID
    })
    costCounter += ingredientCost.estimatedCostInCents * amountMissing / 100
    // console.log(costCounter)
    return ingredientCost.estimatedCostInCents * amountMissing / 100
    }
    
}
  

export default Pantry;