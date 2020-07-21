function setupPageTabs(recipes, pageNumber, pagesNeeded) {
    for (let i = 1; i <= pagesNeeded; i++) {
        document.getElementById(i.toString()).style.visibility = "visible"

        if (i == pageNumber) {
            document.getElementById(i.toString()).disabled = true;
            document.getElementById(i.toString()).style.color = "yellow";
        }
        else {
            document.getElementById(i.toString()).disabled = false;
            document.getElementById(i.toString()).style.color = "red";
        }
    }


    if (pageNumber == 1) {
        document.getElementById("firstPagerItem").style.visibility = "hidden"
        document.getElementById("prevPagerItem").style.visibility = "hidden"
    }
    else {
        document.getElementById("firstPagerItem").style.visibility = "visible"
        document.getElementById("prevPagerItem").style.visibility = "visible"
    }

    if (pageNumber == pagesNeeded) {
        document.getElementById("nextPagerItem").style.visibility = "hidden"
        document.getElementById("lastPagerItem").style.visibility = "hidden"
    }
    else {
        document.getElementById("nextPagerItem").style.visibility = "visible"
        document.getElementById("lastPagerItem").style.visibility = "visible"
    }


    for (let i = pagesNeeded + 1; i <= 9; i++) {
        document.getElementById(i.toString()).style.visibility = "hidden"
        document.getElementById(i.toString()).disabled = true
    }



    showRecipes(recipes, pageNumber, pagesNeeded)

    for (let currentPage = 1; currentPage <= pagesNeeded; currentPage++) {
        if (currentPage == pageNumber)
            continue

        linkPagerItems(foodSearched, currentPage, pagesNeeded)
        console.log(currentPage)
    }
}


function showRecipes(recipes, pageNumber, pagesNeeded) {
    var boxes = document.getElementsByClassName("myGridContainer")[0].children
    console.log(recipes)

    for (let i = 0; i < 12; i++)
        boxes[i].style.visibility = "visible"

    for (let i = 0; i < recipes.length; i++) {
        //children[0] = div (the image of food shown)
        //children[1] = p (the title of food shown)

        // I'm retrieving the recipes' images this way because the image url provided for the recipes using the search query isn't useful in getting the images
        boxes[i].children[0].style.backgroundImage = "url(https://spoonacular.com/recipeImages/" + recipes[i][0] + "-556x370.jpg)"
        // some may not have images... take care of that

        boxes[i].children[0].style.maxHeight = "100%";
        boxes[i].children[0].style.maxWidth = "100%";
        boxes[i].children[0].style.objectFit = "cover";

        boxes[i].children[1].textContent = recipes[i][1]
        //console.log(i)

        boxes[i].addEventListener("click", function() {
            infoPage(recipes[i]);
        });

        // When mouse if over block, show title
    }

    for (let i = recipes.length; i < 12; i++)
        boxes[i].style.visibility = "hidden"
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html" + "?id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",img=" + recipeInfo[2];
}


function linkPagerItems(foodSearched, currentPage, pagesNeeded) {
    document.getElementById(currentPage.toString()).addEventListener("click", function() {
        window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + currentPage
    })
}




let parameters = window.location.search.replace(/\%20/g, " "); //It takes everything in the query string up to the 1st '=', and replaces them with ''

parameters = parameters.split(",");

const foodSearched = parameters[0].substring(parameters[0].indexOf("=") + 1)
const pagesNeeded = parameters[1].substring(parameters[1].indexOf("=") + 1)
const pageNumber = parameters[2].substring(parameters[2].indexOf("=") + 1)
const recipes = JSON.parse(sessionStorage.getItem(foodSearched))[pageNumber]


console.log("food = " + foodSearched)
console.log("pagesNeeded = " + pagesNeeded)
console.log("pageNumber = " + pageNumber)


setupPageTabs(recipes, pageNumber, pagesNeeded)

console.log(JSON.parse(sessionStorage.getItem(foodSearched)))
