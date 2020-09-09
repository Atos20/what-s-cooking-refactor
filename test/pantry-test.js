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
  it.only('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    pantry.giveFeedbackOnIngredients(recipe1)
    expect(pantry.checkPantryForIngredient(recipe1)).to.eql('You have the ingredients!');
  });

  it.skip('Should be able to check if user does not have ingredients in pantry', () => {
    expect(pantry.checkPantryForIngredient(recipeIngredients1)).to.eql([
      {
        'all purpose flour': 'sorry! it seems you are missing 1.5 c of all purpose flour ',
        'baking soda': 'You will have 2.5 tsp of baking soda left',
        'egg': 'You will have 7 large of egg left',
        'granulated sugar': 'You will have 1.5 c of granulated sugar left',
        'instant vanilla pudding mix': 'You will have 0 Tbsp of instant vanilla pudding mix left',
        'light brown sugar': 'sorry! it seems you are missing 0.5 c of light brown sugar ',
        'salt': 'You will have 2.5 tsp of salt left',
        'sea salt': 'sorry! it seems you are missing 24 servings of sea salt ',
        'semisweet chocolate chips': 'sorry! it seems you are missing 2 c of semisweet chocolate chips ',
        'unsalted butter': 'You will have 1.5 c of unsalted butter left',
        'vanilla extract': 'sorry! it seems you are missing 0.5 tsp of vanilla extract '
      }
    ]);
  });

  it('Should be able to determine what ingredients a user is missing from their pantry ', () => {
    expect(pantry.calculateIngredientsNeeded(recipe1)).to.eql([
      { id: 20081, amount: 1.5 },
      { id: 19334, amount: 0.5 },
      { id: 1012047, amount: 24 },
      { id: 10019903, amount: 2 },
      { id: 2050, amount: 0.5 }
    ])
  });

  it.only('Should be able to update the user\'s pantry with the ingredients needed to cook a given recipe', () => {
    expect(pantry.saveItemsToPantry(recipe1)).to.eql();
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
});