import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipes) {
    this.allRecipes = recipes || [];
  }

  static fromRecipeData(recipeData, ingredientsData) {
    const recipes = recipeData.map((currentRecipe) => {
      return new Recipe(currentRecipe, ingredientsData)
    })
    return new RecipeRepository(recipes)
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

  findRecipeById(recipeID) {
    return this.allRecipes.find((recipe) => {
      return recipe.id === recipeID
    })
  }
}





export default RecipeRepository;
