const usersURL = 'http://localhost:3001/api/v1/users';

function addAllIngredients(recipe, user) {
  const neededIngredients = user.getMissingIngredientsForRecipe(recipe);
  const requests = createPostRequests(user, neededIngredients);
  return postAll(requests, user, recipe);
}

function createPostRequests(user, ingredients) {
  const postRequests = [];
  ingredients.forEach((ingredient) => {
    const request = fetch(usersURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: user.id,
        ingredientID: ingredient.id,
        ingredientModification: ingredient.amount,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Sorry! Something went wrong!`);
        }
        return response;
      })
      .then((response) => response.json());
    postRequests.push(request);
  });
  return postRequests;
}

function postAll(requests) {
  console.log('PROMISES', requests);
  return Promise.all(requests)
    .then((data) => {
      data.forEach((response) => {
        console.log(response);
      });
    })
    .catch((err) => console.error(err));
}

export { addAllIngredients, createPostRequests, postAll };
