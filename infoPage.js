function displayFood(recipeTitle, imgURL) {
    document.getElementById("recipeTitle").innerHTML = recipeTitle.bold()
    document.getElementById("recipeTitle").style.textAlign = "center"


    //console.log(imgURL);
    const recipeImg = document.getElementById("foodImg");
    recipeImg.src = imgURL


    /*
    recipeImg.style.maxHeight = "100%";
    recipeImg.style.maxWidth = "100%";
    recipeImg.style.objectFit = "cover";
    */
}


function displayIngredients(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/ingredientWidget.json?apiKey=c27618bedd4b4071b925b766be18e0a4";
    document.getElementById("ingredientsSection")

    $.getJSON(url, function(data) {
        //console.log(data);

        for (let i = 0; i < data.ingredients.length; i++) {
            const ingredientBlock = document.createElement('p');
            ingredientBlock.style.padding = "5px"
            ingredientBlock.style.backgroundColor = (i % 2 == 0) ? "lightblue" : "white"
            const ingredientText = document.createTextNode(data.ingredients[i].name + " (" + data.ingredients[i].amount.metric.value + " " + data.ingredients[i].amount.metric.unit + ")");
            ingredientBlock.appendChild(ingredientText);
            document.getElementById("ingredientsSection").appendChild(ingredientBlock);
        }
    });
}


function displayInstructions(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/analyzedInstructions?apiKey=c27618bedd4b4071b925b766be18e0a4";

    $.getJSON(url, function(data) {
        //console.log(data);

        for (let i = 0; i < data[0].steps.length; i++) {
            const spaceBlock = document.createElement('div')
            spaceBlock.style.backgroundColor = "white"
            spaceBlock.style.height = "20px"

            const stepBlock = document.createElement('h3')
            stepBlock.style.backgroundColor = "white"
            const stepText = document.createTextNode(("Step " + (i+1)))
            stepBlock.appendChild(stepText);

            const instructionBlock = document.createElement('p')
            instructionBlock.style.backgroundColor = "white"
            const instructionText = document.createTextNode(data[0].steps[i].step)
            instructionBlock.appendChild(instructionText)

            document.getElementById("instructionsSection").appendChild(spaceBlock);
            document.getElementById("instructionsSection").appendChild(stepBlock);
            document.getElementById("instructionsSection").appendChild(instructionBlock);
        }
    });
}



/*
steps = ["images/steps/1.png", "images/steps/2.png", "images/steps/3.png", "images/steps/4.png", "images/steps/5.png",
        "images/steps/6.png", "images/steps/7.png", "images/steps/8.png", "images/steps/9.png", "images/steps/10.png",
        "images/steps/11.png", "images/steps/12.png", "images/steps/13.png", "images/steps/14.png", "images/steps/15.png",
        "images/steps/16.png", "images/steps/17.png", "images/steps/18.png", "images/steps/19.png", "images/steps/20.png",
        "images/steps/21.png", "images/steps/22.png", "images/steps/23.png", "images/steps/24.png", "images/steps/25.png",
        "images/steps/26.png", "images/steps/27.png", "images/steps/28.png", "images/steps/29.png", "images/steps/30.png"];
*/



$(function() {
    //init();

    let videoInfo = window.location.search.replace(/\%20/g, " "); //It takes everything in the query string up to the 1st '=', and replaces them with ''
    videoInfo = videoInfo.split(",");

    for (let i = 0; i < videoInfo.length; i++)
        videoInfo[i] = videoInfo[i].substring(videoInfo[i].indexOf("=") + 1);

    console.log(videoInfo);

    displayFood(videoInfo[1], videoInfo[2]);
    displayIngredients(videoInfo[0]);
    displayInstructions(videoInfo[0]);
});
