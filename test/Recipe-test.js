import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import { recipeSampleData } from "../src/data/recipeSampleData";


describe('Recipe', () => {
  let recipe;
  let recipeData;


  beforeEach(() => {
    recipeData = recipeSampleData[0];
    recipe = new Recipe(recipeSampleData);
  });

  it('should store an instructions array', () => {
    expect(recipe.instructions).to.deep.equal(recipeSampleData[0].instructions);
  });

  it('should store recipe name', () => {
    expect(recipe.name).to.equal(recipeSampleData[0].name);
  });

  it('should store tags array', () => {
    expect(recipe.tags).to.deep.equal([recipeSampleData[0].tags]);
  });

  it('should store the complete ingredient data for all recipe ingredients', () => {
    expect(recipe.ingredients).to.deep.equal([recipeSampleData[0].ingredients]);
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
