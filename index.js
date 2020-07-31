function getRandomFoods() {
    const url = "https://api.spoonacular.com/recipes/random?number=12&apiKey=c27618bedd4b4071b925b766be18e0a4";
    let recipes = Object(); //dictionary

    $.getJSON(url, function(data) {
        for (let i = 0; i < data.recipes.length; i++) {
            recipes[i] = [data.recipes[i].id, data.recipes[i].title, (data.recipes[i].image === undefined) ? "images/plate.png" : data.recipes[i].image];
        }

        displayFoods(recipes);
    });
}


function displayFoods(recipes) {
    console.log(recipes);
    var boxes = document.getElementsByClassName("myGridContainer")[0].children;
    //console.log(boxes)

    for (let i = 0; i < 12; i++) {
        //children[0] = div (the image of food shown)
        //children[1] = p (the title of food shown)



        console.log(boxes[i].children)
        boxes[i].children[0].children[0].src = recipes[i][2];

        // some may not have images... take care of that

        /*
        boxes[i].children[0].style.maxHeight = "100%";
        boxes[i].children[0].style.maxWidth = "100%";
        boxes[i].children[0].style.objectFit = "cover";
        */

        //boxes[i].children[0].style.backgroundSize = "cover";


        boxes[i].children[1].children[0].textContent = recipes[i][1];


        boxes[i].addEventListener("click", function() {
            infoPage(recipes[i]);
        });

        // When mouse if over block, show title
    }
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html" + "?id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",img=" + recipeInfo[2];
}



getRandomFoods()





/*
$(document).ready(function() {
    console.log("this is a test")
    fetch('https://www.googleapis.com/youtube/v3/activities?key=AIzaSyAYx8S1WBcGNYgSN6RwY41NZNC-h_dKXlU&part=snippet&channelId=UC-lHJZR3Gqxm24_Vd_AJ5Yw')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch( (err) => {
        console.log(err)
    })
})
*/
