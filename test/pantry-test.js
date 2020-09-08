import { expect } from 'chai';

import sampleUserData from './sampleUserData.js'
import User from '../src/user.js';
import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js'
import ingredientsData from '../src/data/ingredients.js'

let user1, recipe1, recipe2, pantry, recipeIngredients1, recipeIngredients2;

describe('Pantry', () => {
  beforeEach(() => {
    recipeIngredients1 = recipeData[0];
    recipeIngredients2 = recipeData[1];
    recipe1 = new Recipe(recipeIngredients1, ingredientsData);
    recipe2 = new Recipe(recipeIngredients2, ingredientsData);
    user1 = new User(sampleUserData[0]);
    pantry = new Pantry(user1.pantry);
  });
it('Should be able to keep track of the user\'s pantry', () => {
  expect(pantry).to.have.property('pantry').with.length(0)
  expect(pantry.pantry).to.deep.eql([])
})
it('should be able to get the total amount og the user ingredients by id', () => {
  expect(pantry.consolidateUsersPantry()).to.eql({})

})
it.only('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    pantry.consolidateUsersPantry()
    pantry.giveFeedbackOnIngredients(recipe1)
    expect(pantry.checkPantryForIngredient(recipe1)).to.eql('You have the ingredients!');
  });

it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    expect(pantry.checkPantryForIngredient(recipeIngredients1)).to.eql('You do not have the ingredients!');
  });

  // it('Should inform User if they lack required ingredients for a given recipe', () => {
  //   expect(pantry.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  // });
});