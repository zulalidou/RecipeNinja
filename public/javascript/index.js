// Retrieves the recipes needed, and displays them.
async function displayOnMainPage(foodSearched, recipeNum, container) {
    const recipes = await getRecipes(foodSearched, recipeNum, container)
    displayRecipes(recipes, recipeNum, container)
}


// Retrieves the recipes needed. It performs a request to the "recipes" route on the server, the server
// checks to see if the recipes are stored within the DB. If yes, it simply returns the recipes. If no,
// a call is made to the API (on the server) to retrieve the necessary recipes, stores the recipes in the
// DB, and returns the recipes to the browser.
async function getRecipes(foodSearched, recipeNum, container) {
    recipes = []

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
        console.log(foodSearched)
        console.log(data)
        recipes = data
    })
    .catch( (error) => {
        console.log("Error message: " + error)
    })

    return recipes
}


// Displays the recipes passed to it.
function displayRecipes(recipes, recipeNum, container) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i]["image"]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i]["title"]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const recipeBox = createElement("div", "gridBox")
        recipeBox.appendChild(foodImgContainer)
        recipeBox.appendChild(foodNameContainer)

        document.getElementById(container).appendChild(recipeBox)

        recipeBox.addEventListener("click", function() {
            infoPage(recipes[i]);
        })
    }
}


// Creates an HTML element (based on the tag passed), and adds a class name to it.
function createElement(tagName, className) {
    const block = document.createElement(tagName)
    block.setAttribute("class", className)
    return block
}


// Directs the user's window to the "infoPage" file if the user clicks on a recipe.
function infoPage(recipeInfo) {
    window.location = "/html/infoPage.html?id=" + recipeInfo["id"] + ",foodName=" + recipeInfo["title"]
}


// Displays the recipes once the (static) DOM elements have been loaded
$(function() {
    const recipeNum = 12
    displayOnMainPage("random foods", recipeNum, "randomRecipesContainer")
    displayOnMainPage("main courses", recipeNum, "mainCoursesContainer")
    displayOnMainPage("side dishes", recipeNum, "sideDishesContainer")
    displayOnMainPage("desserts", recipeNum, "dessertsContainer")
    displayOnMainPage("beverages", recipeNum, "beveragesContainer")
})
