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
    recipeIngredients1 = recipeData[0]
    recipeIngredients2 = recipeData[1]
    recipe1 = new Recipe(recipeData[0], ingredientsData)
    recipe2 = new Recipe(recipeData[1], ingredientsData)
    user1 = new User(sampleUserData[0])
    pantry = new Pantry(user1.pantry)
  });

it.only('Should be able to check ingredients in User/s pantry for a given recipe', () => {
  // console.log(recipe1)
  // console.log(pantry)
    expect(pantry.checkPantry(recipe1)).to.eql('You have the ingredients!');
  });

it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    expect(pantry.checkPantry(recipeIngredients1)).to.eql('You do not have the ingredients!');
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    expect(pantry.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  });
});