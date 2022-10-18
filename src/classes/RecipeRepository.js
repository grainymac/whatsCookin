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
    let lowerCaseSearch = userSearch.toLowerCase();
    this.displayedRecipes = this.allRecipes.filter((recipe) => {
     return recipe.searchableName.includes(lowerCaseSearch);
    })
  }

}

export default RecipeRepository;
