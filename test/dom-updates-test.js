// const chai = require('chai')
// const spies = require('chai-spies')
// chai.use(require('chai-dom'))

import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
chai.use(spies)
import DomUpdates from '../src/DomUpdates.js'
import sampleUserData from './sampleUserData.js'
import User from '../src/user.js';
import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

describe('DomUpdates', () => {
    let recipe, user, domUpdates, cardArea, favButton, event, specificRecipe;

    beforeEach(() => {
      domUpdates = new DomUpdates();
      user = new User(sampleUserData[0]);
      event = {}
      specificRecipe = {}
      cardArea = {}
      favButton = {}
      global.document = {};
      chai.spy.on(document, 'querySelector', () => {});
      chai.spy.on(domUpdates, 'populateCards', () => {})
      chai.spy.on(domUpdates, 'viewFavorites', () => {})
      chai.spy.on(domUpdates, 'displayFavorite', () => {})
      chai.spy.on(domUpdates, 'findRecipeByTag', () => {})
    })
    afterEach(() => {
        chai.spy.restore(domUpdates);
      });

    it('Should be a function', () => {
        expect(true).to.equal(true);
    });

    it('Should have a name', () => {
      expect(domUpdates.name).to.equal('Dom')
    });

    it('Should be able to populate recipe cards', () => {
      domUpdates.populateCards(recipe, user)
      expect(domUpdates.populateCards).to.have.been.called(1);
      expect(domUpdates.populateCards).to.have.been.called.with(recipe, user);
    });

    it('should be able to view favorites', () => {
      domUpdates.viewFavorites(cardArea, user, favButton);
      expect(domUpdates.viewFavorites).to.have.been.called(1);
      expect(domUpdates.viewFavorites).to.have.been.called.with(cardArea, user, favButton);
    });

    it('Should be able to display favorited recipe cards', () => {
      domUpdates.displayFavorite(specificRecipe, event, favButton);
      expect(domUpdates.displayFavorite).to.have.been.called(1);
      expect(domUpdates.displayFavorite).to.have.been.called.with(specificRecipe, event, favButton)
    });

    it('Should be able to find recipes by tag', () => {
      domUpdates.findRecipeByTag(event, user, cardArea);
      expect(domUpdates.findRecipeByTag).to.have.been.called(1);
      expect(domUpdates.findRecipeByTag).to.have.been.called.with(event, user, cardArea)
    });
})
