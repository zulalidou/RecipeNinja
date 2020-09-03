async function displayOnMainPage(foodCategory, recipeNum, container) {
    const foods = await getFoods(foodCategory, recipeNum, container)
    displayMeals(foods, recipeNum, container)
}


async function getFoods(foodCategory, recipeNum, container) {
    foods = []

    await fetch("/recipes?foodCategory=" + foodCategory, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        foods = data
    })

    if (foods.length === 0) {
        foods = await getFoodsFromAPI(foodCategory, recipeNum, container)
        storeInDB(foodCategory, foods)
    }

    return foods
}


async function getFoodsFromAPI(foodCategory, recipeNum, container) {
    let url = ""
    let areRandomFoods = false

    if (container === "randomRecipesContainer") {
        url = "https://api.spoonacular.com/recipes/random?number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
        areRandomFoods = true
    }
    else
        url = "https://api.spoonacular.com/recipes/complexSearch?type=" + foodCategory + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    let recipes = []

    await fetch(url, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        let recipesFetched = []

        if (areRandomFoods) recipesFetched = data.recipes
        else recipesFetched = data.results

        for (let i = 0; i < 100; i++) {
            let recipeInfo = []

            if (container === "randomRecipesContainer")
                recipeInfo = {"id": recipesFetched[i].id, "title": recipesFetched[i].title, "image": (recipesFetched[i].image === undefined) ? "/images/plate.png" : recipesFetched[i].image}
            else
                recipeInfo = {"id": recipesFetched[i].id, "title": recipesFetched[i].title, "image": "https://spoonacular.com/recipeImages/" + recipesFetched[i].id + "-556x370.jpg"}

            recipes.push(recipeInfo)
        }
    })

    return recipes
}


function storeInDB(foodCategory, foods) {
    fetch("/recipes?foodCategory=" + foodCategory, {
        method: "POST",
        body: JSON.stringify({foodCategory: foodCategory, foods: foods}),
        headers: {
            'Content-type': 'application/json'
        }
    })
}


function displayMeals(foods, recipeNum, container) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = foods[i]["image"]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = foods[i]["title"]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const recipeBox = createElement("div", "gridBox")
        recipeBox.appendChild(foodImgContainer)
        recipeBox.appendChild(foodNameContainer)

        document.getElementById(container).appendChild(recipeBox)

        recipeBox.addEventListener("click", function() {
            infoPage(foods[i]);
        })
    }
}


function createElement(tagName, className) {
    const block = document.createElement(tagName)
    block.setAttribute("class", className)
    return block
}


function infoPage(recipeInfo) {
    window.location = "/html/infoPage.html?id=" + recipeInfo["id"] + ",foodName=" + recipeInfo["title"]
}


$(document).ready(function() {
    const recipeNum = 12
    displayOnMainPage("random foods", recipeNum, "randomRecipesContainer")
    displayOnMainPage("main courses", recipeNum, "mainCoursesContainer")
    displayOnMainPage("side dishes", recipeNum, "sideDishesContainer")
    displayOnMainPage("desserts", recipeNum, "dessertsContainer")
    displayOnMainPage("beverages", recipeNum, "beveragesContainer")
})
