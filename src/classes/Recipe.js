import Ingredient from './Ingredient';

class Recipe {
  constructor(recipeData, ingredientsData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.recipeIngredients = recipeData.ingredients;
    console.log('line 8', this.recipeIngredients)
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
    this.ingredients = this.getAllIngredientsData(ingredientsData);
  }
  
  getAllIngredientsData(ingredientsData) {
    return this.recipeIngredients.map((ingredient) => {
      const id = ingredient.id;
      const amount = ingredient.quantity.amount;
      const unit = ingredient.quantity.unit;
      const matchedIngredient = ingredientsData.find(
        (ingredient) => ingredient.id === id
      );

      return new Ingredient(
        id,
        matchedIngredient.name,
        matchedIngredient.estimatedCostInCents,
        amount,
        unit
      );
    });
  }

  findIngredientNames() {
    return this.ingredients.map((ingredient) => ingredient.name);
  }

  totalCost() {
    const cost =
      this.ingredients.reduce((accumulator, value) => {
        return (accumulator += value.estimatedCostInCents * value.amount);
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
