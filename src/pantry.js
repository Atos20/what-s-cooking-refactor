class Pantry {
  constructor(user) {
    this.userId = user.id
    this.pantry = user.pantry;
    this.ingredientsNeeded;
  }

  consolidateUsersPantry() {
    return this.pantry.reduce((usersPantry, pantryItem) => {
      if(!usersPantry[pantryItem.ingredient]) {
        usersPantry[pantryItem.ingredient] = 0
      }
      usersPantry[pantryItem.ingredient] += pantryItem.amount;
      return usersPantry;
    }, {});
  }

  checkPantryForIngredient(recipe) {
    const consolidatedPantry = this.consolidateUsersPantry();
    return recipe.ingredients.map(ingredient => {
      const ingredientsNeeded = {}
      ingredientsNeeded [ingredient.id] = consolidatedPantry[ingredient.id]
      if(!ingredientsNeeded[ingredient.id]) {
        ingredientsNeeded[ingredient.id] = 0
      }
      return ingredientsNeeded
    });
  }
 
  giveFeedbackOnIngredients(recipe) { 
    const userIngredients = this.checkPantryForIngredient(recipe);
    const returnFeedback = recipe.ingredients.reduce((list, recipeItem) => {
      if(!list[recipeItem.name]) {
        list[recipeItem.name] = undefined;
      }
      userIngredients.forEach(userIngredient => {
        let total = userIngredient[recipeItem.id] - recipeItem.quantity.amount
        if(userIngredient[recipeItem.id] >= recipeItem.quantity.amount) {
          list[recipeItem.name] = `You will have ${total} ${recipeItem.quantity.unit} of ${recipeItem.name} left`
        } 
         else if(userIngredient[recipeItem.id] < recipeItem.quantity.amount) {
          const missing = recipeItem.quantity.amount - userIngredient[recipeItem.id]
          list[recipeItem.name] = `sorry! it seems you are missing ${missing} ${recipeItem.quantity.unit} of ${recipeItem.name} `
        }
        else if(!list[recipeItem.name]) {
          const missing = recipeItem.quantity.amount
          list[recipeItem.name] = `sorry! you need ${missing } ${recipeItem.quantity.unit} of ${recipeItem.name}`
        }
      });
      return list 
    }, {});
    return returnFeedback;
  }

  calculateIngredientsNeeded(recipe) {
    const userPantry = this.consolidateUsersPantry();
    const whatsNeeded =  recipe.ingredients.reduce((neededIng, currentIng) =>{
      if (!userPantry[currentIng.id]) {
        userPantry[currentIng.id] = 0
      }
      if (currentIng.quantity.amount - userPantry[currentIng.id] > 0) {
        neededIng.push({ingredient: currentIng.id, amount: currentIng.quantity.amount - userPantry[currentIng.id]})
      }
      return neededIng
    },[])
    this.ingredientsNeeded = whatsNeeded;
    return whatsNeeded
  }
  //i am not sure why this methosis breaking the calculate cost method.
  // saveItemsToPantry(recipe) { 
  //   const itemsNeeded = this.calculateIngredientsNeeded(recipe);
  //   this.pantry.push(...itemsNeeded);
  //   const entries = Object.entries(this.consolidateUsersPantry())
  //   const reorganizedData = entries.map(item => {
  //     return {ingredient: item[0], amount: item[1]}
  //   })
  //   return reorganizedData
  // }

  saveItemsInPantry(recipe) {
    const shoppingToPantry = recipe.ingredients.map(item => {
      return {
        ingredient: item.id, 
        ingredientModification: item.quantity.amount
      }
    })
    return shoppingToPantry
  } 

  ingredientsToPantry(recipe){
    const requisition = recipe.ingredients.map(item => {
      return {
        userID: this.userId, 
        ingredientID: item.id, 
        ingredientModification: item.quantity.amount
      }
    })
    return requisition
  }
   
  removeIngredientsFromPantry(recipe){
    const requisition = recipe.ingredients.map(item => {
      return  {
        userID: this.userId, 
        ingredientID: item.id, 
        ingredientModification: -item.quantity.amount
      }
    })
    return requisition
  }
  
  calculateCost(recipe) {
    const list = this.calculateIngredientsNeeded(recipe);
    let costCounter = 0;
    list.forEach(ingredient => {
      const ingredientData = recipe.ingredientsData.find(recipeIng => { 
        return recipeIng.id === ingredient.ingredient
      })
      costCounter += ingredientData.estimatedCostInCents * ingredient.amount
    })
    return Number((costCounter / 100).toFixed(2))
  }

  cookMeal(recipe) { 
    const reducedRecipeContents = recipe.ingredients.map(ingredient => {
      return ingredient = {id: ingredient.id, amount: ingredient.quantity.amount}
    })
    let updatedContents = this.pantry.reduce((acc, ingredient) => {
      const reducedRecipeContent = reducedRecipeContents.find(item => item.id === ingredient.ingredient)
      if (reducedRecipeContent) {
        ingredient.amount = ingredient.amount - reducedRecipeContent.amount
      }
      if (ingredient.amount > 0) {
        acc.push(ingredient)
      }
      return acc;
    },[])
    this.pantry = updatedContents
  }
  
}

export default Pantry;