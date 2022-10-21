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
        } else if (this.favoriteRecipes.includes(recipe)) {
            this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1)
        }
    }

    addRecipesToCook = (recipe) => {
        if (!this.recipesToCook.includes(recipe)) {
            this.recipesToCook.push(recipe)
        } else if (this.recipesToCook.includes(recipe)) {
            this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1)
        }
    }

    filterByTag(tag) {
        return this.recipes.filter((recipe) => {
            return recipe.tags.includes(tag);
        });
    }
    
    searchByName(userSearch) {
        return this.recipes.filter((recipe) => {
            return recipe.name.toLowerCase().includes(userSearch.toLowerCase())
        })
    }
}
export default User