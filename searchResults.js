function getRecipes(foodSearched) {
    if (sessionStorage.getItem(foodSearched) !== null)
        return

    $.ajaxSetup({
        async: false
    })

    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        //console.log(data)
        const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
        const pagesNeeded = Math.ceil(totalResults / 12)
        let recipes = Object()

        let currentPage = 1
        let pageRecipes = []

        if (totalResults == 0) {
            console.log("No search results found")
            noResultsFoundPage(foodSearched)
        }
        else {
            console.log("totalResults = " + totalResults)
            console.log("pagesNeeded = " + pagesNeeded)

            for (let i = 0; i < data.results.length; i++) {
                // i can probably drop image now (the 3rd entry in the array below) since i don't use it anywhere in this program for the time being
                // I'm making an arr

                const recipeInfo = [data.results[i].id, [data.results[i].title], "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"]
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
            sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
        }
    })

    $.ajaxSetup({
        async: true
    })
}



function setupPageTabs(currentPage, pagesNeeded) {
    if (currentPage > 1) {
        let pagerItem = createElement("a", "id", "firstPagerItem", false)
        let text = createText("&laquo;") // "&laquo;" == "<<"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        pagerItem = createElement("a", "id", "prevPagerItem", false)
        text = createText("&lsaquo;") // "&lsaquo;" == "<"
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
        let text = createText("&rsaquo;") // "&rsaquo;" == ">"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        pagerItem = createElement("a", "id", "lastPagerItem", false)
        text = createText("&raquo;") // "&raquo;" == ">>"
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
            block.style.backgroundColor = "white"
        })
    }

    return block
}

function createText(htmlEntityName) {
    const text = document.createTextNode(he.decode(htmlEntityName))
    return text
}


function showRecipes(foodSearched, recipes, totalResults, currentPage) {
    const lowerBound = (currentPage === 1) ? 1 : (12 * currentPage) - 11;
    const upperBound = (totalResults <= 12) ? totalResults : (lowerBound + recipes[currentPage].length - 1);
    document.getElementById("searchResultsTag").innerHTML = "Showing " + lowerBound + " - " + upperBound + " of " + totalResults.toString().bold() + " results for " + foodSearched.bold()

    for (let i = 0; i < recipes[currentPage].length; i++) {
        const foodImg = createElement("img", "class", "foodImg", false)
        foodImg.src = recipes[currentPage][i][2]
        const foodImgContainer = createElement("div", "class", "foodImgContainer", false)
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement("p", "class", "foodName", false)
        foodName.innerHTML = recipes[currentPage][i][1]
        const foodNameContainer = createElement("div", "class", "foodNameContainer", false)
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement("div", "class", "gridBox", false)
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("myGridContainer").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(foodSearched, recipes[currentPage][i])
        })

        // When mouse if over block, show title
    }
}


function infoPage(foodSearched, recipeInfo) {
    window.location = "infoPage.html?foodSearched=" + foodSearched + ",id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",img=" + recipeInfo[2];
}

function noResultsFoundPage(foodSearched) {
    window.location = "searchResults_notFound.html?foodSearched=" + foodSearched
}


function linkPagerItems(foodSearched, recipes, currentPage, pagesNeeded) {
    foodSearched = foodSearched.split(" ").join("+")

    link(foodSearched, "firstPagerItem", 1)
    link(foodSearched, "prevPagerItem", currentPage - 1)
    link(foodSearched, "nextPagerItem", currentPage + 1)
    link(foodSearched, "lastPagerItem", pagesNeeded)

    for (let i = 1; i <= pagesNeeded; i++) {
        if (i === currentPage) continue
        link(foodSearched, i.toString(), i)
    }
}


function link(foodSearched, id, pageNumber) {
    if (document.getElementById(id) !== null) {
        document.getElementById(id).addEventListener("click", function() {
            window.location = "searchResults.html?foodSearched=" + foodSearched + ",currentPage=" + pageNumber
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

let foodSearched = parameters[0].substring(parameters[0].indexOf("=") + 1).split("+").join(" ")
const currentPage = (parameters.length > 1) ? parseInt(parameters[1].substring(parameters[1].indexOf("=") + 1)) : 1


getRecipes(foodSearched)
const allRecipesFound = JSON.parse(sessionStorage.getItem(foodSearched))
console.log(allRecipesFound)
console.log("pagesNeeded = " + allRecipesFound["pagesNeeded"])

setupPageTabs(currentPage, allRecipesFound["pagesNeeded"])
showRecipes(foodSearched, allRecipesFound, allRecipesFound["totalResults"], currentPage)
linkPagerItems(foodSearched, allRecipesFound, currentPage, allRecipesFound["pagesNeeded"])

//console.log(searchParams)
console.log(currentPage)
console.log(typeof currentPage)
