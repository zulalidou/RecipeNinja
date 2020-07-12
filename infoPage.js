function displayFood(imgURL) {
    //console.log(imgURL);
    const recipeBlock = document.getElementById("mainRecipe");
    recipeBlock.style.backgroundImage = "url(" + imgURL + ")";
    recipeBlock.style.maxHeight = "100%";
    recipeBlock.style.maxWidth = "100%";
    recipeBlock.style.objectFit = "cover";
}


function displayIngredients(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/ingredientWidget.json?apiKey=c27618bedd4b4071b925b766be18e0a4";

    $.getJSON(url, function(data) {
        //console.log(data);

        for (let i = 0; i < data.ingredients.length; i++) {
            const ingredientBlock = document.createElement('p');

            const ingredientText = document.createTextNode(data.ingredients[i].name + " (" + data.ingredients[i].amount.metric.value + " " + data.ingredients[i].amount.metric.unit + ")");
            ingredientBlock.appendChild(ingredientText);
            document.getElementById("ingredientsSection").appendChild(ingredientBlock);
        }
    });
}


function displayInstructions(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/analyzedInstructions?apiKey=c27618bedd4b4071b925b766be18e0a4";

    $.getJSON(url, function(data) {
        console.log(data);

        for (let i = 0; i < data[0].steps.length; i++) {
            const instructionBlock = document.createElement('div'); // creates a paragraph
            instructionBlock.style.backgroundColor = "blue";

            console.log(instructionBlock);

            const img = document.createElement('img'); // creates an image
            img.src = steps[i];


            const instructionText = document.createTextNode(data[0].steps[i].step);

            instructionBlock.appendChild(img);
            instructionBlock.appendChild(instructionText);
            document.getElementById("instructionsSection").appendChild(instructionBlock);
        }
    });
}



steps = ["images/steps/1.png", "images/steps/2.png", "images/steps/3.png", "images/steps/4.png", "images/steps/5.png",
        "images/steps/6.png", "images/steps/7.png", "images/steps/8.png", "images/steps/9.png", "images/steps/10.png",
        "images/steps/11.png", "images/steps/12.png", "images/steps/13.png", "images/steps/14.png", "images/steps/15.png",
        "images/steps/16.png", "images/steps/17.png", "images/steps/18.png", "images/steps/19.png", "images/steps/20.png",
        "images/steps/21.png", "images/steps/22.png", "images/steps/23.png", "images/steps/24.png", "images/steps/25.png",
        "images/steps/26.png", "images/steps/27.png", "images/steps/28.png", "images/steps/29.png", "images/steps/30.png"];




$(function() {
    //init();

    let videoInfo = window.location.search.replace(/\%20/g, " "); //It takes everything in the query string up to the 1st '=', and replaces them with ''
    videoInfo = videoInfo.split(",");

    for (let i = 0; i < videoInfo.length; i++)
        videoInfo[i] = videoInfo[i].substring(videoInfo[i].indexOf("=") + 1);

    //console.log(videoInfo);

    displayFood(videoInfo[2]);
    displayIngredients(videoInfo[0]);
    displayInstructions(videoInfo[0]);
});
