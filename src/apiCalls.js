const fetchData = (url) => {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `status ${response.status} at endpoint ${response.url}`
        );
      }
      return response;
    })
    .then((response) => response.json());
};

const apiCalls = {
  getUserData: () => {
    return fetchData('http://localhost:3001/api/v1/users');
  },
  getIngredientsData: () => {
    return fetchData('http://localhost:3001/api/v1/ingredients');
  },
  getRecipeData: () => {
    return fetchData('http://localhost:3001/api/v1/recipes');
  },
};

function fetchAll() {
  return Promise.all([
    apiCalls.getUserData(),
    apiCalls.getIngredientsData(),
    apiCalls.getRecipeData(),
  ])
    .then((data) => {
      return {
        usersData: data[0],
        ingredientsData: data[1],
        recipeData: data[2],
      };
    })
    .catch((err) => console.error(err));
}

export { apiCalls, fetchData, fetchAll };
