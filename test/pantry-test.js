const spies = require('chai-spies');
import { expect } from 'chai';
import User from '../src/user.js';
import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import Cookbook from '../src/cookbook.js'
import RecipeSample from '../src/data/test-data/dummy-recipe.js';
import ingredientsSample from '../src/data/test-data/dummy-ingredients.js';
import sampleUserData from '../src/data/test-data/dummy-user-data.js'

let user1, recipe1, pantry, recipeIngredients1, cookbook;

describe('Pantry', () => {
  beforeEach(() => {
    recipe1 = new Recipe(RecipeSample[0], ingredientsSample);
    user1 = new User(sampleUserData[0]);
    pantry = new Pantry(user1);
    cookbook = new Cookbook(RecipeSample[0], ingredientsSample)
  });
  it('Should be a function', () => {
   expect(Pantry).to.be.a('function');
  });

  it('Should be a instance of Pantry', () => {
   expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('Should be able to keep track of the user\'s pantry', () => {

    expect(pantry).to.have.property('pantry').with.lengthOf(20)
    expect(pantry.pantry).to.deep.eql(user1.pantry)
  });
  
  it('Should consolidate duplicate ingredients', () => {
    let consolidatedPantry = (pantry.consolidateUsersPantry())
    expect(consolidatedPantry[1123]).to.equal(8)
  }); 

  it('Should be able to check and list ingredients from the user/s pantry for a given recipe', () => {
    expect(pantry.checkPantryForIngredient(recipe1)).to.eql([
      { '20081': 0 },
      { '18372': 3 },
      { '1123': 8 },
      { '19335': 2 },
      { '19206': 3 },
      { '19334': 0 },
      { '2047': 3 },
      { '1012047': 0 },
      { '10019903': 0 },
      { '1145': 2 },
      { '2050': 0 },
    ]);
  });

  it('Should be able to to return a message about the current status of each ingredient for a given recipe', () => {
    expect(pantry).to.have.property('pantry').with.lengthOf(20);
    expect(pantry.pantry).to.deep.eql(user1.pantry);
    expect(pantry. giveFeedbackOnIngredients(recipe1, cookbook)).to.eql(
      {
        "1123": "You will have 7 large of eggs left",
        "1145": "You will have 1.5 c of unsalted butter left",
        "2047": "You will have 2.5 tsp of salt left",
        "2050": "sorry! it seems you are missing 0.5 tsp of vanilla ",
        "18372": "You will have 2.5 tsp of bicarbonate of soda left",
        "19206": "You will have 0 Tbsp of instant vanilla pudding left",
        "19334": "sorry! it seems you are missing 0.5 c of brown sugar ",
        "19335": "You will have 1.5 c of sucrose left",
        "20081": "sorry! it seems you are missing 1.5 c of wheat flour ",
        "1012047": "sorry! it seems you are missing 24 servings of fine sea salt ",
        "10019903": "sorry! it seems you are missing 2 c of semi sweet chips "
      }
    );
  });

  it('Should consolidate duplicate ingredients', () => {
    let consolidatedPantry = (pantry.consolidateUsersPantry());
    expect(consolidatedPantry[1123]).to.equal(8);
  });

  it('Should be able to determine what ingredients a user is missing from their pantry ', () => {
    expect(pantry.calculateIngredientsNeeded(recipe1)).to.eql([
      { ingredient: 20081, amount: 1.5 },
      { ingredient: 19334, amount: 0.5 },
      { ingredient: 1012047, amount: 24 },
      { ingredient: 10019903, amount: 2 },
      { ingredient: 2050, amount: 0.5 }
    ])
  });

  it('Should be able to update the user\'s pantry locally with the ingredients needed to cook a given recipe', () => {
    expect(pantry.itemsToPantryLocal(recipe1, 'add')).to.have.a.lengthOf(11);
    expect(pantry.itemsToPantryLocal(recipe1, 'add')[0].ingredientModification).to.eql(1.5)
  });
  
  it('Should be able to remove the user\'s pantry locally after a recipe has been cooked', () => {
    expect(pantry.itemsToPantryLocal(recipe1, 'remove')).to.have.a.lengthOf(11);
    expect(pantry.itemsToPantryLocal(recipe1, 'remove')[0].ingredientModification).to.eql(-1.5)
  });

  it('should be able to return a new object with the information needed to save items remotely', () => {
    expect(pantry.ingredientsToPantryRemote(recipe1, 'add')).to.have.a.lengthOf(11);
    expect(pantry.ingredientsToPantryRemote(recipe1, 'add')[0].ingredientModification).to.eql(1.5)
  });

  it('should be able to return to create a request of the ingredients that will be removed after the user cooks a meal', () => {
    expect(pantry.ingredientsToPantryRemote(recipe1, 'remove')).to.have.a.lengthOf(11);
    expect(pantry.ingredientsToPantryRemote(recipe1, 'remove')[0].ingredientModification).to.eql(-1.5)
  });

  it('Should be able to calculate cost of the missing ingredients', () => {
    expect(pantry.calculateCost(recipe1)).to.equal(141.34);
  });

  it('Should be able to update the pantry after a meal has been cooked', () => {
    pantry.cookMeal(recipe1);
    expect(pantry.pantry).to.deep.equal(
    [
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
