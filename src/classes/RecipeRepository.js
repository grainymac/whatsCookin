import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.recipesData = allRecipesData;
    this.allRecipes = this.makeRecipeInstances(allRecipesData);
  }

  makeRecipeInstances() {
    console.log(this.recipesData)//this.recipesData is an object so a map isn't going to work
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

  retrieveAllTags() {
    const allTags = this.allRecipes.flatMap((recipe) => {
      return recipe.tags
    })
    return Array.from(new Set(allTags))
  }
}





export default RecipeRepository;
