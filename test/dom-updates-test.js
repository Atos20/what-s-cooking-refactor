const spies = require('chai-spies')
import { expect } from 'chai';

import sampleUserData from './sampleUserData.js'
import User from '../src/user.js';
import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';
