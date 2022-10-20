const chai = require('chai');
const expect = chai.expect;

import User from '../src/classes/User.js'

describe('User', () => {
    let user, recipe

    beforeEach(() => {
      user = new User({
        "name": "Saige O'Kon",
        "id": 1
      })
      recipe = {
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [
          {
            "id": 20081,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          },
          {
            "id": 18372,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "id": 1123,
            "quantity": {
              "amount": 1,
              "unit": "large"
            }
          },
          {
            "id": 19335,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 19206,
            "quantity": {
              "amount": 3,
              "unit": "Tbsp"
            }
          },
          {
            "id": 19334,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 2047,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "id": 1012047,
            "quantity": {
              "amount": 24,
              "unit": "servings"
            }
          },
          {
            "id": 10019903,
            "quantity": {
              "amount": 2,
              "unit": "c"
            }
          },
          {
            "id": 1145,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 2050,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          }
        ],
        "instructions": [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          },
          {
            "instruction": "Add egg and vanilla and mix until combined.",
            "number": 2
          },
          {
            "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
            "number": 3
          },
          {
            "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
            "number": 4
          },
          {
            "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
            "number": 5
          },
          {
            "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
            "number": 6
          }
        ],
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "tags": [
          "antipasti",
          "starter",
          "snack",
          "appetizer",
          "antipasto",
          "hor d'oeuvre"
        ]
      }
      });

      it('should create a new instance of User', () => {
        expect(user).to.be.an.instanceOf(User);
      });

      it('should have a name', () => {
        expect(user.name).to.equal('Saige O\'Kon');
      });

      it('should have an id attached to user', () => {
        expect(user.id).to.equal(1);
      });

      // it.skip('should have an instance of Pantry', () => {
      //   expect(user.pantry).to.be.an.instanceOf(Pantry);
      // });

      // it.skip('', () => {})   ---- should test if pantry has amounts and ingredients in it???

      it('should start with no favourite recipes', () => {
        expect(user.favoriteRecipes).to.deep.equal([]);
      });

      it('should be able to add a favourite recipe', () => {
        user.addFavoriteRecipe(recipe);
        expect(user.favoriteRecipes).to.deep.equal([recipe]);
      });

      
      it('should start with no favourite recipes to cook', () => {
        expect(user.recipesToCook).to.deep.equal([]);
      });
      
      it('should add a recipe user wants to cook', () => {
        user.addRecipesToCook(recipe);
        expect(user.recipesToCook).to.deep.equal([recipe]);
      });
  
      it.skip('should be able to search for recipe by name', () => {
      });
    });
    