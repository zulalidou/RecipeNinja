// Retrieves the recipe's info, and has them displayed on the page.
async function setupThePage(recipeID, recipeTitle) {
    const recipeInfo = await getRecipeInfo(recipeID, recipeTitle)

    document.title = recipeInfo.title + " | Foodconnoisseur"
    displayRecipe(recipeInfo)
    displayIngredients(recipeInfo.ingredients)
    displayInstructions(recipeInfo.instructions)
    displayNutritions(recipeInfo.nutrition)
    displaySimilarRecipes(recipeInfo.similarRecipes)
}


// Retrieves the recipes needed. It performs a request to the "recipeInfo" route on the server, the server
// checks to see if the recipes are stored within the DB. If yes, it simply returns the recipes. If no,
// a call is made to the API (on the server) to retrieve the necessary recipe info, stores the recipe info
// in the DB, and returns the recipe info to the browser.
async function getRecipeInfo(recipeID, recipeTitle) {
    let recipeInfo = Object()

    await fetch("/recipeInfo?id=" + recipeID + ",title=" + recipeTitle, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        recipeInfo = data
    })

    return recipeInfo
}


function createElement_P(className, rowNumber) {
    let pBlock = document.createElement("p")
    pBlock.setAttribute("class", className)

    if(className === "nutrient") {
        pBlock.style.display = "inline-block"
        pBlock.style.whiteSpace = "pre"
    }

    else if (className === "ingredient" || className === "instruction" || className === "ingredientsNeeded" || className === "equipmentsNeeded") {
        pBlock.style.padding = "5px"
    }

    return pBlock
}


// selector == "id" or "class"
function createElement_DIV(selector, selectorName) {
    let divBlock = document.createElement("div")

    // if (selectorName === "spaceBlock")
    //     divBlock.style.height = "20px"
    // else
    divBlock.setAttribute(selector, selectorName)

    return divBlock
}


function createElement_H3() {
    let h3Block = document.createElement("h3")
    return h3Block
}


function createElement_IMG(source) {
    let imgBlock = document.createElement("img")
    imgBlock.setAttribute("class", "foodImg")
    imgBlock.src = source

    return imgBlock
}


// Display the recipe's info
function displayRecipe(recipeInfo) {
    document.getElementById("recipeTitle").innerHTML = recipeInfo["title"].bold()
    document.getElementById("recipeTitle").style.textAlign = "center"
    document.getElementById("currentFood-img").src = recipeInfo["image"]

    addFoodFact("Dish Type(s): ", recipeInfo["dishTypes"])
    addFoodFact("Cuisine(s): ", recipeInfo["cuisines"])
    addFoodFact("Diet(s): ", recipeInfo["diets"])
    addFoodFact("Servings: ", recipeInfo["servings"])
    document.getElementById("factsContainer").appendChild(createElement_DIV("class", "smallSpaceBlock"))
    addFoodCredits(recipeInfo["credits"])
}


// "facts" will either be an array containing some facts about the recipe (such as cuisines it falls under, etc),
// or, it'll be a single number (representing the amount of servings of the recipe)
function addFoodFact(text, facts) {
    let block = createElement_P("foodFact", null)

    if (typeof facts === "number")
        text += facts
    else { // typeof facts === object (which is to say "facts" is an array)
        if (facts.length === 0)
            text += "N / A"
        else {
            for (let i = 0; i < facts.length; i++) {
                text += facts[i]

                if (i !== facts.length - 1)
                    text += ", "
            }
        }
    }

    let textNode = document.createTextNode(text)
    block.appendChild(textNode)
    document.getElementById("factsContainer").appendChild(block)
}


function addFoodCredits(credits) {
    for (let i = 0; i < credits.length; i++) {
        let block = createElement_P("foodFact", null)
        block.innerHTML = credits[i]
        document.getElementById("factsContainer").appendChild(block)
    }
}


function displayIngredients(ingredientsArray) {
    for (let i = 0; i < ingredientsArray.length; i++) {
        const ingredientBlock = createElement_P("ingredient", i)
        const ingredientText = document.createTextNode(ingredientsArray[i])
        ingredientBlock.appendChild(ingredientText)
        document.getElementById("ingredientsSection").appendChild(ingredientBlock)
    }
}


