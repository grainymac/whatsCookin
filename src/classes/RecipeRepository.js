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

// move these over to USER class along with the tests  
//-------------------------------------------------------------  
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
//-------------------------------------------------------------  

retrieveAllTags() {
    const allTags = this.allRecipes.flatMap((recipe) => {
      return recipe.tags
    })
    return Array.from(new Set(allTags))
  }
}





export default RecipeRepository;
