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


    setupNavBarEvents("hamburgerIcon", "hamburgerMenu")
    setupNavBarEvents("mealTypes-down-arrow", "mealTypes-submenu")
    setupNavBarEvents("cuisines-down-arrow", "cuisines-submenu")
    setupNavBarEvents("americanFoods-down-arrow", "americanFoods-submenu")
    setupNavBarEvents("europeanFoods-down-arrow", "europeanFoods-submenu")
})


function setupNavBarEvents(buttonName, containerName) {
    const toggleButton = document.getElementById(buttonName)
    const container = document.getElementById(containerName)

    console.log(toggleButton)
    console.log(container)

    toggleButton.addEventListener("click", () => {
        $("#"+containerName).toggle("slide")

        // const image = toggleButton.src.substr(toggleButton.src.indexOf("-") + 1)
        // console.log(image)

        // if (image === "down-arrow")
        //     toggleButton.src = "/images/up-arrow.png"
        // else
        //     toggleButton.src = "/images/down-arrow.png"

        // var w = window.innerWidth
        // console.log(w)
        //
        // if (w >= 901) {
        //   containerName = containerName.substr(1)
        //   document.getElementById(containerName).style.display = "none"
        // }


        // if (container.style.display === "none" || container.style.display === "") {
        //     container.style.display = "block"
        //
        //     if (buttonName === "hamburgerIcon")
        //         toggleButton.src = "/images/close.png"
        //     else
        //         toggleButton.src = "/images/up-arrow.png"
        //
        //     console.log(buttonName)
        // }
        // else {
        //     container.style.display = "none"
        //
        //     if (buttonName === "hamburgerIcon")
        //         toggleButton.src = "/images/hamburger.png"
        //     else
        //         toggleButton.src = "/images/down-arrow.png"
        //
        //     console.log(buttonName)
        // }
    })
}


async function displayOnMainPage(foodCategory, recipeNum, container) {
    const foods = await getFoods(foodCategory, recipeNum, container)
    displayMeals(foods, recipeNum, container)
}
