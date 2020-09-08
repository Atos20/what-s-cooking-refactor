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
    console.log(userIngredients)
    const returFeedback = recipe.ingredients.reduce((list , recipeItem) => {
      if(!list[recipeItem.name]){
        list[recipeItem.name] = undefined
      }
      userIngredients.forEach(userIngredient => {
        let total = userIngredient[recipeItem.id] - recipeItem.quantity.amount
        if(userIngredient[recipeItem.id] >= recipeItem.quantity.amount){
          list[recipeItem.name] = `You will have ${total} ${recipeItem.quantity.unit} of ${recipeItem.name} left`
        } 
        if(userIngredient[recipeItem.id] < recipeItem.quantity.amount){
          let missing = recipeItem.quantity.amount - userIngredient[recipeItem.id]
          list[recipeItem.name] = `sorry! it seems you are missing ${missing} ${recipeItem.quantity.unit} of ${recipeItem.name}`
        }
        if(!list[recipeItem.name]){
          list[recipeItem.name] = `sorry! it seems you need to do some shopping`
        }
      });

      return list 
      }, {});
      console.log(returFeedback)
      return returFeedback;
    }
}
  

  export default Pantry;