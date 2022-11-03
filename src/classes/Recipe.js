import Ingredient from './Ingredient';

class Recipe {
  constructor(recipeData, ingredientsData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.recipeIngredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
    this.ingredients = this.getAllIngredientsData(recipeData, ingredientsData);
  }
  
  getAllIngredientsData(recipeData, ingredientsData) {
    return this.recipeIngredients.map((ingredient) => {
      return Ingredient.fromIngredientData(ingredient.id, ingredientsData, recipeData)
    });
  }

  findIngredientNames() {
    return this.ingredients.map((ingredient) => ingredient.name);
  }

  totalCost() {
    const cost =
      this.ingredients.reduce((accumulator, value) => {
        return (accumulator += value.cost * value.amount);
      }, 0) / 100;
    return cost.toFixed(2);
  }

  getInstructions() {
    return this.instructions.map(
      (recipeStep) => `${recipeStep.number}: ${recipeStep.instruction}`
    );
  }
}

export default Recipe;
