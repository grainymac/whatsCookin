class Ingredient {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.cost = data.cost;
    this.amount = data.amount;
    this.unit = data.unit;
  }

  static fromIngredientData(ingredientSource, ingredientsData) {
    const fromIngredients = ingredientsData.find(
      (ingredient) => ingredient.id === ingredientSource.id
    );

    let allIngredientData = {};

    allIngredientData.id = fromIngredients.id;
    allIngredientData.name = fromIngredients.name;
    allIngredientData.cost = fromIngredients.estimatedCostInCents;
    allIngredientData.amount = getAmount(ingredientSource);
    if (ingredientSource.quantity) {
      allIngredientData.unit = ingredientSource.quantity.unit;
    }

    return new Ingredient(allIngredientData);
  }
}

function getAmount(ingredient) {
  if (typeof ingredient.amount === 'number') {
    return ingredient.amount;
  }
  return ingredient.quantity?.amount;
}

export default Ingredient;
