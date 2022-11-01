const chai = require('chai');
const expect = chai.expect;

import User from '../src/classes/User.js';
import { usersSampleData } from '../src/data/usersSampleData.js';
import Recipe from '../src/classes/Recipe';
import { recipeSampleData } from '../src/data/recipeSampleData';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('User', () => {
  let user, recipe, anotherRecipe;

  beforeEach(() => {
    user = new User(usersSampleData);

    recipe = new Recipe()

  anotherRecipe = new Recipe(
    {
      id: 999044,
      image: 'https://spoonacular.com/recipeImages/999044-556x370.jpg',
      ingredients: [
        {
          id: 9037,
          quantity: {
            amount: 1,
            unit: '',
          },
        },
        {
          id: 16057,
          quantity: {
            amount: 1.5,
            unit: 'cups',
          },
        },
        {
          id: 11297,
          quantity: {
            amount: 2,
            unit: 'tablespoons',
          },
        },
      ],
      instructions: [
        {
          instruction:
            'Working in a couple of batches, roughly chop the chickpeas and place in a bowl.',
          number: 1,
        },
        {
          instruction:
            'Add the minced herbs and scallions to the chickpeas and give a quick toss.',
          number: 2,
        },
      ],
      name: 'Avocado Chickpea Salad',
      tags: ['salad'],
    },
    [
      {
        id: 9037,
        name: 'haas avocados',
        estimatedCostInCents: 275,
      },
      {
        id: 16057,
        name: 'garbanzos',
        estimatedCostInCents: 85,
      },
      {
        id: 11297,
        name: 'flat leaf parsley leaves',
        estimatedCostInCents: 1030,
      },
    ]
  );

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have a name', () => {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it('should have an id attached to user', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a favorite recipe repo that is an instance of Recipe Repoistory', () => {
    expect(user.favoriteRecipeRepo).to.be.an.instanceOf(RecipeRepository);
  });

  it('should start with no favourite recipes to cook', () => {
    expect(user.favoriteRecipeRepo.allRecipes).to.deep.equal([]);
  });

  it('should be able to add a favourite recipe', () => {
    user.addFavoriteRecipe(recipe);
    expect(user.favoriteRecipeRepo.allRecipes).to.deep.equal([recipe]);
  });

  it('should be able to remove a favourite recipe', () => {
    user.addFavoriteRecipe(recipe);
    user.addFavoriteRecipe(anotherRecipe);
    user.removeFavoriteRecipe(recipe);
    expect(user.favoriteRecipeRepo.allRecipes).to.deep.equal([anotherRecipe]);
  });

  it('Should have a method that filters by tag and stores the filtered recipes in a property', () => {
    user.addFavoriteRecipe(recipe);
    user.addFavoriteRecipe(anotherRecipe);
    expect(user.filterFavoriteRecipesByTag('side dish')).to.deep.equal([
      user.favoriteRecipeRepo.allRecipes[0],
    ]);
  });

  it('Should have a method that searches by name and stores the filtered recipes in a property', () => {
    user.addFavoriteRecipe(recipe);
    user.addFavoriteRecipe(anotherRecipe);
    expect(
      user.searchFavoriteRecipesByName('Avocado Chickpea Salad')
    ).to.deep.equal([user.favoriteRecipeRepo.allRecipes[1]]);
  });
});
