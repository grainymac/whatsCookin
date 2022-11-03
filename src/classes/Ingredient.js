class Ingredient {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.cost = data.cost
    this.amount = data?.amount
    this.unit = data?.unit
  }

  static fromIngredientData(id, ingredientsData, recipeData = null) {
    const fromIngredients = ingredientsData.find(ingredient => id === ingredient.id)
    let fromRecipe;
    
    let allIngredientData = {}

    allIngredientData.id = id
    allIngredientData.name = fromIngredients.name
    allIngredientData.cost = fromIngredients.estimatedCostInCents
    if (recipeData) {
      fromRecipe = recipeData.ingredients.find(ingredient => id === ingredient.id)

      allIngredientData.amount = fromRecipe.quantity.amount
      allIngredientData.unit = fromRecipe.quantity.unit
    }

    return new Ingredient(allIngredientData)
  }
}

export default Ingredient