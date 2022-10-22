let fetchData = (url) => {
    return fetch(url)
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error(`status ${response.status} at endpoint ${response.url}`)
        }
        return response;
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}


const apiCalls = {
    getUserData: () => {
        return fetchData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    },
    getIngredientsData: () => {
        return fetchData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
    },
    getRecipeData: () => {
        return fetchData('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
    }
}

export { apiCalls, fetchData }









