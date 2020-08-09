function getRandomFoods(recipeNum) {
    $.ajaxSetup({
        async: false
    });

    const url = "https://api.spoonacular.com/recipes/random?number=" + recipeNum.toString() + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        console.log(data)
        for (let i = 0; i < data.recipes.length; i++)
            recipes[i] = [data.recipes[i].id, data.recipes[i].title, (data.recipes[i].image === undefined) ? "images/plate.png" : data.recipes[i].image]
    })

    $.ajaxSetup({
        async: true
    });

    return recipes
}

function getMainCourseMeals(recipeNum) {
    $.ajaxSetup({
        async: false
    });

    const url = "https://api.spoonacular.com/recipes/complexSearch?type=main course&number=" + recipeNum.toString() + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        console.log(data)
        for (let i = 0; i < data.results.length; i++)
            recipes[i] = [data.results[i].id, data.results[i].title, (data.results[i].image === undefined) ? "images/plate.png" : data.results[i].image]
    })

    $.ajaxSetup({
        async: true
    });

    return recipes
}

function getSideDishes(recipeNum) {
    $.ajaxSetup({
        async: false
    });

    const url = "https://api.spoonacular.com/recipes/complexSearch?type=sidedishes&number=" + recipeNum.toString() + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        console.log(data)
        for (let i = 0; i < data.results.length; i++)
            recipes[i] = [data.results[i].id, data.results[i].title, (data.results[i].image === undefined) ? "images/plate.png" : data.results[i].image]
    })

    $.ajaxSetup({
        async: true
    });

    return recipes
}

function getDesserts(recipeNum) {
    $.ajaxSetup({
        async: false
    });

    const url = "https://api.spoonacular.com/recipes/complexSearch?type=dessert&number=" + recipeNum.toString() + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        console.log(data)
        for (let i = 0; i < data.results.length; i++)
            recipes[i] = [data.results[i].id, data.results[i].title, (data.results[i].image === undefined) ? "images/plate.png" : data.results[i].image]
    })

    $.ajaxSetup({
        async: true
    });

    return recipes
}

function getBeverages(recipeNum) {
    $.ajaxSetup({
        async: false
    });

    const url = "https://api.spoonacular.com/recipes/complexSearch?type=beverages&number=" + recipeNum.toString() + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object() //dictionary

    $.getJSON(url, function(data) {
        console.log(data)
        for (let i = 0; i < data.results.length; i++)
            recipes[i] = [data.results[i].id, data.results[i].title, (data.results[i].image === undefined) ? "images/plate.png" : data.results[i].image]
    })

    $.ajaxSetup({
        async: true
    });

    return recipes
}


function displayRandomRecipes(recipes, recipeNum) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i][2]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i][1]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("myGridContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i]);
        });
    }
}



function displayMainCourseMeals(recipes, recipeNum) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i][2]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i][1]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("maincoursesContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i]);
        });
    }
}


function displaySideDishes(recipes, recipeNum) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i][2]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i][1]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("sidedishesContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i]);
        });
    }
}


function displayDesserts(recipes, recipeNum) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i][2]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i][1]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("dessertsContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i]);
        });
    }
}

function displayBeverages(recipes, recipeNum) {
    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i][2]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i][1]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("beveragesContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i]);
        });
    }
}



















function createElement(tagName, className) {
    const block = document.createElement(tagName)
    block.setAttribute("class", className)
    return block
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html?foodSearched=" + recipeInfo[1] + ",id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",img=" + recipeInfo[2]
}

const recipeNum = 12

const randomRecipes = getRandomFoods(recipeNum)
const maincourseMeals = getMainCourseMeals(recipeNum)
const sidedishes = getSideDishes(recipeNum)
const desserts = getDesserts(recipeNum)
const beverages = getBeverages(recipeNum)

displayRandomRecipes(randomRecipes, recipeNum)
displayMainCourseMeals(maincourseMeals, recipeNum)
displaySideDishes(sidedishes, recipeNum)
displayDesserts(desserts, recipeNum)
displayBeverages(beverages, recipeNum)


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
