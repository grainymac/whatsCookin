import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.allRecipes = allRecipesData;
    this.newAllRecipes = this.makeRecipeInstances(allRecipesData);
  }

  makeRecipeInstances() {
    return this.allRecipes.map((currentRecipe) => {
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
