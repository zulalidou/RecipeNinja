function getRecipeInfo(recipeID) {
    $.ajaxSetup({
        async: false
    })

    recipeInfo = Object()
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=true&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        console.log(data)
        recipeInfo["title"] = data.title
        recipeInfo["image"] = data.image
        recipeInfo["nutrition"] = getNutrients(data.nutrition.nutrients)
        recipeInfo["ingredients"] = getIngredients(data.extendedIngredients)

        let instructions = (data.analyzedInstructions.length === 0) ? [] : data.analyzedInstructions[0].steps
        recipeInfo["instructions"] = getInstructions(instructions)


        recipeInfo["credits"] = getCredits(data)
    })

    $.ajaxSetup({
        async: true
    })

    return recipeInfo
}


function getNutrients(nutrientsArray) {
    let storedNutrients = []

    for (let i = 0; i < nutrientsArray.length; i++)
        storedNutrients.push(nutrientsArray[i].title + " = " + nutrientsArray[i].amount + " " + nutrientsArray[i].unit)

    return storedNutrients.sort()
}


function getIngredients(ingredientsArray) {
    let storedIngredients = []

    for (let i = 0; i < ingredientsArray.length; i++)
        storedIngredients.push(ingredientsArray[i].name + " (" + ingredientsArray[i].amount + " " + ingredientsArray[i].unit + ")")

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

    creditsArray.push(data.title)
    creditsArray.push(data.creditsText)
    creditsArray.push(data.sourceUrl)
    creditsArray.push(data.license)

    return creditsArray
}



function createElement_P(className, rowNumber) {
    let pBlock = document.createElement("p")
    pBlock.setAttribute("class", className)

    if (className === "ingredient" || className === "nutrient") {
        pBlock.style.padding = "5px"
        pBlock.style.backgroundColor = (rowNumber % 2 == 0) ? "lightblue" : "white"
    }
    else
        pBlock.style.backgroundColor = "white"

    return pBlock
}


// selector == "id" or "class"
function createElement_DIV(selector, selectorName) {
    let divBlock = document.createElement("div")

    if (selectorName === "spaceBlock")
        divBlock.style.height = "20px"
    else
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



function displayFood(title, image) {
    document.getElementById("recipeTitle").innerHTML = title.bold()
    document.getElementById("recipeTitle").style.textAlign = "center"
    document.getElementById("foodImg").src = image
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



function displayCredits(creditsArray) {
    const spaceBlock = createElement_P("div")
    spaceBlock.style.height = "20px"

    const titleBlock = createElement_P("credit", null)
    titleBlock.style.height = "20px"
    const title = document.createTextNode("Title: " + creditsArray[0])
    titleBlock.appendChild(title)

    const creatorBlock = createElement_P("credit", null)
    creatorBlock.style.height = "20px"
    const creator = document.createTextNode("Creator: " + creditsArray[1])
    creatorBlock.appendChild(creator)

    const sourceBlock = createElement_P("credit", null)
    sourceBlock.style.height = "20px"
    const source = document.createTextNode("Source: " + creditsArray[2])
    sourceBlock.appendChild(source)

    const licenseBlock = createElement_P("credit", null)
    licenseBlock.style.height = "20px"
    const license = document.createTextNode("License: " + creditsArray[3])
    licenseBlock.appendChild(license)

    document.getElementById("creditsSection").appendChild(spaceBlock)
    document.getElementById("creditsSection").appendChild(titleBlock)
    document.getElementById("creditsSection").appendChild(creatorBlock)
    document.getElementById("creditsSection").appendChild(sourceBlock)
    document.getElementById("creditsSection").appendChild(licenseBlock)
}


function getRecipes(foodSearched, currentRecipeID) {
    let recipesFound = null

    if (sessionStorage.getItem(foodSearched) === null)
        recipesFound = searchForFood(foodSearched)
    else
        recipesFound = JSON.parse(sessionStorage.getItem(foodSearched))


    let recipesToDisplay = []

    //console.log(recipesFound)
    let displayableRecipes = (jQuery.isEmptyObject(recipesFound)) ? 0 : recipesFound[1].length - 1
    //console.log(displayableRecipes)

    if (displayableRecipes <= 2)
        recipesToDisplay = getRandomRecipes(Math.abs(displayableRecipes - 3))

    while (recipesToDisplay.length < 3) {
        const pageNumber = Math.floor(Math.random() * (recipesFound.pagesNeeded)) + 1
        const recipeNumber = Math.floor(Math.random() * recipesFound[pageNumber].length)

        if (recipesToDisplay.indexOf(recipesFound[pageNumber][recipeNumber]) === -1 && parseInt(recipesFound[pageNumber][recipeNumber][0]) !== parseInt(currentRecipeID))
            recipesToDisplay.unshift(recipesFound[pageNumber][recipeNumber])
    }

    return recipesToDisplay
}



function searchForFood(foodSearched) {
    $.ajaxSetup({
        async: false
    })

    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object()

    $.getJSON(url, function(data) {
        const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
        const pagesNeeded = Math.ceil(totalResults / 12)

        let currentPage = 1
        let pageRecipes = []

        if (totalResults !== 0) {
            for (let i = 0; i < data.results.length; i++) {
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
        }
    })

    sessionStorage.setItem(foodSearched, JSON.stringify(recipes))

    $.ajaxSetup({
        async: true
    })

    return recipes
}




function getRandomRecipes(number) {
    $.ajaxSetup({
        async: false
    });

    const url = "https://api.spoonacular.com/recipes/random?number=" + number.toString() + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = []

    $.getJSON(url, function(data) {
        for (let i = 0; i < data.recipes.length; i++)
            recipes.push([data.recipes[i].id, data.recipes[i].title, (data.recipes[i].image === undefined) ? "images/plate.png" : data.recipes[i].image])
    })

    $.ajaxSetup({
        async: true
    });

    return recipes
}


function displayRecipes(foodSearched, recipesToDisplay) {
    document.getElementById("similarRecipesHeader").innerHTML = "Browse through similar recipes"

    console.log(recipesToDisplay)

    for (let i = 0; i < recipesToDisplay.length; i++) {
        const foodImg = createElement_IMG(recipesToDisplay[i][2])
        const foodImgContainer = createElement_DIV("class", "foodImgContainer")
        foodImgContainer.appendChild(foodImg)


        const foodName = createElement_P("foodName", null)
        foodName.innerHTML = recipesToDisplay[i][1]
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
    window.location = "infoPage.html?id=" + recipeInfo[0]
}



$(function() {
    let windowParameters = window.location.search.replace(/\%20/g, " ") //It takes everything in the query string up to the 1st '=', and replaces them with ''
    console.log(windowParameters)
    const recipeID = parseInt(windowParameters.substring(windowParameters.indexOf("=") + 1))

    const recipeInfo = getRecipeInfo(recipeID)
    console.log(recipeInfo)

    displayFood(recipeInfo["title"], recipeInfo["image"])
    displayIngredients(recipeInfo["ingredients"])
    displayInstructions(recipeInfo["instructions"])
    displayNutritions(recipeInfo["nutrition"])
    displayCredits(recipeInfo["credits"])

    const recipesToDisplay = getRecipes(recipeInfo["title"], recipeID)
    displayRecipes(recipeInfo["title"], recipesToDisplay)
})
