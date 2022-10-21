import Recipe from './Recipe';
import RecipeRepository from './RecipeRepository';


class User {
    constructor(userData) {
        this.id = userData.id
        this.name = userData.name
        this.favoriteRecipeRepo = new RecipeRepository()
    }

    addFavoriteRecipe = (recipe) => {
        if (!this.favoriteRecipes.includes(recipe)) {
            this.favoriteRecipes.push(recipe)
        }
    }

    removeFavoriteRecipe = (recipe) => {
        if (this.favoriteRecipes.includes(recipe)) {
            this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1)
        }
    }

    filterFavoriteRecipesByTag(tag) {
        return this.favoriteRecipeRepo.filterByTag(tag)
    }
    
    searchFavoriteRecipesByName(userSearch) {
        return this.favoriteRecipeRepo.searchByName(userSearch)
    }
}
export default User