class User {
    constructor(userData) {
        this.id = userData.id
        this.name = userData.name
        this.favoriteRecipes = []
        this.recipesToCook = []
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
}
export default User