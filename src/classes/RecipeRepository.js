import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.allRecipes = this.makeRecipeInstances(allRecipesData);
  }

  makeRecipeInstances(recipeList) {
    return recipeList.map((currentRecipe) => {
      return new Recipe(currentRecipe)
    })
  }

  filterByTag(tag) {
    this.displayedRecipes = this.allRecipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
  }

  searchByName(userSearch) {
    this.displayedRecipes = this.allRecipes.filter((recipe) => {
     return recipe.name.includes(userSearch);
    })
  }

}

export default RecipeRepository;
