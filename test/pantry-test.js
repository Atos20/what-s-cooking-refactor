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
    expect(pantry).to.have.property('pantry').with.length(20)
    expect(pantry.pantry).to.deep.eql(user1.pantry)
  })
  it('Should consolidate duplicate ingredients', () => {
    let consolidatedPantry = (pantry.consolidateUsersPantry())
    expect(consolidatedPantry[1123]).to.equal(8)

  })
  it.skip('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    pantry.consolidateUsersPantry()
    pantry.giveFeedbackOnIngredients(recipe1)
    expect(pantry.checkPantryForIngredient(recipe1)).to.eql('You have the ingredients!');
  });

  it.skip('Should be able to check if user does not have ingredients in pantry', () => {
    expect(pantry.checkPantryForIngredient(recipeIngredients1)).to.eql('You do not have the ingredients!');
  });

  it('Should be able to determine what ingredients a user is missing from their pantry ', () => {
    expect(pantry.calculateIngredientsNeeded(recipe1)).to.eql([
      { id: 20081, amountNeeded: 1.5 },
      { id: 19334, amountNeeded: 0.5 },
      { id: 1012047, amountNeeded: 24 },
      { id: 10019903, amountNeeded: 2 },
      { id: 2050, amountNeeded: 0.5 }
    ])
  });

  it('Should be able to calculate cost of the missing ingredients', () => {
    expect(pantry.calculateCost(recipe1)).to.equal(141.34);
  });

  it('Should be able to update the pantry after a meal has been cooked', () => {
    pantry.cookMeal(recipe1)
    expect(pantry.pantry).to.deep.equal([
      { ingredient: 11477, amount: 1 },
      { ingredient: 93820, amount: 1 },
      { ingredient: 11297, amount: 3 },
      { ingredient: 11547, amount: 5 },
      { ingredient: 1082047, amount: 5 },
      { ingredient: 1032050, amount: 1 },
      { ingredient: 11215, amount: 2 },
      { ingredient: 10514037, amount: 2 },
      { ingredient: 2047, amount: 1.5 },
      { ingredient: 12179, amount: 1 },
      { ingredient: 1123, amount: 3 },
      { ingredient: 11282, amount: 5 },
      { ingredient: 1123, amount: 3 },
      { ingredient: 19335, amount: 1.5 },
      { ingredient: 1145, amount: 1.5 },
      { ingredient: 18372, amount: 2.5 },
      { ingredient: 2047, amount: 0.5 }
    ]);
  });
  


  // it('Should inform User if they lack required ingredients for a given recipe', () => {
  //   expect(pantry.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  // });
});