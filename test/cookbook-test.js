import {expect} from 'chai';


import recipeData from '../src/data/recipes';
import ingredientData from '../src/data/ingredients';
import Cookbook from '../src/cookbook';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData, ingredientData);
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('Should be an instance of Cookbook', () => {
    expect(cookbook).to.be.an.instanceof(Cookbook)
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  it('Should be able to filter through its array by ingredients', () => {
    expect(cookbook.findRecipe('yolk').length).to.equal(2);
  });

  it('Should be able to filter through its array by name', () => {
    expect(cookbook.findRecipe('Sesame Cookies').length).to.equal(1);
  });
});