function displayInstructions(instructionsArray) {
    for (let i = 0; i < instructionsArray.length; i++) {
        const spaceBlock = createElement_DIV("class", "smallSpaceBlock")

        const stepNumberBlock = createElement_H3()
        const stepNumberText = document.createTextNode(("Step " + (i+1)))
        stepNumberBlock.appendChild(stepNumberText)

        const instructionBlock = createElement_P("instruction", null)
        const instructionText = document.createTextNode(instructionsArray[i][0])
        instructionBlock.appendChild(instructionText)


        const ingredientsBlock = createElement_P("ingredientsNeeded", null)
        let text = "Ingredient(s) Needed: "

        if (instructionsArray[i][1].length == 0)
            text += "NONE"
        else {
            for (let j = 0; j < instructionsArray[i][1].length; j++) {
                text += instructionsArray[i][1][j] + ", "

                if (j == instructionsArray[i][1].length - 1)
                    text = text.substr(0, text.length - 2)
            }
        }

        const ingredientsText = document.createTextNode(text)
        ingredientsBlock.appendChild(ingredientsText)



        const equipmentsBlock = createElement_P("equipmentsNeeded", null)
        text = "Equipment(s) Needed: "

        if (instructionsArray[i][2].length == 0)
            text += "NONE"
        else {
            for (let j = 0; j < instructionsArray[i][2].length; j++) {
                text += instructionsArray[i][2][j] + ", "

                if (j == instructionsArray[i][2].length - 1)
                    text = text.substr(0, text.length - 2)
            }
        }

        const equipmentsText = document.createTextNode(text)
        equipmentsBlock.appendChild(equipmentsText)

        document.getElementById("instructionsSection").appendChild(spaceBlock)
        document.getElementById("instructionsSection").appendChild(stepNumberBlock)
        document.getElementById("instructionsSection").appendChild(instructionBlock)
        document.getElementById("instructionsSection").appendChild(ingredientsBlock)
        document.getElementById("instructionsSection").appendChild(equipmentsBlock)
    }
}


function displayNutritions(nutritionArray) {
    for (let i = 0; i < nutritionArray.length; i++) {
        const nutritionBlock = createElement_P("nutrient", i)
        const nutritionText = document.createTextNode(nutritionArray[i])
        nutritionBlock.appendChild(nutritionText)
        document.getElementById("nutritionSection").appendChild(nutritionBlock)
    }
}


function displaySimilarRecipes(recipesToDisplay) {
    document.getElementById("similarRecipesHeader").innerHTML = "Other Recipes You May Like"

    for (let i = 0; i < recipesToDisplay.length; i++) {
        const foodImg = createElement_IMG(recipesToDisplay[i]["image"])
        const foodImgContainer = createElement_DIV("class", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)

        const foodName = createElement_P("foodName", null)
        foodName.innerHTML = recipesToDisplay[i]["title"]
        const foodNameContainer = createElement_DIV("class", "foodNameContainer")
        foodNameContainer.appendChild(foodName)

        const gridBox = createElement_DIV("class", "gridBox")
        gridBox.appendChild(foodImgContainer)
        gridBox.appendChild(foodNameContainer)

        document.getElementById("recipes").appendChild(gridBox)

        gridBox.addEventListener("click", function() {
            infoPage(recipesToDisplay[i])
        })
        // When mouse if over block, show title
    }
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html?id=" + recipeInfo["id"] + ",recipeTitle=" + recipeInfo["title"]
}


$(function() {
    // It replaces every occurrence of "%20" with " "
    let windowParameters = window.location.search.replace(/\%20/g, " ")

    windowParameters = windowParameters.split(",")

    const recipeID = parseInt(windowParameters[0].substring(windowParameters[0].indexOf("=") + 1))
    const recipeTitle = windowParameters[1].substring(windowParameters[1].indexOf("=") + 1)

    setupThePage(recipeID, recipeTitle)
})
