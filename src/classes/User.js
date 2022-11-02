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
        const notInPantry = recipe.ingredients.filter((recipeIngredient) => {
            return !pantryIDs.includes(recipeIngredient.id)
        })
        if(!notInPantry) {
            return this.checkIngredientAmounts(recipe)
        } else {
            this.determineMissingIngredients(recipe);
            return false
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
            this.determineMissingIngredients(recipe);
        }
        return isEnough
    }

    determineMissingIngredients(recipe) {
        const neededIngredients = recipe.ingredients.reduce((acc, recipeIngredient) => {
            const foundPantryIngredient = this.pantry.find((pantryIngredient) => {
                return pantryIngredient.ingredient === recipeIngredient.id
            })
            if(foundPantryIngredient) {
                console.log(foundPantryIngredient)
                if(foundPantryIngredient.amount <= recipeIngredient.amount) {
                    acc.push({name: `${recipeIngredient.name}`, needed: `${foundPantryIngredient.amount - recipeIngredient.amount}`)
                }
            } else if(!foundPantryIngredient) {
                acc.push(`${recipeIngredient.amount} ${recipeIngredient.name} `)
            }
        return acc;
        }, [])
        return neededIngredients
    }

 }


export default User