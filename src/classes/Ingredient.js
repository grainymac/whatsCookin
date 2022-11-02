class Ingredient {
  constructor(id, name, cost, amount, unit) {
    this.id = id
    this.name = name
    this.estimatedCostInCents = cost
    this.amount = amount
    this.unit = unit
  }

  static fromIngredientData(id, ingredientsData, recipeData) {
    const fromIngredients = ingredientsData.find(ingredient => id === ingredient.id)
    const fromRecipe = recipeData.ingredients.find(ingredient => id === ingredient.id)
    
    let allIngredientData = {}

    allIngredientData.id = id
    allIngredientData.name = fromIngredients.name
    allIngredientData.cost = fromIngredients.estimatedCostInCents
    if (recipeData) {
      allIngredientData.amount = fromRecipe.quantity.amount
      allIngredientData.unit = fromRecipe.quantity.unit
    }

    return new Ingredient(id, name, cost, amount, unit)
  }
}

export default Ingredient
