async function setupThePage(recipeID, recipeTitle) {
    const recipeInfo = await getRecipeInfo(recipeID, recipeTitle)
    console.log(recipeInfo)

    displayRecipe(recipeInfo)
    displayIngredients(recipeInfo.ingredients)
    displayInstructions(recipeInfo.instructions)
    displayNutritions(recipeInfo.nutrition)
    displaySimilarRecipes(recipeInfo.similarRecipes)
}


async function getRecipeInfo(recipeID, recipeTitle) {
    let recipeInfo = await getInfoFromDB(recipeID, recipeTitle)

    if ($.isEmptyObject(recipeInfo)) {
        recipeInfo = await getRecipeFromAPI(recipeID)
        const similarRecipes = await getSimilarRecipes(recipeID, recipeTitle)
        recipeInfo["similarRecipes"] = similarRecipes
        storeInDB(recipeInfo)
    }

    return recipeInfo
}


async function getInfoFromDB(recipeID, recipeTitle) {
    // GET requests do not support bodies, and parameters must be sent in the URL
    let recipeInfo = Object()

    await fetch("/recipeInfo?id=" + recipeID, {
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


async function getRecipeFromAPI(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=true&apiKey=c27618bedd4b4071b925b766be18e0a4"
    recipeInfo = Object()

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
        recipeInfo["id"] = data.id
        recipeInfo["title"] = data.title
        recipeInfo["image"] = data.image
        recipeInfo["nutrition"] = getNutrients(data.nutrition.nutrients)
        recipeInfo["ingredients"] = getIngredients(data.extendedIngredients)
        recipeInfo["cuisines"] = data.cuisines
        recipeInfo["diets"] = data.diets
        recipeInfo["dishTypes"] = data.dishTypes
        recipeInfo["servings"] = data.servings

        let instructions = (data.analyzedInstructions.length === 0) ? [] : data.analyzedInstructions[0].steps
        recipeInfo["instructions"] = getInstructions(instructions)
        recipeInfo["credits"] = getCredits(data)
    })

    return recipeInfo
}


async function getSimilarRecipes(recipeID, recipeTitle) {
    const url = "https://api.spoonacular.com/recipes/search?query=" + recipeTitle + "&instructionsRequired=true&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let similarRecipes = []

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
        console.log(data)
        const recipesFound = data.results

        let i = 0
        while (i < recipesFound.length) {
            if (recipesFound[i].id === recipeID) continue

            const recipeInfo = {"id": recipesFound[i].id, "title": recipesFound[i].title, "image": "https://spoonacular.com/recipeImages/" + recipesFound[i].id + "-556x370.jpg"}
            similarRecipes.push(recipeInfo)

            if (similarRecipes.length === 3) break
            i++
        }
    })

    if (similarRecipes.length < 3) {
        const recommendedRecipes = await getRandomRecipes(Math.abs(similarRecipes.length - 3))
        console.log(recommendedRecipes)

        for (let i = 0; i < recommendedRecipes.length; i++)
            similarRecipes.push(recommendedRecipes[i])
    }

    return similarRecipes
}


async function getRandomRecipes(recipesNeeded) {
    randomRecipes = []

    await fetch("/recipes?foodCategory=random foods", {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(recipesFound => {
        while (randomRecipes.length != recipesNeeded) {
            const randomIdx = Math.ceil(Math.random() * recipesFound.length)
            randomRecipes.push(recipesFound[randomIdx])
            delete recipesFound[randomIdx]
        }
    })

    return randomRecipes
}


function storeInDB(recipeInfo) {
    fetch("/recipeInfo", {
        method: "POST",
        body: JSON.stringify(recipeInfo),
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


function getNutrients(nutrientsArray) {
    let storedNutrients = []

    for (let i = 0; i < nutrientsArray.length; i++)
        storedNutrients.push(" " + nutrientsArray[i].title + " = " + nutrientsArray[i].amount + " " + nutrientsArray[i].unit + " |")

    storedNutrients = storedNutrients.sort()
    storedNutrients[storedNutrients.length-1] = storedNutrients[storedNutrients.length-1].replace(" |", "")
    return storedNutrients
}


function getIngredients(ingredientsArray) {
    let storedIngredients = []

    for (let i = 0; i < ingredientsArray.length; i++) {
        let ingredient = ingredientsArray[i].name + " (" + ingredientsArray[i].amount

        if (ingredientsArray[i].unit === "") ingredient += ")"
        else ingredient += " " + ingredientsArray[i].unit + ")"

        storedIngredients.push(ingredient)
    }

    return storedIngredients
}


function getInstructions(instructionsArray) {
    let storedInstructions = []

    for (let i = 0; i < instructionsArray.length; i++) {
        let stepInfo = []
        stepInfo.push(instructionsArray[i].step)

        let ingredientsForThisStep = []
        for (let j = 0; j < instructionsArray[i].ingredients.length; j++)
            ingredientsForThisStep.push(instructionsArray[i].ingredients[j].name)

        let equipmentsForThisStep = []
        for (let j = 0; j < instructionsArray[i].equipment.length; j++)
            equipmentsForThisStep.push(instructionsArray[i].equipment[j].name)

        stepInfo.push(ingredientsForThisStep)
        stepInfo.push(equipmentsForThisStep)
        storedInstructions.push(stepInfo)
    }

    return storedInstructions
}


function getCredits(data) {
    let creditsArray = []

    if (data.creditsText !== undefined && data.creditsText !== null)
        creditsArray.push("Author: " + data.creditsText)

    if (data.sourceUrl !== undefined && data.sourceUrl !== null)
        creditsArray.push("Source: " + data.sourceUrl)

    if (data.license !== undefined && data.license !== null)
        creditsArray.push("License: " + data.license)

    return creditsArray
}




function createElement_P(className, rowNumber) {
    let pBlock = document.createElement("p")
    pBlock.setAttribute("class", className)

    if(className === "nutrient") {
        pBlock.style.display = "inline-block"
        pBlock.style.whiteSpace = "pre"
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
    console.log(credits)

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
        const spaceBlock = createElement_DIV("class", "spaceBlock")

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

    console.log(recipesToDisplay)

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
    //It takes everything in the query string up to the 1st '=', and replaces them with ''
    let windowParameters = window.location.search.replace(/\%20/g, " ")

    windowParameters = windowParameters.split(",")

    const recipeID = parseInt(windowParameters[0].substring(windowParameters[0].indexOf("=") + 1))
    const recipeTitle = windowParameters[1].substring(windowParameters[1].indexOf("=") + 1)

    setupThePage(recipeID, recipeTitle)
})
