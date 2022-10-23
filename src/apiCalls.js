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
    return fetchData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users');
  },
  getIngredientsData: () => {
    return fetchData(
      'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients'
    );
  },
  getRecipeData: () => {
    return fetchData(
      'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes'
    );
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
          usersData: data[0].usersData,
          ingredientsData: data[1].ingredientsData,
          recipeData: data[2].recipeData,
        };
      })
      .catch((err) => console.error(err));
  }

export { apiCalls, fetchData, fetchAll };
