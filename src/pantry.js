class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
  }
  checkPantry(recipe) {
    let checkIngredients = recipe.ingredients.map(ingredient => ({[ingredient.id]: ingredient.quantity.amount}))
    this.contents.reduce((totalIngredients, currentIngredient) =>{
      if (currentIngredient.id)
      return totalIngredients
    }, [])
     console.log(checkIngredients)
    }
  }


export default Pantry;
