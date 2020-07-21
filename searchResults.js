function getRecipes(foodSearched) {
    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        const totalResults = (data.number <= data.totalResults) ? data.number : data.totalResults
        const pagesNeeded = Math.ceil(totalResults / 12)
        let recipes = Object()

        let pageNumber = 1
        let pageRecipes = []

        for (let i = 0; i < totalResults; i++) {
            // i can probably drop image now (the 3rd entry in the array below) since i don't use it anywhere in this program for the time being
            // I'm making an arr
            const recipeInfo = [data.results[i].id, [data.results[i].title]]//, data.results[i].image]
            pageRecipes.push(recipeInfo)

            if ((i+1) % 12 == 0) {
                recipes[pageNumber] = pageRecipes
                pageNumber++
                pageRecipes = []
            }
        }

        if (pageRecipes.length > 0)
            recipes[pageNumber] = pageRecipes

        console.log(recipes)
        console.log("pagesNeeded = " + pagesNeeded)

        setupPageTabs(recipes, pagesNeeded, foodSearched)
    })
}


function setupPageTabs(recipes, pagesNeeded, foodSearched) {
    document.getElementById("firstPagerItem").style.visibility = "hidden"
    document.getElementById("prevPagerItem").style.visibility = "hidden"
    //document.getElementById("1").disabled = true // leave or remove?
    document.getElementById("1").style.color = "yellow"


    for (let pageNumber = pagesNeeded + 1; pageNumber <= 9; pageNumber++)
        document.getElementById(pageNumber.toString()).style.visibility = "hidden"

    if (pagesNeeded == 1) {
        document.getElementById("nextPagerItem").style.visibility = "hidden"
        document.getElementById("lastPagerItem").style.visibility = "hidden"
    }


    showRecipes(recipes, pagesNeeded, 1)

    for (let pageNumber = 2; pageNumber <= pagesNeeded; pageNumber++)
        linkPagerItems(recipes, pagesNeeded, pageNumber, foodSearched)

/*
    if (pagesNeeded === 1) {
        document.getElementById("firstPagerItem").style.visibility = "hidden"
        document.getElementById("firstPagerItem").style.cursor = "default"

        document.getElementById("prevPagerItem").style.visibility = "hidden"
        document.getElementById("prevPagerItem").style.cursor = "default"

        document.getElementById("ellipsis1").style.visibility = "hidden"

        document.getElementById("1").style.visibility = "hidden"
        document.getElementById("1").style.cursor = "default"

        document.getElementById("2").style.visibility = "hidden"
        document.getElementById("2").style.cursor = "default"

        document.getElementById("3").innerHTML = "1"
        document.getElementById("3").disabled = true

        document.getElementById("4").style.visibility = "hidden"
        document.getElementById("4").style.cursor = "default"

        document.getElementById("5").style.visibility = "hidden"
        document.getElementById("5").style.cursor = "default"

        document.getElementById("ellipsis2").style.visibility = "hidden"

        document.getElementById("nextPagerItem").style.visibility = "hidden"
        document.getElementById("nextPagerItem").style.cursor = "default"

        document.getElementById("lastPagerItem").style.visibility = "hidden"
        document.getElementById("lastPagerItem").style.visibility = "default"

        showRecipes(recipes, pagesNeeded, 1)
    }
    else if (pagesNeeded >= 2 && pagesNeeded <= 5) {
        document.getElementById("firstPagerItem").style.visibility = "hidden"
        document.getElementById("firstPagerItem").style.cursor = "default"

        document.getElementById("prevPagerItem").style.visibility = "hidden"
        document.getElementById("prevPagerItem").style.cursor = "default"

        document.getElementById("ellipsis1").style.visibility = "hidden"
        document.getElementById("1").disabled = true
        document.getElementById("ellipsis2").style.visibility = "hidden"

        // hides the pagerItems for the tabs we don't use
        if (5 - pagesNeeded > 0) {
            for (let i = pagesNeeded + 1; i <= 5; i++)
                document.getElementById(i).style.visibility = "hidden"
        }

        for (let i = 1; i <= pagesNeeded; i++)
            showRecipes(recipes, pagesNeeded, i)
    }
    else {
        document.getElementById("firstPagerItem").style.visibility = "hidden"
        document.getElementById("firstPagerItem").style.cursor = "default";

        document.getElementById("prevPagerItem").style.visibility = "hidden"
        document.getElementById("prevPagerItem").style.cursor = "default"

        document.getElementById("ellipsis1").style.visibility = "hidden"
        document.getElementById("1").disabled = true;

        for (let i = 1; i <= 5; i++)
            showRecipes(recipes, pagesNeeded, i);
    }
    */
}


function showRecipes(recipes, pagesNeeded, pageNumber) {
    var boxes = document.getElementsByClassName("myGridContainer")[0].children
    //console.log(boxes)

    for (let i = 0; i < recipes[pageNumber].length; i++) {
        //children[0] = div (the image of food shown)
        //children[1] = p (the title of food shown)

        // I'm retrieving the recipes' images this way because the image url provided for the recipes using the search query isn't useful in getting the images
        boxes[i].children[0].style.backgroundImage = "url(https://spoonacular.com/recipeImages/" + recipes[pageNumber][i][0] + "-556x370.jpg)"
        // some may not have images... take care of that

        boxes[i].children[0].style.maxHeight = "100%";
        boxes[i].children[0].style.maxWidth = "100%";
        boxes[i].children[0].style.objectFit = "cover";

        boxes[i].children[1].textContent = recipes[pageNumber][i][1]

        boxes[i].addEventListener("click", function() {
            infoPage(recipes[pageNumber][i]);
        });

        // When mouse if over block, show title
    }

    for (let i = recipes[pageNumber].length; i < 12; i++)
        boxes[i].style.visibility = "hidden"
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html" + "?id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",img=" + recipeInfo[2];
}


function linkPagerItems(recipes, pagesNeeded, pageNumber, foodSearched) {
    document.getElementById(pageNumber.toString()).addEventListener("click", function() {
        sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
        window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + pageNumber
    })
}


/*
function paginate(recipes, pagesNeeded, pageNumber) {
    window.location = "paginateThroughResults.html" + "?recipes=" + recipes[pageNumber] + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + pageNumber
    //console.log(recipes[pageNumber])
}
*/






const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})

getRecipes(searchParams[0])
