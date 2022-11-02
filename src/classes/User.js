import Recipe from './Recipe';
import RecipeRepository from './RecipeRepository';


class User {
    constructor(userData = {}) {
        this.id = userData.id
        this.name = userData.name
        this.pantry = userData.pantry
        this.canCook = [];
        this.cannotCook = [];
        this.favoriteRecipeRepo = new RecipeRepository()
    }

    addFavoriteRecipe = (recipe) => {
        return this.favoriteRecipeRepo.addRecipe(recipe)
    }

    removeFavoriteRecipe = (recipe) => {
        return this.favoriteRecipeRepo.removeRecipe(recipe)
    }

    filterFavoriteRecipesByTag(tag) {
        return this.favoriteRecipeRepo.filterByTag(tag)
    }
    
    searchFavoriteRecipesByName(userSearch) {
        return this.favoriteRecipeRepo.searchByName(userSearch)
    }

    findIngredientsInPantry(recipe) {
        const pantryIDs = this.pantry.map((pantryIngredient) => {
            return pantryIngredient.ingredient
        })
        const inPantry = recipe.ingredients.every((currentIngredient) => {
            return pantryIDs.includes(currentIngredient.id)
        })
        if(!inPantry) {
            return determineMissingIngredients()
        } else if(inPantry) {
            return checkIngredientAmounts(recipe)
        }
    }

    checkIngredientAmounts(recipe) {
        const isEnough = this.pantry.every((pantryIngredient) => {
            const foundIngredient = recipe.ingredients.find((ingredient) => {
                return ingredient.id === pantryIngredient.ingredient
            })
            return foundIngredient.amount <= pantry.amount
        })
        if(!isEnough) {
            determineMissingIngredients()
        } else if(isEnough) {
            this.canCook.push(recipe)
        }
    }

 }


export default User