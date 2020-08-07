function displayFood(recipeTitle, imgURL) {
    document.getElementById("recipeTitle").innerHTML = recipeTitle.bold()
    document.getElementById("recipeTitle").style.textAlign = "center"
    document.getElementById("foodImg").src = imgURL
}


function getRecipeInfo(recipeID) {
    $.ajaxSetup({
        async: false
    })

    recipeInfo = Object()
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=true&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        recipeInfo["nutrients"] = getNutrients(data.nutrition.nutrients)
        recipeInfo["ingredients"] = getIngredients(data.extendedIngredients)
        recipeInfo["instructions"] = getInstructions(data.analyzedInstructions[0].steps)
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

    return storedNutrients
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


function displayIngredients(ingredientsArray) {
    for (let i = 0; i < ingredientsArray.length; i++) {
        const ingredientBlock = document.createElement('p')
        ingredientBlock.style.padding = "5px"
        ingredientBlock.style.backgroundColor = (i % 2 == 0) ? "lightblue" : "white"

        const ingredientText = document.createTextNode(ingredientsArray[i])
        ingredientBlock.appendChild(ingredientText)
        document.getElementById("ingredientsSection").appendChild(ingredientBlock)
    }
}


function displayInstructions(instructionsArray) {
    console.log(instructionsArray)

    for (let i = 0; i < instructionsArray.length; i++) {
        const spaceBlock = createElement("div")
        spaceBlock.style.height = "20px"

        const stepBlock = createElement("h3")
        const stepText = document.createTextNode(("Step " + (i+1)))
        stepBlock.appendChild(stepText)

        const instructionBlock = createElement("p")
        const instructionText = document.createTextNode(instructionsArray[i][0])
        instructionBlock.appendChild(instructionText)



        const ingredientsBlock = createElement("p")
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



        const equipmentsBlock = createElement("p")
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
        document.getElementById("instructionsSection").appendChild(stepBlock)
        document.getElementById("instructionsSection").appendChild(instructionBlock)
        document.getElementById("instructionsSection").appendChild(ingredientsBlock)
        document.getElementById("instructionsSection").appendChild(equipmentsBlock)
    }
}


function createElement(tagName) {
    const block = document.createElement(tagName)
    block.style.backgroundColor = "white"
    return block
}



function displayCredits(creditsArray) {
    const spaceBlock = createElement("div")
    spaceBlock.style.height = "20px"

    const titleBlock = createElement("p")
    titleBlock.style.height = "20px"
    const title = document.createTextNode("Title: " + creditsArray[0])
    titleBlock.appendChild(title)

    const creatorBlock = createElement("p")
    creatorBlock.style.height = "20px"
    const creator = document.createTextNode("Creator: " + creditsArray[1])
    creatorBlock.appendChild(creator)

    const sourceBlock = createElement("p")
    sourceBlock.style.height = "20px"
    const source = document.createTextNode("Source: " + creditsArray[2])
    sourceBlock.appendChild(source)

    const licenseBlock = createElement("p")
    licenseBlock.style.height = "20px"
    const license = document.createTextNode("License = " + creditsArray[3])
    licenseBlock.appendChild(license)

    document.getElementById("creditsSection").appendChild(spaceBlock)
    document.getElementById("creditsSection").appendChild(titleBlock)
    document.getElementById("creditsSection").appendChild(creatorBlock)
    document.getElementById("creditsSection").appendChild(sourceBlock)
    document.getElementById("creditsSection").appendChild(licenseBlock)
}


$(function() {
    let windowParameters = window.location.search.replace(/\%20/g, " "); //It takes everything in the query string up to the 1st '=', and replaces them with ''
    windowParameters = windowParameters.split(",");

    const recipeID = windowParameters[0].substring(windowParameters[0].indexOf("=") + 1)
    const recipeTitle = windowParameters[1].substring(windowParameters[1].indexOf("=") + 1)
    const recipeImg = windowParameters[2].substring(windowParameters[2].indexOf("=") + 1)


    const recipeInfo = getRecipeInfo(recipeID)
    console.log(recipeInfo)

    displayFood(recipeTitle, recipeImg)
    displayIngredients(recipeInfo["ingredients"])
    displayInstructions(recipeInfo["instructions"])
    displayCredits(recipeInfo["credits"])
})
