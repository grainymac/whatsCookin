import { expect } from 'chai';
import Recipe from '../src/classes/Recipe'
import User from '../src/classes/User.js';
import usersData from '..src/data/users.js';
import recipeData from '../src/data/recipes.js';


describe('User', () => {
    let user, recipe1, recipe2, recipe3, usersData, recipeData;

    beforeEach(() => {
        usersSampleData = usersData;
        recipeSampleData = recipeData;
        user = new User(usersSampleData[0]);
        recipe1 = new Recipe(recipeSampleData[0]);
        recipe2 = new Recipe(recipeSampleData[1]);
        recipe3 = new Recipe(recipeSampleData[2]);
      });

      it.only('should create a new instance of User', () => {
        expect(user).to.be.an.instanceOf(User);
      });

      it.only('should have a name', () => {
        expect(user.name).to.equal('Saige O\'Kon');
      });

      it.only('should have an id attached to user', () => {
        expect(user.id).to.equal(1);
      });

      it.skip('should have an instance of Pantry', () => {
        expect(user.pantry).to.be.an.instanceOf(Pantry);
      });

      // it.skip('', () => {})   ---- should test if pantry has amounts and ingredients in it???

      it.skip('should start with no favourite recipes', () => {
        expect(user.favoriteRecipes).to.deep.equal([]);
      });

      it.skip('should be able to add a favourite recipe', () => {
        user.addFavoriteRecipe(recipe1);
        expect(user.favoriteRecipes).to.deep.equal([recipe1]);
      });

      
      it.skip('should start with no favourite recipes to cook', () => {
        expect(user.recipesToCook).to.deep.equal([]);
      });
      
      it.skip('should add a recipe user wants to cook', () => {
        user.recipesToCook(recipe1);
        expect(user.recipesToCook).to.deep.equal([recipe1]);
      });
      
      it.skip('should be able to filter by tag', () => {
  
      });
  
      it.skip('should be able to search for recipe by name', () => {
  
      });
      
    });
    