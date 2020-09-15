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
      let name = recipe.ingredients.find(ingredient => ingredient.id === recipeItem.id)
      if(!list[recipeItem.id]) {
        list[recipeItem.id] = undefined;
      }
      userIngredients.forEach(userIngredient => {
        let total = userIngredient[recipeItem.id] - recipeItem.quantity.amount
        if(userIngredient[recipeItem.id] >= recipeItem.quantity.amount) {
          list[recipeItem.id] = `You will have ${total} ${recipeItem.quantity.unit} of ${name.name} left`
        } 
         else if(userIngredient[recipeItem.id] < recipeItem.quantity.amount) {
          const missing = recipeItem.quantity.amount - userIngredient[recipeItem.id]
          list[recipeItem.id] = `sorry! it seems you are missing ${missing} ${recipeItem.quantity.unit} of ${name.name} `
        }
        else if(!list[recipeItem.id]) {
          const missing = recipeItem.quantity.amount
          list[recipeItem.id] = `sorry! you need ${missing } ${recipeItem.quantity.unit} of ${name.name}`
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

  itemsToPantryLocal(recipe, condition) {
    const requisition = recipe.ingredients.map(item => {
      const request = {
        ingredient: item.id, 
        ingredientModification: 0
      }
      if(condition === 'add'){
        request.ingredientModification = item.quantity.amount
      }
      if(condition === 'remove'){
        request.ingredientModification = -item.quantity.amount
      }
      return request
    })
    return requisition
  } 

  ingredientsToPantryRemote(recipe, condition) {

    const requisition = recipe.ingredients.map(item => {
      const request = {
        userID: this.userId, 
        ingredientID: item.id, 
        ingredientModification: 0
      }
      if(condition === 'add'){
        request.ingredientModification = item.quantity.amount
      }
      if(condition === 'remove'){
        request.ingredientModification = -item.quantity.amount
      }
      return request
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