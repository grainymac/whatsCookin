import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import { recipeSampleData } from "../src/data/recipeSampleData";
import { ingredientSampleData } from "../src/data/ingredientSampleData";



describe('RecipeRepository', () => {
  let recipeRepo, recipe;

  beforeEach(() => {
    recipeRepo = RecipeRepository.fromRecipeData(recipeSampleData, ingredientSampleData);
    recipe = new Recipe(recipeSampleData[0], ingredientSampleData);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(recipeRepo).to.be.an.instanceOf(RecipeRepository);
  });

  it('Should have a static method that uses recipes data to create an instance of Recipe Repoistory with a list of recipes.', () => {
    expect(recipeRepo.allRecipes[0]).to.be.an.instanceOf(Recipe);
  });

  it('Should have a method that filters by tag and stores the filtered recipes in a property', () => {
    expect(recipeRepo.filterByTag('salad')).to.deep.equal([
      recipeRepo.allRecipes[1],
    ]);
  });

  it('Should have a method that searches by name and stores the filtered recipes in a property', () => {
    recipeRepo.searchByName("Avocado Chickpea Salad");
    expect(recipeRepo.searchByName("Avocado Chickpea Salad")).to.deep.equal([
      recipeRepo.allRecipes[1],
    ]);
  });

  it('should not return incorrect recipes if user search does not match recipe names', () => {
    const search = recipeRepo.searchByName("Stew");
    expect(search).to.deep.equal([]);
  })

  it('Should have a method that returns the tags for all the recipes', () => {
    expect(recipeRepo.retrieveAllTags()).to.deep.equal([
      'antipasti',
      'starter',
      'snack',
      'appetizer',
      'antipasto',
      "hor d'oeuvre",
      'salad',
      'side dish'
    ]);
  });

  it('Should have a method that adds a recipe to the recipe list', () => {
    recipeRepo.addRecipe(recipe);
    expect(recipeRepo.allRecipes[0]).to.deep.equal(recipe);
  });

  it('Should have a method that adds removes a recipe from the recipe list', () => {
    recipeRepo.addRecipe(recipe);
    recipeRepo.removeRecipe(recipeRepo.allRecipes[1]);

    expect(recipeRepo.allRecipes[0]).to.deep.equal(recipe);
  });

  it('Should find a recipe given its ID', () => {
    expect(recipeRepo.findRecipeById(595736)).to.deep.equal(recipe)
  })
});
