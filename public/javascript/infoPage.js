async function getRecipeInfo(recipeID, foodSearched) {
    // GET requests do not support bodies, and parameters must be sent in the URL

    //"/recipes?collectionName=snacks,id=222482"
    //"/recipes?collectionName=__DETAILED__RECIPE__INFO__,id=" + recipeID

    console.log("hello")

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
        console.log(data)
        recipeInfo = data
    })

    console.log("world")
    return recipeInfo


    // $.ajaxSetup({
    //     async: false
    // })
    //
    // let adsdf = []
    //
    // $.ajax({
    //     type: "GET",
    //     url: "/recipes",
    //     data: {
    //         collectionNmame: "__DETAILED__RECIPE__INFO__"
    //     },
    //     success: async function(result) {
    //         console.log(result)
    //
    //         if (result.length === 0) {
    //             console.log("0 recipes returned")
    //
    //             // let recipeInfo = await getFoodsFromAPI(recipeID)
    //             // console.log(recipeInfo)
    //
    //             // const similarRecipes = await getSimilarRecipes(recipeID, foodSearched)
    //             // console.log(similarRecipes)
    //
    //             // recipeInfo["similarRecipes"] = similarRecipes
    //             // storeInDB("__DETAILED__RECIPE__INFO__", recipeInfo)
    //             // console.log(result)
    //             asdf = ["result"]
    //             console.log(asdf)
    //         }
    //         else {
    //             console.log(result)
    //             asdf = result
    //         }
    //     },
    //     error: function(e) {
    //         console.log("ERROR: ", e)
    //     }
    // })
    //
    // $.ajaxSetup({
    //     async: true
    // })
    //
    // return asdf
}


async function getFoodsFromAPI(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=true&apiKey=c27618bedd4b4071b925b766be18e0a4"
    recipeInfo = Object()
    console.log("1")

    await $.getJSON(url, function(data) {
        recipeInfo["id"] = recipeID
        recipeInfo["title"] = data.title
        recipeInfo["image"] = data.image
        recipeInfo["nutrition"] = getNutrients(data.nutrition.nutrients)
        recipeInfo["ingredients"] = getIngredients(data.extendedIngredients)
        recipeInfo["dishTypes"] = data.dishTypes
        recipeInfo["cuisines"] = data.cuisines
        recipeInfo["diets"] = data.diets
        recipeInfo["servings"] = data.servings
        console.log("222")

        let instructions = (data.analyzedInstructions.length === 0) ? [] : data.analyzedInstructions[0].steps
        recipeInfo["instructions"] = getInstructions(instructions)
        recipeInfo["credits"] = getCredits(data)
    })

    console.log("3")
    return recipeInfo
    // }).done(function() {
    //     // getSimilarRecipes(recipeInfo)
    //     // displayFood(recipeInfo)
    //
    //     // displayIngredients(recipeInfo["ingredients"])
    //     // displayInstructions(recipeInfo["instructions"])
    //     // displayNutritions(recipeInfo["nutrition"])
    // })
}


async function getSimilarRecipes(recipeID, foodSearched) {
    let similarRecipes = []

    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&apiKey=c27618bedd4b4071b925b766be18e0a4"
    let recipes = Object()

    console.log("22")

    await $.getJSON(url, function(data) {
        console.log(data)
        // console.log(similarRecipes)

        for (let i = 0; i < data.results.length && similarRecipes.length < 3; i++) {
            if (data.results[i].id === recipeID)
                continue

            const recipeInfo = {"id": data.results[i].id, "title": data.results[i].title, "image": "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"}
            similarRecipes.push(recipeInfo)
        }

        console.log(similarRecipes)
    })


    console.log("24")
    console.log("similarRecipes.length = " + similarRecipes.length)


    if (similarRecipes.length < 3) {
        const recommendedRecipes = await getRandomRecipes(Math.abs(similarRecipes.length - 3))
        console.log(recommendedRecipes)

        for (let i = 0; i < recommendedRecipes.length; i++)
            similarRecipes.push(recommendedRecipes[i])
    }

    console.log(similarRecipes)
    return similarRecipes

    // .done(function() {
    //     console.log(similarRecipes.length)
    //
    //     // if (similarRecipes.length < 3) {
    //     //     let randomRecipes = await getRandomRecipes(Math.abs(similarRecipes.length - 3))
    //     //
    //     //     for (let i = 0; i < randomRecipes.length; i++) {
    //     //         console.log("asdf")
    //     //         similarRecipes.push(randomRecipes[i])
    //     //     }
    //     //
    //     //     console.log(randomRecipes)
    //     //     console.log(similarRecipes)
    //     //     recipeInfo["similarRecipes"] = similarRecipes
    //     // }
    //
    //     //================================================================
    //
    //     // getSimilarRecipes(recipeInfo)
    //     // displayFood(recipeInfo)
    //
    //     // displayIngredients(recipeInfo["ingredients"])
    //     // displayInstructions(recipeInfo["instructions"])
    //     // displayNutritions(recipeInfo["nutrition"])
    // })
}


