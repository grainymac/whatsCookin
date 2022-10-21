import Recipe from './Recipe';

class RecipeRepository {
  constructor(allRecipesData) {
    this.recipesData = allRecipesData;
    this.allRecipes = this.makeRecipeInstances();
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

  retrieveAllTags() {
    const allTags = this.allRecipes.flatMap((recipe) => {
      return recipe.tags
    })
    return Array.from(new Set(allTags))
  }

  addRecipe(recipe) {
    if (!this.allRecipes.includes(recipe)) {
      this.allRecipes.push(recipe)
    }
  }

  removeRecipe(recipe) {
    if (this.allRecipes.includes(recipe)) {
      this.allRecipes.splice(this.allRecipes.indexOf(recipe), 1)
    }
  }
}





export default RecipeRepository;
