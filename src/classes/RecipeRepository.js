import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.allRecipes = this.makeRecipeInstances(allRecipesData);
    this.userSelectedTag = '';
  }

  makeRecipeInstances(recipeList) {
    return recipeList.map((currentRecipe) => {
      return new Recipe(currentRecipe)
    })
  }
}

export default RecipeRepository;
