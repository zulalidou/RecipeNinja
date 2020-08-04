function displayFood(recipeTitle, imgURL) {
    document.getElementById("recipeTitle").innerHTML = recipeTitle.bold()
    document.getElementById("recipeTitle").style.textAlign = "center"
    document.getElementById("foodImg").src = imgURL
}


function displayIngredients(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/ingredientWidget.json?apiKey=c27618bedd4b4071b925b766be18e0a4";
    document.getElementById("ingredientsSection")

    $.getJSON(url, function(data) {
        for (let i = 0; i < data.ingredients.length; i++) {
            const ingredientBlock = document.createElement('p');
            ingredientBlock.style.padding = "5px"
            ingredientBlock.style.backgroundColor = (i % 2 == 0) ? "lightblue" : "white"

            const ingredientText = document.createTextNode(data.ingredients[i].name + " (" + data.ingredients[i].amount.metric.value + " " + data.ingredients[i].amount.metric.unit + ")");
            ingredientBlock.appendChild(ingredientText);
            document.getElementById("ingredientsSection").appendChild(ingredientBlock);
        }
    })
}


function displayInstructions(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/analyzedInstructions?apiKey=c27618bedd4b4071b925b766be18e0a4";

    $.getJSON(url, function(data) {
        for (let i = 0; i < data[0].steps.length; i++) {
            const spaceBlock = createElement("div")
            spaceBlock.style.height = "20px"

            const stepBlock = createElement("h3")
            const stepText = document.createTextNode(("Step " + (i+1)))
            stepBlock.appendChild(stepText);

            const instructionBlock = createElement("p")
            const instructionText = document.createTextNode(data[0].steps[i].step)
            instructionBlock.appendChild(instructionText)

            document.getElementById("instructionsSection").appendChild(spaceBlock);
            document.getElementById("instructionsSection").appendChild(stepBlock);
            document.getElementById("instructionsSection").appendChild(instructionBlock);
        }
    });
}


function createElement(tagName) {
    const block = document.createElement(tagName)
    block.style.backgroundColor = "white"
    return block
}



$(function() {
    let recipeInfo = window.location.search.replace(/\%20/g, " "); //It takes everything in the query string up to the 1st '=', and replaces them with ''
    recipeInfo = recipeInfo.split(",");

    for (let i = 0; i < recipeInfo.length; i++)
        recipeInfo[i] = recipeInfo[i].substring(recipeInfo[i].indexOf("=") + 1);

    console.log(recipeInfo);

    displayFood(recipeInfo[1], recipeInfo[2]);
    displayIngredients(recipeInfo[0]);
    displayInstructions(recipeInfo[0]);
});
