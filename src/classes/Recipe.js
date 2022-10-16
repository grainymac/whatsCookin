import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
  }

  findIngredeintNames() {
    const ids = this.ingredients.map(ingredient => ingredient.id)

    const matchedIngredients = ingredientsData.filter(ingredient => ids.includes(ingredient.id))

     return matchedIngredients.map(ingredient => ingredient.name)
  }
}

export default Recipe;