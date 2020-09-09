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
    const consolidatedPantry = this.consolidateUsersPantry();
    console.log('nP',consolidatedPantry)
    return recipe.ingredients.map(ingredient => {
      const ingredientsNeeded = {}
      ingredientsNeeded [ingredient.id] = consolidatedPantry[ingredient.id]
      if(!ingredientsNeeded[ingredient.id]) {
        ingredientsNeeded[ingredient.id] = 0
      }
      console.log(ingredientsNeeded)
      return ingredientsNeeded
    });
  }
 
  giveFeedbackOnIngredients(recipe) { 
    const userIngredients = this.checkPantryForIngredient(recipe);
    const returFeedback = recipe.ingredients.reduce((list, recipeItem) => {
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
    // console.log(returFeedback) 
    return returFeedback;
  }

  calculateIngredientsNeeded(recipe) {
    let userPantry = this.consolidateUsersPantry();
    let whatsNeeded =  recipe.ingredients.reduce((neededIng, currentIng) =>{
      if (!userPantry[currentIng.id]) {
        userPantry[currentIng.id] = 0
      }
      if (currentIng.quantity.amount - userPantry[currentIng.id] > 0) {
        neededIng.push({id: currentIng.id, amount: currentIng.quantity.amount - userPantry[currentIng.id]})
      }
      return neededIng
    },[])
    // console.log(whatsNeeded)
    return whatsNeeded
  }
  
  saveItemsToPantry(recipe){
    // console.log(this.pantry)
    // const ingredientsNeeded = calculateIngredientsNeeded(recipe);
    // this.pantry.push(ingredientsNeeded);
    // console.log()
    
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