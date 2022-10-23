import Recipe from './Recipe';
import RecipeRepository from './RecipeRepository';


class User {
    constructor(userData = {}) {
        this.id = userData.id
        this.name = userData.name
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
}
export default User