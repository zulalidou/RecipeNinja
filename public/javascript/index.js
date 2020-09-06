async function displayOnMainPage(foodSearched, recipeNum, container) {
    const foods = await getFoods(foodSearched, recipeNum, container)
    console.log(foods)
    displayMeals(foods, recipeNum, container)
}


async function getFoods(foodSearched, recipeNum, container) {
    foods = []
    console.log("one")

    await fetch("/recipes?foodSearched=" + foodSearched, {
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
        // console.log(foods)
    })

    console.log("two")

    return foods
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
