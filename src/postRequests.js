const usersURL = 'http://localhost:3001/api/v1/users';

function createPostRequests(user, ingredients, factor) {
  const postRequests = [];
  ingredients.forEach((ingredient) => {
    const request = fetch(usersURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: user.id,
        ingredientID: ingredient.id,
        ingredientModification: ingredient.amount * factor,
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

  return Promise.all(requests)
    .then((data) => data)
    // .catch((err) => console.error('AHHHH', err));
}

export { createPostRequests, postAll };
