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
    let dom, recipe, user, pantry, domUpdates;

    beforeEach(() => {
      domUpdates = new DomUpdates();
      user = new User(sampleUserData[0]);
      pantry = new Pantry(user);
      global.document = {};
      chai.spy.on(document, 'querySelector', () => {});
      chai.spy.on(domUpdates, ['populateCards'], () => '')
    })
    afterEach(() => {
        chai.spy.restore(domUpdates);
      })
    it('Should be a function', () => {
        expect(true).to.equal(true);
    });

    it('Should be able to populate recipe cards', () => {
        //setup => done 
        //execution
        //  expect(domUpdates.querySelector).to.have.been.called(1)
        // console.log(document.querySelector)
        expect(domUpdates.populateCards).to.have.been.called(1);
        domUpdates.populateCards(recipe, user);
        console.log(document.querySelector)
      expect(document.querySelector).to.have.been.called.with('all-cards');
    //   expect(dom.populateCards(recipe, user)).to.have.been.called.with('foo');
    })
    it('Should display the favorited cards', () => {
    // expect(document.querySelector).to.have.been.called.with('#hours-slept-this-week');
    })
})
/*

it.only('should display data for current week', function () {
    domUpdates.displayDataForWeek(user.hydrationInfo, 'today', 'numOunces', '#hydration-this-week')
    domUpdates.displayDataForWeek(user.hydrationInfo, 'today', 'hoursSlept', '#hours-slept-this-week')
    expect(document.querySelector).to.have.been.called(2);
    expect(document.querySelector).to.have.been.called.with('#hydration-this-week');
    expect(document.querySelector).to.have.been.called.with('#hours-slept-this-week');
  });

  const chai = require('chai');
    const expect = chai.expect;
    const spies = require('chai-spies');
    chai.use(spies);
    import User from '../src/User';
    import Hydration from '../src/Hydration';
    import Sleep from '../src/Sleep';
    import Activity from '../src/Activity';
    import DOMupdates from '../src/DOMupdates';
describe('DOMupdates', function() {
  let domUpdates, user;
  beforeEach(function() {
    domUpdates = new DOMupdates();
    user = new User({
      id: 1,
      name: 'Alex Roth',
      address: '1234 Turing Street, Denver CO 80301-1697',
      email: 'alex.roth1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    },
    [new Hydration({ userID: 1, date: 'today', numOunces: 2 })],
    [new Sleep({ userID: 1, date: 'today', hoursSlept: 4, sleepQuality: 1 }), new Sleep({ userID: 1, date: 'yesterday', hoursSlept: 3, sleepQuality: 3 })],
    [new Activity({ userID: 1, date: 'today', numSteps: 30, minutesActive: 40, flightsOfStairs: 2 }), new Activity({ userID: 1, date: 'today', numSteps: 26, minutesActive: 40, flightsOfStairs: 2 })]);
    global.document = {};
    chai.spy.on(document, ['querySelector'], function() {
      return {};
    });
    chai.spy.on(DOMupdates, ['displayHydrationToday'], function () {
      return {};
    });
  });
  afterEach(function() {
    chai.spy.restore();
  });
  */