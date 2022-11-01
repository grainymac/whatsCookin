import Recipe from './Recipe';
import RecipeRepository from './RecipeRepository';


class User {
    constructor(userData = {}) {
        this.id = userData.id
        this.name = userData.name
        this.pantry = userData.pantry
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

    findIngredientInPantry(recipe) {
        let inPantry;
        const pantryIDs = this.pantry.map((pantryIngredient) => {
            return pantryIngredient.ingredient
        })
        recipe.ingredients.forEach((currentIngredient) => {
            if(!pantryIDs.includes(currentIngredient.id)) {
                inPantry = false;
                getNeededIngredients(currentIngredient)
            } else if(pantryIDs.includes(currentIngredient.id)) {
                inPantry = true;
                determineAbilityToCook()
            }
        }) 
        return inPantry;
    }

    determineAbilityToCook(recipeIngredient) {
        
    }
 }


export default User