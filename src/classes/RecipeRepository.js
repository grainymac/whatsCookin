import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.recipesData = allRecipesData;
    this.allRecipes = this.makeRecipeInstances(allRecipesData);
  }

  makeRecipeInstances() {
    return this.recipesData.map((currentRecipe) => {
      return new Recipe(currentRecipe)
    })
  }

  filterByTag(tag) {
    return this.allRecipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
  }

  searchByName(userSearch) {
    return this.allRecipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(userSearch.toLowerCase())
    })
  }
}



export default RecipeRepository;
