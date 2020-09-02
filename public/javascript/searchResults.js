function getFoods(mealType, foodSearched, recipeNum, currentPage) {
    if (foodSearched.length === 0)
        return

    const collectionName = foodSearched.toLowerCase()
    console.log(collectionName)

    $.ajax({
        type: "GET",
        url: "/recipes",
        data: {
            collectionName: collectionName
        },
        success: function(result) {
            if (result.length === 0) {
                console.log("0 recipes returned")
                getFoodsFromAPI(collectionName, mealType, foodSearched, recipeNum)
            }
            else {
                console.log(result)
                displayMeals(foodSearched, result, result.length, currentPage)
                setupPageTabs(currentPage, Math.ceil(result.length / 12))
                linkPagerItems(foodSearched, currentPage, Math.ceil(result.length / 12))
            }
        },
        error: function(e) {
            console.log("ERROR: ", e)
        }
    })
}


function getFoodsFromAPI(collectionName, mealType, foodSearched, recipeNum) {
    let url = ""

    if (mealType !== null) url = "https://api.spoonacular.com/recipes/complexSearch?" + mealType + "=" + foodSearched + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
    else url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    let recipes = []

    $.getJSON(url, function(data) {
        console.log(data)
        const totalResults = data.results.length

        for (let i = 0; i < totalResults; i++) {
            let recipeInfo = []
            console.log(i)

            if (mealType !== null)
                recipeInfo = {"id": data.results[i].id, "title": data.results[i].title, "image": (data.results[i].image === undefined) ? "/images/plate.png" : data.results[i].image}
            else
                recipeInfo = {"id": data.results[i].id, "title": data.results[i].title, "image": "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"}

            recipes.push(recipeInfo)
        }
    }).done(function() {
        if (recipes.length === 0)
            noResultsFoundPage(foodSearched)
        else {
            storeInDB(collectionName, recipes)
            setupPageTabs(1, Math.ceil(recipes.length / 12))
            displayMeals(foodSearched, recipes, recipes.length, 1)
            linkPagerItems(foodSearched, currentPage, Math.ceil(recipes.length / 12))
        }
    })
}


function storeInDB(mealType, recipes) {
    console.log(recipes)
    console.log(mealType)

    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/recipes",
        data: JSON.stringify({collectionName: mealType, recipes: recipes}),//JSON.stringify(recipes),
        success: function(result) {
            console.log("SUCCESS: ", result)
        },
        error : function(e) {
            console.log("ERROR: ", e)
        }
    })
}




//     const url = "https://api.spoonacular.com/recipes/complexSearch?" + parameterName + "=" + foodSearched + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
//
//     $.getJSON(url, function(data) {
//         const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
//         const pagesNeeded = Math.ceil(totalResults / 12)
//         let recipes = Object()
//
//         let currentPage = 1
//         let pageRecipes = []
//
//         if (totalResults == 0) {
//             console.log("No search results found")
//             noResultsFoundPage(foodSearched)
//         }
//         else {
//             console.log("totalResults = " + totalResults)
//             console.log("pagesNeeded = " + pagesNeeded)
//
//             for (let i = 0; i < data.results.length; i++) {
//                 // i can probably drop image now (the 3rd entry in the array below) since i don't use it anywhere in this program for the time being
//                 // I'm making an arr
//
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
//             sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
//         }
//     })
// }


//
// function getRecipes(foodSearched) {
//     if (sessionStorage.getItem(foodSearched) !== null)
//         return
//
//     $.ajaxSetup({
//         async: false
//     })
//
//     const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
//
//     $.getJSON(url, function(data) {
//         //console.log(data)
//         const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
//         const pagesNeeded = Math.ceil(totalResults / 12)
//         let recipes = Object()
//
//         let currentPage = 1
//         let pageRecipes = []
//
//         if (totalResults == 0) {
//             console.log("No search results found")
//             noResultsFoundPage(foodSearched)
//         }
//         else {
//             console.log("totalResults = " + totalResults)
//             console.log("pagesNeeded = " + pagesNeeded)
//
//             for (let i = 0; i < data.results.length; i++) {
//                 // i can probably drop image now (the 3rd entry in the array below) since i don't use it anywhere in this program for the time being
//                 // I'm making an arr
//
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
//             sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
//         }
//     })
//
//     $.ajaxSetup({
//         async: true
//     })
// }



function setupPageTabs(currentPage, pagesNeeded) {
    if (currentPage > 1) {
        let pagerItem = createElement("a", "id", "firstPagerItem", false)
        let text = createText("<<") // "&laquo;" == "<<"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        pagerItem = createElement("a", "id", "prevPagerItem", false)
        text = createText("<") // "&lsaquo;" == "<"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)
    }

    for (let i = 1; i <= pagesNeeded; i++) {
        const pagerItem = createElement("a", "id", i.toString(), (i === currentPage))
        const text = createText(i.toString())
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)
    }

    if (currentPage < pagesNeeded) {
        let pagerItem = createElement("a", "id", "nextPagerItem", false)
        let text = createText(">") // "&rsaquo;" == ">"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        pagerItem = createElement("a", "id", "lastPagerItem", false)
        text = createText(">>") // "&raquo;" == ">>"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)
    }
}



