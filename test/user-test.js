import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'
import sampleUserData from '../src/data/test-data/dummy-user-data.js'
let user1, userInfo;

describe('User', () => {
  userInfo = sampleUserData

  beforeEach(() => {
    user1 = new User(userInfo);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });
  it('Should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });
  it('Should be able to validate data types', () => {
    let recipeInfo = recipeData[0].id;
    expect(user1.validateDataType(recipeInfo, 'number')).to.equal(recipeInfo);
    expect(user1.validateDataType(recipeInfo, 'string')).to.equal('Invalid value given');
  });
  it('Should be able to assign a default value of the correct type if none is given', () => {
    expect(user1.giveDefaultValue('string')).to.equal('Invalid value given');
  });
  it('Should have a property of favoriteRecipes with a default value', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });
  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToFavorites('favoriteRecipes', recipeData[0]);
    user1.addToFavorites('favoriteRecipes', recipeData[1]);
    expect(user1.favoriteRecipes.includes(recipeData[0])).to.equal(true);
  });
  it('Should not add recipes to favoriteRecipes if it is undefined', () => {
    user1.addToFavorites('favoriteRecipes', undefined);
    expect(user1.favoriteRecipes.length).to.equal(0);
  });
  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.addToFavorites('favoriteRecipes', recipeData[0]);
    user1.addToFavorites('favoriteRecipes', recipeData[1]);
    user1.removeFromFavorites('favoriteRecipes', recipeData[1]);
    expect(user1.favoriteRecipes).to.eql([recipeData[0]]);
  });
  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites('favoriteRecipes', recipeData[0]);
    user1.addToFavorites('favoriteRecipes', recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });
  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToFavorites('favoriteRecipes', recipeData[0]);
    user1.addToFavorites('favoriteRecipes', recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });
  it('Should be able to calculate if you have the ingredients to cook', () => {
    user1.addToFavorites('favoriteRecipes', recipeData[0]);
    user1.addToFavorites('favoriteRecipes', recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });
  it('Should have a property of recipesToCook with a default value', () => {
    expect(user1.recipesToCook).to.eql([]);
  });
  it('Should be able to add recipes to recipesToCook', () => {
    user1.addToFavorites('recipesToCook', recipeData[0]);
    user1.addToFavorites('recipesToCook', recipeData[1]);
    expect(user1.recipesToCook.includes(recipeData[0])).to.equal(true);
  });
  it('Should not add recipes to recipesToCook if it is undefined', () => {
    user1.addToFavorites('recipesToCook', undefined);
    expect(user1.recipesToCook.length).to.equal(0);
  });
  it('Should be able to remove recipes from recipesToCook', () => {
    user1.addToFavorites('recipesToCook', recipeData[0]);
    user1.addToFavorites('recipesToCook', recipeData[1]);
    user1.removeFromFavorites('recipesToCook', recipeData[0]);
    expect(user1.recipesToCook).to.eql([recipeData[1]]);
  });
  it('Should be able to filter through recipesToCook by tag', () => {
    user1.addToFavorites('recipesToCook', recipeData[0]);
    user1.addToFavorites('recipesToCook', recipeData[1]);
    expect(user1.filterRecipesToCook('antipasti')).to.eql([recipeData[0]]);
  });
});
