import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.allRecipes = this.makeRecipeInstances(allRecipesData);
    this.userSelectedTag = '';
    // One class to get you started!
  }

  makeRecipeInstances(recipeList) {
    return recipeList.map((currentRecipe) => {
      const id = currentRecipe.id;
      const image = currentRecipe.image;
      const recipeIngredients = currentRecipe.recipeIngredients
      const instructions = currentRecipe.instructions;
      const name = currentRecipe.name;
      const tags = currentRecipe.tags;
      return new Recipe(
        id,
        image,
        recipeIngredients,
        instructions,
        name,
        tags
      )
    })
  }
}

export default RecipeRepository;
