const chai = require("chai");
const expect = chai.expect;

import User from "../src/classes/User.js";
import { usersSampleData } from "../src/data/usersSampleData.js";
import Recipe from "../src/classes/Recipe";
import { recipeSampleData } from "../src/data/recipeSampleData";
import RecipeRepository from "../src/classes/RecipeRepository";

describe("User", () => {
  let user, recipe1, recipe2;

  beforeEach(() => {
    user = new User(usersSampleData);
    recipe1 = new Recipe(recipeSampleData[0]);
    recipe2 = new Recipe(recipeSampleData[1]);
  });

  it("should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("should an instance of User", () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it("should have a name", () => {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it("should have an id attached to user", () => {
    expect(user.id).to.equal(1);
  });

  it("should have a favorite recipe repo that is an instance of Recipe Repoistory", () => {
    expect(user.favoriteRecipeRepo).to.be.an.instanceOf(RecipeRepository);
  });

  it("should start with no favourite recipes to cook", () => {
    expect(user.favoriteRecipeRepo.allRecipes).to.deep.equal([]);
  });

  it("should be able to add a favourite recipe", () => {
    user.addFavoriteRecipe(recipe1);
    expect(user.favoriteRecipeRepo.allRecipes).to.deep.equal([recipe1]);
  });

  it("should be able to remove a favourite recipe", () => {
    user.addFavoriteRecipe(recipe1);
    user.addFavoriteRecipe(recipe2);
    user.removeFavoriteRecipe(recipe1);
    expect(user.favoriteRecipeRepo.allRecipes).to.deep.equal([recipe2]);
  });

  it("Should have a method that filters by tag and stores the filtered recipes in a property", () => {
    user.addFavoriteRecipe(recipe1);
    user.addFavoriteRecipe(recipe2);
    expect(user.filterFavoriteRecipesByTag("side dish")).to.deep.equal([
      user.favoriteRecipeRepo.allRecipes[0],
    ]);
  });

  it("Should have a method that searches by name and stores the filtered recipes in a property", () => {
    user.addFavoriteRecipe(recipe1);
    user.addFavoriteRecipe(recipe2);
    expect(
      user.searchFavoriteRecipesByName("Avocado Chickpea Salad")
    ).to.deep.equal([user.favoriteRecipeRepo.allRecipes[1]]);
  });
});
