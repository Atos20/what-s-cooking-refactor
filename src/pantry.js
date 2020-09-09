class Pantry {
  constructor(userIngredients) {
    //this is the users Pantry
    this.pantry = userIngredients;
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
    const newPantry = this.consolidateUsersPantry();
    return recipe.ingredients.map(ingredient => {
      const newData = {}
      newData [ingredient.id] = newPantry[ingredient.id]
      if(!newData[ingredient.id]) {
        newData[ingredient.id] = 0
      }
      return newData
    });
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
          `sorry! it seems you are missing ${missing} ${recipeItem.quantity.unit} of ${recipeItem.name} `
        }
        if(!list[recipeItem.name]) {
          let missing = recipeItem.quantity.amount
          `sorry! you need ${missing} ${recipeItem.quantity.unit} of ${recipeItem.name}`
        }
      });
      return list 
    }, {});
    return returFeedback;
  }
  calculateIngredientsNeeded(recipe) {
    let userPantry = this.consolidateUsersPantry();
    let whatsNeeded =  recipe.ingredients.reduce((neededIng, currentIng) =>{
      if (!userPantry[currentIng.id]) {
        userPantry[currentIng.id] = 0
      }
      if (currentIng.quantity.amount - userPantry[currentIng.id] > 0) {
        neededIng.push({id: currentIng.id, amountNeeded: currentIng.quantity.amount - userPantry[currentIng.id]})
      }
      return neededIng
    },[])
    return whatsNeeded
  }

  calculateCost(recipe) {
    let list = this.calculateIngredientsNeeded(recipe)
    let costCounter = 0;
    list.forEach(ingredient => {
      let ingredientData = recipe.ingredientsData.find(recipeIng => { 
        return recipeIng.id === ingredient.id
      })
      costCounter += ingredientData.estimatedCostInCents * ingredient.amountNeeded
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