async function getRandomRecipes(recipesNum) {
    recipes = []
    console.log("before GRR()")

    await $.ajax({
        type: "GET",
        url: "/recipes",
        data: {
            collectionName: "random foods"
        },
        success: function(result) {
            // console.log(result)

            while (recipes.length != recipesNum) {
                const randomIdx = Math.ceil(Math.random() * result.length)
                recipes.push(result[randomIdx])
                delete recipes[randomIdx]
            }

            console.log("hey hey hey")
        },
        error: function(e) {
            console.log("ERROR: ", e)
        }
    })

    console.log("after GRR()")
    // console.log(recipes)

    return recipes
}



function storeInDB(recipeInfo) {
    console.log("before storeInDB()")

    // $.ajax({
    //     type : "POST",
    //     contentType : "application/json",
    //     url : "/recipes",
    //     data: JSON.stringify({collectionName: "__DETAILED__RECIPE__INFO__", recipeInfo: recipeInfo}),//JSON.stringify(recipes),
    //     success: function(result) {
    //         console.log("SUCCESS: ", result)
    //     },
    //     error : function(e) {
    //         console.log("ERROR: ", e)
    //     }
    // })

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


    console.log("aFtEr storeInDB()")
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

    // if (className === "ingredient" || className === "nutrient") {
    //     pBlock.style.padding = "5px"
    //     pBlock.style.backgroundColor = (rowNumber % 2 == 0) ? "lightblue" : "white"
    // }
    // else
    //     pBlock.style.backgroundColor = "gray"

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



function displayFood(recipeInfo) {
    document.getElementById("recipeTitle").innerHTML = recipeInfo["title"].bold()
    document.getElementById("recipeTitle").style.textAlign = "center"
    document.getElementById("foodImg").src = recipeInfo["image"]

    addFoodFact("Dish Type(s): ", recipeInfo["dishTypes"])
    addFoodFact("Cuisine(s): ", recipeInfo["cuisines"])
    addFoodFact("Diet(s): ", recipeInfo["diets"])
    addFoodFact("Servings: ", recipeInfo["servings"])
    document.getElementById("factsContainer").appendChild(createElement_DIV("class", "smallSpaceBlock"))
    addFoodCredits(recipeInfo["credits"])
}


function addFoodFact(text, factsArray) {
    let block = createElement_P("fact", null)

    // console.log(typeof factsArray)
    // console.log(factsArray)

    if (typeof factsArray !== "object")
        text += factsArray
    else {
        if (factsArray.length === 0)
            text += "N / A"

        for (let i = 0; i < factsArray.length; i++) {
            text += factsArray[i]

            if (i !== factsArray.length - 1)
                text += ", "
        }
    }

    let textNode = document.createTextNode(text)
    block.appendChild(textNode)
    document.getElementById("factsContainer").appendChild(block)
    //document.getElementById("factsContainer").appendChild(createElement_DIV("class", "spaceBlock"))

    console.log(text)
}


function addFoodCredits(credits) {
    for (let i = 0; i < credits.length; i++) {
        let block = createElement_P("fact", null)
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



// function displayCredits(creditsArray) {
//     const spaceBlock = createElement_P("div")
//     spaceBlock.style.height = "20px"
//
//     const titleBlock = createElement_P("credit", null)
//     titleBlock.style.height = "20px"
//     const title = document.createTextNode("Title: " + creditsArray[0])
//     titleBlock.appendChild(title)
//
//     const creatorBlock = createElement_P("credit", null)
//     creatorBlock.style.height = "20px"
//     const creator = document.createTextNode("Creator: " + creditsArray[1])
//     creatorBlock.appendChild(creator)
//
//     const sourceBlock = createElement_P("credit", null)
//     sourceBlock.style.height = "20px"
//     const source = document.createTextNode("Source: " + creditsArray[2])
//     sourceBlock.appendChild(source)
//
//     const licenseBlock = createElement_P("credit", null)
//     licenseBlock.style.height = "20px"
//     const license = document.createTextNode("License: " + creditsArray[3])
//     licenseBlock.appendChild(license)
//
//     document.getElementById("creditsSection").appendChild(spaceBlock)
//     document.getElementById("creditsSection").appendChild(titleBlock)
//     document.getElementById("creditsSection").appendChild(creatorBlock)
//     document.getElementById("creditsSection").appendChild(sourceBlock)
//     document.getElementById("creditsSection").appendChild(licenseBlock)
// }


// function getRecipes(foodSearched, currentRecipeID) {
//     let recipesFound = null
//
//     if (sessionStorage.getItem(foodSearched) === null)
//         recipesFound = searchForFood(foodSearched)
//     else
//         recipesFound = JSON.parse(sessionStorage.getItem(foodSearched))
//
//
//     let recipesToDisplay = []
//
//     //console.log(recipesFound)
//     let displayableRecipes = (jQuery.isEmptyObject(recipesFound)) ? 0 : recipesFound[1].length - 1
//     //console.log(displayableRecipes)
//
//     if (displayableRecipes <= 2)
//         recipesToDisplay = getRandomRecipes(Math.abs(displayableRecipes - 3))
//
//     while (recipesToDisplay.length < 3) {
//         const pageNumber = Math.floor(Math.random() * (recipesFound.pagesNeeded)) + 1
//         const recipeNumber = Math.floor(Math.random() * recipesFound[pageNumber].length)
//
//         if (recipesToDisplay.indexOf(recipesFound[pageNumber][recipeNumber]) === -1 && parseInt(recipesFound[pageNumber][recipeNumber][0]) !== parseInt(currentRecipeID))
//             recipesToDisplay.unshift(recipesFound[pageNumber][recipeNumber])
//     }
//
//     return recipesToDisplay
// }



// function searchForFood(foodSearched) {
//     $.ajaxSetup({
//         async: false
//     })
//
//     const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
//     let recipes = Object()
//
//     $.getJSON(url, function(data) {
//         const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
//         const pagesNeeded = Math.ceil(totalResults / 12)
//
//         let currentPage = 1
//         let pageRecipes = []
//
//         if (totalResults !== 0) {
//             for (let i = 0; i < data.results.length; i++) {
//                 const recipeInfo = [data.results[i].id, [data.results[i].title], "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"]
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
//         }
//     })
//
//     sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
//
//     $.ajaxSetup({
//         async: true
//     })
//
//     return recipes
// }




function displaySimilarRecipes(foodSearched, recipesToDisplay) {
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
    window.location = "infoPage.html?id=" + recipeInfo["id"] + ",foodName=" + recipeInfo["title"]
}



$(function() {
    let windowParameters = window.location.search.replace(/\%20/g, " ") //It takes everything in the query string up to the 1st '=', and replaces them with ''

    windowParameters = windowParameters.split(",")
    // console.log(windowParameters)

    const recipeID = parseInt(windowParameters[0].substring(windowParameters[0].indexOf("=") + 1))
    const recipeTitle = windowParameters[1].substring(windowParameters[1].indexOf("=") + 1)

    // console.log(recipeID)
    // console.log(recipeTitle)

    setup(recipeID, recipeTitle)

    // ======================================================================================
    // EVERYTHING BELOW THIS COMMENT WAS ALREADY COMMENTED OUT BEFORE I STARTED WORKING
    // ON THIS PAGE.. THIS DAY.. THE 21ST OF AUGUST, 2020
    // ======================================================================================

    // displayFood(recipeInfo)
    // displayIngredients(recipeInfo["ingredients"])
    // displayInstructions(recipeInfo["instructions"])
    // displayNutritions(recipeInfo["nutrition"])

    // const recipesToDisplay = getRecipes(recipeInfo["title"], recipeID)
    // displayRecipes(recipeInfo["title"], recipesToDisplay)
})


async function setup(recipeID, recipeTitle) {
    let res = await getRecipeInfo(recipeID, recipeTitle)

    if ($.isEmptyObject(res)) {
        console.log("'twas empty")
        res = await getFoodsFromAPI(recipeID)
        const similarRecipes = await getSimilarRecipes(recipeID, recipeTitle)
        console.log(similarRecipes)

        res["similarRecipes"] = similarRecipes
        storeInDB(res)
    }

    displayFood(res)
    displayIngredients(res.ingredients)
    displayInstructions(res.instructions)
    displayNutritions(res.nutrition)
    displaySimilarRecipes(recipeTitle, res.similarRecipes)
    console.log(res)
}
