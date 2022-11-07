import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import { recipeSampleData } from "../src/data/recipeSampleData";
import { ingredientSampleData } from "../src/data/ingredientSampleData";


describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(recipeSampleData[0], ingredientSampleData);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  })

  it('should be an instance of recipe', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  })

  it('should have recipe instructions', () => {
    expect(recipe.instructions).to.equal(recipeSampleData[0].instructions);
  })

  it('should have an id', () => {
    expect(recipe.id).to.equal(595736);
  })

  it('should have an image', () => {
    expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  })

  it('should store an instructions array', () => {
    expect(recipe.instructions).to.equal(recipeSampleData[0].instructions);
  });

  it('should store recipe name', () => {
    expect(recipe.name).to.equal(recipeSampleData[0].name);
  });

  it('should store tags array', () => {
    expect(recipe.tags).to.deep.equal(recipeSampleData[0].tags);
  });

  it('should store the complete ingredient data for all recipe ingredients', () => {
    expect(recipe.ingredients).to.deep.equal([
      {
        id: 20081,
        name: 'wheat flour',
        cost: 142,
        unit: 'c',
        amount: 1.5,
      },
      {
        id: 18372,
        name: 'bicarbonate of soda',
        cost: 582,
        amount: 0.5,
        unit: 'tsp',
      },
      {
        id: 1123,
        name: 'eggs',
        cost: 472,
        amount: 1,
        unit: 'large',
      },
    ]);
  });

  it('should have a method that returns ingredient names', () => {
    expect(recipe.findIngredientNames()).to.deep.equal([
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
    ]);
  });

  it('should have a method that returns the total cost of ingredients in cents', () => {
    expect(recipe.totalCost()).to.equal('9.76');
  });

  it('should return the instructions', () => {
    expect(recipe.getInstructions()).to.deep.equal([
      '1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
      '2: Add egg and vanilla and mix until combined.',
      '3: Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
    ]);
  });
});
