function getRandomFoods() {
    if (sessionStorage.getItem("randomFoods") !== null)
        return JSON.parse(sessionStorage.getItem("randomFoods"))

    $.ajaxSetup({
        async: false
    })

    const url = "https://api.spoonacular.com/recipes/random?number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        const totalResults = 100
        const pagesNeeded = 9
        let currentPage = 1
        let pageRecipes = []

        for (let i = 0; i < 100; i++) {
            const recipeInfo = [data.recipes[i].id, data.recipes[i].title, (data.recipes[i].image === undefined) ? "images/plate.png" : data.recipes[i].image]
            pageRecipes.push(recipeInfo)

            if ((i+1) % 12 == 0) {
                recipes[currentPage] = pageRecipes
                currentPage++
                pageRecipes = []
            }
        }

        if (pageRecipes.length > 0)
            recipes[currentPage] = pageRecipes

        recipes["totalResults"] = totalResults
        recipes["pagesNeeded"] = pagesNeeded
        sessionStorage.setItem("randomFoods", JSON.stringify(recipes))
    })

    $.ajaxSetup({
        async: true
    })

    return recipes
}


function getMeal(mealType) {
    if (sessionStorage.getItem(mealType) !== null)
        return JSON.parse(sessionStorage.getItem(mealType))

    $.ajaxSetup({
        async: false
    })

    const url = "https://api.spoonacular.com/recipes/complexSearch?type=" + mealType + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
        const pagesNeeded = Math.ceil(totalResults / 12)
        let currentPage = 1
        let pageRecipes = []

        if (totalResults != 0) {
            for (let i = 0; i < data.results.length; i++) {
                const recipeInfo = [data.results[i].id, data.results[i].title, "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"]
                pageRecipes.push(recipeInfo)

                if ((i+1) % 12 == 0) {
                    recipes[currentPage] = pageRecipes
                    currentPage++
                    pageRecipes = []
                }
            }

            if (pageRecipes.length > 0)
                recipes[currentPage] = pageRecipes

            recipes["totalResults"] = totalResults
            recipes["pagesNeeded"] = pagesNeeded
            sessionStorage.setItem(mealType, JSON.stringify(recipes))
        }
    })

    $.ajaxSetup({
        async: true
    })

    return recipes
}


function displayMeals(recipes, recipeNum, container) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[1][i][2]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[1][i][1]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById(container).appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[1][i]);
        })
    }
}



function createElement(tagName, className) {
    const block = document.createElement(tagName)
    block.setAttribute("class", className)
    return block
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html?id=" + recipeInfo[0]
}




const recipeNum = 12

const randomRecipes = getRandomFoods(recipeNum)
const maincourseMeals = getMeal("main course")
const sidedishes = getMeal("side dish")
const desserts = getMeal("dessert")
const beverages = getMeal("beverage")

displayMeals(randomRecipes, recipeNum, "myGridContainer")
displayMeals(maincourseMeals, recipeNum, "maincoursesContainer")
displayMeals(sidedishes, recipeNum, "sidedishesContainer")
displayMeals(desserts, recipeNum, "dessertsContainer")
displayMeals(beverages, recipeNum, "beveragesContainer")


/*
$(document).ready(function() {
    console.log("this is a test")
    fetch('https://www.googleapis.com/youtube/v3/activities?key=AIzaSyAYx8S1WBcGNYgSN6RwY41NZNC-h_dKXlU&part=snippet&channelId=UC-lHJZR3Gqxm24_Vd_AJ5Yw')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch( (err) => {
        console.log(err)
    })
})
*/
