async function setupThePage(API_PARAMETER, foodSearched, recipeNum, currentPage) {
    if (foodSearched.length === 0)
        noResultsFoundPage(foodSearched)
    else {
        let recipes = await getRecipes(API_PARAMETER, foodSearched.toLowerCase())

        document.title = "Search results for \"" + foodSearched + "\" | Foodconnoisseur"
        displayMeals(foodSearched, recipes, currentPage)
        setupPageTabs(currentPage, Math.ceil(recipes.length / 12))
        linkPagerItems(foodSearched, currentPage, Math.ceil(recipes.length / 12))
    }
}


// API_PARAMETER == ("type" || "cuisine")
async function getRecipes(API_PARAMETER, foodSearched) {
    let url = ""

    if (API_PARAMETER === null)
        url = "/recipes?foodCategory=" + foodSearched
    else
        url = "/recipes?" + API_PARAMETER + "=" + foodSearched

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
        recipes = data
    })

    return recipes
}


function displayMeals(foodSearched, recipes, currentPage) {
    const lowerBound = (currentPage === 1) ? 1 : (12 * currentPage) - 11
    const upperBound = (lowerBound + (12 - 1) <= recipes.length) ? lowerBound + (12 - 1) : recipes.length

    document.getElementById("searchResultsTag").innerHTML = "Showing " + lowerBound + " - " + upperBound + " of " + recipes.length.toString().bold() + " results for " + foodSearched.bold()

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

    if (document.getElementById(id) !== null) {
        document.getElementById(id).addEventListener("click", function() {
            window.location = "/html/searchResults.html?foodSearched=" + foodSearched + ",currentPage=" + pageNumber
        })
    }
}


function infoPage(recipeInfo) {
    window.location = "/html/infoPage.html?id=" + recipeInfo["id"] + ",foodName=" + recipeInfo["title"]
}

function noResultsFoundPage(foodSearched) {
    window.location = "/html/searchResults_notFound.html?foodSearched=" + foodSearched
}



$(function() {
    // It replaces every occurrence of "%20" with " "
    let parameters = window.location.search.replace(/\%20/g, "")
    parameters = parameters.split(",")

    let foodSearched = parameters[0].substring(parameters[0].indexOf("=") + 1).split("+").join(" ").trim()
    const currentPage = (parameters.length > 1) ? parseInt(parameters[1].substring(parameters[1].indexOf("=") + 1)) : 1

    const mealTypes = ["main courses", "side dishes", "desserts", "appetizers", "soups", "sauces", "snacks", "beverages"]
    const cuisines = ["african", "chinese", "indian", "japanese", "korean", "thai", "vietnamese",
                        "american", "caribbean", "latin american", "mexican",
                        "british", "eastern european", "french", "german", "greek", "irish", "italian", "nordic", "spanish",
                        "mediterranean", "middle eastern"]

    foodSearched = decodeURIComponent(foodSearched)

    const recipeNum = 12
    let API_PARAMETER = undefined

    if (mealTypes.includes(foodSearched)) API_PARAMETER = "type"
    else if (cuisines.includes(foodSearched)) API_PARAMETER = "cuisine"
    else API_PARAMETER = null

    setupThePage(API_PARAMETER, foodSearched, recipeNum, currentPage)
})
