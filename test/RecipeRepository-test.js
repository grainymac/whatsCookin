import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

describe('RecipeRepository', () => {
  let recipeData, newRecipeRepo, recipe;

  beforeEach(() => {
    recipeData = [
      {
        id: 595736,
        image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 1.5,
              unit: 'c',
            },
          },
          {
            id: 18372,
            quantity: {
              amount: 0.5,
              unit: 'tsp',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
            number: 1,
          },
          {
            instruction: 'Add egg and vanilla and mix until combined.',
            number: 2,
          },
        ],
        name: 'Loaded Chocolate Chip Pudding Cookie Cups',
        tags: [
          'antipasti',
          'starter',
          'snack',
          'appetizer',
          'antipasto',
          "hor d'oeuvre",
        ],
      },
      {
        id: 678353,
        image: 'https://spoonacular.com/recipeImages/678353-556x370.jpg',
        ingredients: [
          {
            id: 1009016,
            quantity: {
              amount: 1.5,
              unit: 'cups',
            },
          },

          {
            id: 16112,
            quantity: {
              amount: 1,
              unit: 'tablespoon',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!',
            number: 1,
          },
        ],
        name: 'Maple Dijon Apple Cider Grilled Pork Chops',
        tags: ['lunch', 'main course', 'main dish', 'dinner'],
      },
      {
        id: 412309,
        image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
        ingredients: [
          {
            id: 1002030,
            quantity: {
              amount: 4,
              unit: 'teaspoons',
            },
          },
          {
            id: 19334,
            quantity: {
              amount: 8,
              unit: 'tablespoons',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
            number: 1,
          },
        ],
        name: "Dirty Steve's Original Wing Sauce",
        tags: ['sauce'],
      },
    ];

    newRecipeRepo = RecipeRepository.fromRecipeData(recipeData);

    recipe = new Recipe({
      id: 231951,
      image: 'https://spoonacular.com/recipeImages/231951-556x370.jpg',
      ingredients: [
        {
          id: 20027,
          quantity: {
            amount: 2,
            unit: 'tablespoons',
          },
        },
        {
          id: 10019334,
          quantity: {
            amount: 0.5,
            unit: 'cup',
          },
        },
      ],
      instructions: [
        {
          instruction:
            'Whisk together brown sugar, cornstarch, and 1/4 teaspoon salt in a heavy medium saucepan, then whisk in milk and cream. Bring to a boil over medium heat, whisking frequently, then boil, whisking, 1 minute.',
          number: 1,
        },
      ],
      name: 'Butterscotch Pudding',
      tags: ['side dish'],
    });
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(newRecipeRepo).to.be.an.instanceOf(RecipeRepository);
  });

  it('Should have a static method that uses recipes data to create an instance of Recipe Repoistory with a list of recipes.', () => {
    expect(newRecipeRepo.allRecipes[0]).to.be.an.instanceOf(Recipe);
  });

  it('Should have a method that filters by tag and stores the filtered recipes in a property', () => {
    expect(newRecipeRepo.filterByTag('sauce')).to.deep.equal([
      newRecipeRepo.allRecipes[2],
    ]);
  });

  it('Should have a method that searches by name and stores the filtered recipes in a property', () => {
    newRecipeRepo.searchByName("Dirty Steve's");
    expect(newRecipeRepo.searchByName("Dirty Steve's")).to.deep.equal([
      newRecipeRepo.allRecipes[2],
    ]);
  });

  it('Should have a method that returns the tags for all the recipes', () => {
    expect(newRecipeRepo.retrieveAllTags()).to.deep.equal([
      'antipasti',
      'starter',
      'snack',
      'appetizer',
      'antipasto',
      "hor d'oeuvre",
      'lunch',
      'main course',
      'main dish',
      'dinner',
      'sauce',
    ]);
  });

  it('Should have a method that adds a recipe to the recipe list', () => {
    newRecipeRepo.addRecipe(recipe);
    expect(newRecipeRepo.allRecipes[3]).to.deep.equal(recipe);
  });

  it('Should have a method that adds removes a recipe from the recipe list', () => {
    newRecipeRepo.addRecipe(recipe);
    newRecipeRepo.removeRecipe(newRecipeRepo.allRecipes[0]);

    expect(newRecipeRepo.allRecipes[2]).to.deep.equal(recipe);
  });
});