// selector == "id" or "class"
function createElement(tagName, selector, selectorName, active) {
    const block = document.createElement(tagName)
    block.setAttribute(selector, selectorName)

    if (selector === "class")
        return block

    block.style.padding = "10px 16px"
    block.style.cursor = "pointer"

    if (active) {
        //console.log("so long, farewell. auf wiedersehen, adieu!")
        block.style.color = "white"
        block.style.backgroundColor = "dodgerblue"
    }
    else {
        $(block).hover(function() {
            // when you're hovering over this pager item
            block.style.color = "white"
            block.style.backgroundColor = "dodgerblue"
          }, function() {
            // when you're NOT hovering over this pager item
            block.style.color = "black"
            block.style.backgroundColor = "#EBE5E5"
        })
    }

    return block
}

function createText(htmlEntityName) {
    const text = document.createTextNode(htmlEntityName)
    return text
}


function displayMeals(foodSearched, recipes, totalResults, currentPage) {
    const lowerBound = (currentPage === 1) ? 1 : (12 * currentPage) - 11;
    const upperBound = (lowerBound + (12 - 1) <= recipes.length) ? lowerBound + (12 - 1) : recipes.length;

    document.getElementById("searchResultsTag").innerHTML = "Showing " + lowerBound + " - " + upperBound + " of " + totalResults.toString().bold() + " results for " + foodSearched.bold()

    for (let i = lowerBound - 1; i < upperBound; i++) {
        const foodImg = createElement("img", "class", "foodImg", false)
        foodImg.src = recipes[i]["image"]
        const foodImgContainer = createElement("div", "class", "foodImgContainer", false)
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "class", "foodName", false)
        foodName.innerHTML = recipes[i]["title"]
        const foodNameContainer = createElement("div", "class", "foodNameContainer", false)
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "class", "gridBox", false)
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("myGridContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipes[i])
        })

        //When mouse if over block, show title
    }
}


function infoPage(recipeInfo) {
    window.location = "/html/infoPage.html?id=" + recipeInfo["id"] + ",foodName=" + recipeInfo["title"]
}

function noResultsFoundPage(foodSearched) {
    window.location = "/html/searchResults_notFound.html?foodSearched=" + foodSearched
}


function linkPagerItems(foodSearched, currentPage, pagesNeeded) {
    link(foodSearched, "firstPagerItem", 1)
    link(foodSearched, "prevPagerItem", currentPage - 1)
    link(foodSearched, "nextPagerItem", currentPage + 1)
    link(foodSearched, "lastPagerItem", pagesNeeded)

    if (currentPage === 1) document.getElementById("prevPageBtn").disabled = true
    else link(foodSearched, "prevPageBtn", currentPage - 1)

    if (currentPage === pagesNeeded) document.getElementById("nextPageBtn").disabled = true
    else link(foodSearched, "nextPageBtn", currentPage + 1)


    for (let i = 1; i <= pagesNeeded; i++) {
        if (i === currentPage) continue
        link(foodSearched, i.toString(), i)
    }
}


function link(foodSearched, id, pageNumber) {
    foodSearched =  foodSearched.split(" ").join("+")
    console.log(foodSearched)

    if (document.getElementById(id) !== null) {
        document.getElementById(id).addEventListener("click", function() {
            window.location = "/html/searchResults.html?foodSearched=" + foodSearched + ",currentPage=" + pageNumber
        })
    }
}



/*
const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})
*/






let parameters = window.location.search.replace(/\%20/g, "") //It takes everything in the query string up to the 1st '=', and replaces them with ''
parameters = parameters.split(",")
console.log(parameters)


let foodSearched = parameters[0].substring(parameters[0].indexOf("=") + 1).split("+").join(" ").trim()
const currentPage = (parameters.length > 1) ? parseInt(parameters[1].substring(parameters[1].indexOf("=") + 1)) : 1

const mealTypes = ["main courses", "side dishes", "desserts", "appetizers", "soups", "sauces", "snacks", "beverages"]
const cuisines = ["african", "chinese", "indian", "japanese", "korean", "thai", "vietnamese",
                    "american", "caribbean", "latin american", "mexican",
                    "british", "eastern european", "french", "german", "greek", "irish", "italian", "nordic", "spanish",
                    "mediterranean", "middle eastern"]

console.log(parameters)
console.log(foodSearched)
console.log(foodSearched.length)
console.log(currentPage)

const recipeNum = 12

if (mealTypes.includes(foodSearched))
    getFoods("type", foodSearched, recipeNum, currentPage)
else if (cuisines.includes(foodSearched))
    getFoods("cuisine", foodSearched, recipeNum, currentPage)
else
    getFoods(null, foodSearched, recipeNum, currentPage)

// const allRecipesFound = JSON.parse(sessionStorage.getItem(foodSearched))

// setupPageTabs(currentPage, allRecipesFound["pagesNeeded"])
// showRecipes(foodSearched, allRecipesFound, allRecipesFound["totalResults"], currentPage)


// linkPagerItems(foodSearched, currentPage, allRecipesFound["pagesNeeded"])




setupSearchMenu("magnifyingglassIcon", "magnifyingglassMenu")

setupNavBarEvents("hamburgerIcon-container", "hamburgerIcon", "hamburgerMenu")
setupNavBarEvents("hamburgerMenu-subcategory1-item1", "hamburgerMenu-subcategory1-item1-arrow", "mealTypes-submenu")
setupNavBarEvents("hamburgerMenu-subcategory1-item2", "hamburgerMenu-subcategory1-item2-arrow", "cuisines-submenu")
setupNavBarEvents("hamburgerMenu-subcategory2-item1", "americanFoods-down-arrow", "americanFoods-submenu")
setupNavBarEvents("hamburgerMenu-subcategory2-item2", "europeanFoods-down-arrow", "europeanFoods-submenu")




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
