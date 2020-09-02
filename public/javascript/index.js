async function getFoods(mealType, recipeNum, container) {
    console.log("1: " + mealType)

    foods = []

    await fetch("/recipes?collectionName=" + mealType, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        foods = data
    })


    if (foods.length === 0) {
        foods = await getFoodsFromAPI(mealType, recipeNum, container)
        storeInDB(mealType, foods)
    }


    console.log(foods)
    console.log("2: " + mealType)

    return foods


    // await $.ajax({
    //     type: "GET",
    //     url: "/getRecipes",
    //     data: {
    //         mealType: mealType
    //     },
    //     success: function(result) {
    //         if (result.length === 0) {
    //             console.log("0 recipes returned")
    //             result = getFoodsFromAPI(mealType, recipeNum, container)
    //         }
    //         else {
    //             console.log(result)
    //             displayMeals(result, recipeNum, container)
    //         }
    //     },
    //     error: function(e) {
    //         console.log("ERROR: ", e)
    //     }
    // })
}


async function getFoodsFromAPI(mealType, recipeNum, container) {
    let url = ""

    if (container === "randomRecipesContainer") url = "https://api.spoonacular.com/recipes/random?number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
    else url = "https://api.spoonacular.com/recipes/complexSearch?type=" + mealType + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    let recipes = []

    await $.getJSON(url, function(data) {
        for (let i = 0; i < 100; i++) {
            let recipeInfo = []

            if (container === "randomRecipesContainer")
                recipeInfo = {"id": data.recipes[i].id, "title": data.recipes[i].title, "image": (data.recipes[i].image === undefined) ? "/images/plate.png" : data.recipes[i].image}
            else
                recipeInfo = {"id": data.results[i].id, "title": data.results[i].title, "image": "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"}
            recipes.push(recipeInfo)
        }

        // console.log(recipes)
    })

    return recipes
    // .done(function() {
    //     //storeInDB(mealType, recipes)
    //     // console.log(JSON.parse(recipes))
    //     //displayMeals(recipes, recipeNum, container)
    // })
}


function storeInDB(mealType, recipes) {
    // console.log(recipes)

    // $.ajax({
    //     type : "POST",
    //     contentType : "application/json",
    //     url : "/getRecipes",
    //     data: JSON.stringify({collectionName: mealType, recipes: recipes}),//JSON.stringify(recipes),
    //     success: function(result) {
    //         console.log("SUCCESS: ", result)
    //     },
    //     error : function(e) {
    //         console.log("ERROR: ", e)
    //     }
    // })

    fetch("/recipes?collectionName=" + mealType, {
        method: "POST",
        body: JSON.stringify({collectionName: mealType, recipes: recipes}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        foods = data
    })
}



// function getMeal(mealType, recipeNum, container) {
//     $.ajax({
//         type: "GET",
//         url: "/recipes",
//         data: {"mealType": mealType},
//         success: function(result) {
//             if (result.length == 0) {
//                 console.log("0 recipes returned")
//                 getFoodsFromAPI(recipeNum, container)
//             }
//             else {
//                 let asdf = Object()
//                 recipes[1] = result
//                 console.log(recipes)
//                 displayMeals(recipes, recipeNum, container)
//             }
//         },
//         error: function(e) {
//             console.log("ERROR: ", e)
//         }
//     })
//
//
//     if (sessionStorage.getItem(mealType) !== null)
//         return
//
//     const url = "https://api.spoonacular.com/recipes/complexSearch?type=" + mealType + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
//     let recipes = Object() //dictionary
//
//     $.getJSON(url, function(data) {
//         const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
//         const pagesNeeded = Math.ceil(totalResults / 12)
//         let currentPage = 1
//         let pageRecipes = []
//
//         if (totalResults != 0) {
//             for (let i = 0; i < data.results.length; i++) {
//                 const recipeInfo = [data.results[i].id, data.results[i].title, "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"]
//                 pageRecipes.push(recipeInfo)
//
//                 if ((i+1) % 12 == 0) {
//                     recipes[currentPage] = pageRecipes
//                     currentPage++
//                     pageRecipes = []
//                 }
//             }
//
//             if (pageRecipes.length > 0)
//                 recipes[currentPage] = pageRecipes
//
//             recipes["totalResults"] = totalResults
//             recipes["pagesNeeded"] = pagesNeeded
//             sessionStorage.setItem(mealType, JSON.stringify(recipes))
//         }
//     }).done(function() {
//         console.log(container)
//         displayMeals(recipes, recipeNum, container)
//     })
// }


function displayMeals(recipes, recipeNum, container) {
    console.log(recipes)

    for (let i = 0; i < recipeNum; i++) {
        const foodImg = createElement("img", "foodImg")
        foodImg.src = recipes[i]["image"]
        const foodImgContainer = createElement("div", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "foodName")
        foodName.innerHTML = recipes[i]["title"]
        const foodNameContainer = createElement("div", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById(container).appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i]);
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


    setupSearchMenu("magnifyingglassIcon", "magnifyingglassMenu")

    setupNavBarEvents("hamburgerIcon-container", "hamburgerIcon", "hamburgerMenu")
    setupNavBarEvents("hamburgerMenu-subcategory1-item1", "hamburgerMenu-subcategory1-item1-arrow", "mealTypes-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory1-item2", "hamburgerMenu-subcategory1-item2-arrow", "cuisines-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory2-item1", "americanFoods-down-arrow", "americanFoods-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory2-item2", "europeanFoods-down-arrow", "europeanFoods-submenu")
})


function setupSearchMenu(buttonName, containerName) {
    const toggleButton = document.getElementById(buttonName)
    const container = document.getElementById(containerName)

    toggleButton.addEventListener("click", () => {
        document.getElementById("hamburgerMenu").style.display = "none"
        document.getElementById("hamburgerIcon").src = "/images/hamburger.png"

        let buttonURL = toggleButton.src.substr(toggleButton.src.lastIndexOf("/") + 1)

        if (buttonURL === "magnifyingglass_big.png") toggleButton.src = "/images/close.png"
        else toggleButton.src = "/images/magnifyingglass_big.png"

        $("#"+containerName).slideToggle()
    })
}


function setupNavBarEvents(anchorTagName, imgTagName, containerName) {
    const toggleButton = document.getElementById(anchorTagName)
    const arrowImg_container = document.getElementById(imgTagName)
    const container = document.getElementById(containerName)


    toggleButton.addEventListener("click", () => {
        // closes the "magnifyingglass" menu (in case it's open when we try to open the hamburger menu)
        document.getElementById("magnifyingglassMenu").style.display = "none"
        document.getElementById("magnifyingglassIcon").src = "/images/magnifyingglass_big.png"

        let arrowURL = arrowImg_container.src.substr(arrowImg_container.src.lastIndexOf("/") + 1)

        if (arrowURL === "hamburger.png") arrowImg_container.src = "/images/close.png"
        else if (arrowURL === "close.png") arrowImg_container.src = "/images/hamburger.png"
        else if (arrowURL === "up-arrow.png") arrowImg_container.src = "/images/down-arrow.png"
        else arrowImg_container.src = "/images/up-arrow.png"

        if (containerName === "hamburgerMenu")
            $("#"+containerName).toggle("slide")
        else
            $("#"+containerName).slideToggle()
    })
}


async function displayOnMainPage(foodCategory, recipeNum, container) {
    const foods = await getFoods(foodCategory, recipeNum, container)
    displayMeals(foods, recipeNum, container)
}
