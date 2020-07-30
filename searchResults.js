function getRecipes(foodSearched) {
    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        console.log(data)
        const totalResults = (data.number <= data.results.length) ? data.number : data.results.length
        const pagesNeeded = Math.ceil(totalResults / 12)
        let recipes = Object()

        let pageNumber = 1
        let pageRecipes = []

        if (totalResults == 0) {
            console.log("No search results found")
            noResultsFoundPage(foodSearched)
        }
        else {
            console.log("totalResults = " + totalResults)
            console.log("pagesNeeded = " + pagesNeeded)

            for (let i = 0; i < data.results.length; i++) {
                // i can probably drop image now (the 3rd entry in the array below) since i don't use it anywhere in this program for the time being
                // I'm making an arr

                const recipeInfo = [data.results[i].id, [data.results[i].title], "https://spoonacular.com/recipeImages/" + data.results[i].id + "-556x370.jpg"]
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

            if (sessionStorage.getItem(foodSearched) === null) {
                sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
                console.log(sessionStorage.getItem(foodSearched))
            }

            setupPageTabs(recipes, pagesNeeded, foodSearched)
            showRecipes(recipes, totalResults, foodSearched, pagesNeeded, 1)
            linkPagerItems(recipes, pagesNeeded, foodSearched)
        }
    })
}


function setupPageTabs(recipes, pagesNeeded, foodSearched) {
    /*
    document.getElementById("firstPagerItem").style.visibility = "hidden"
    document.getElementById("prevPagerItem").style.visibility = "hidden"
    document.getElementById("1").style.color = "white"
    document.getElementById("1").style.backgroundColor = "dodgerblue"
    */

    for (let i = 1; i <= pagesNeeded; i++) {
        const pagerItem = document.createElement('a')
        pagerItem.setAttribute("id", i.toString())
        pagerItem.style.padding = "10px 16px"
        pagerItem.style.cursor = "pointer"

        const text = document.createTextNode(i.toString())
        pagerItem.append(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        if (i === 1) {
            document.getElementById("1").disabled = true // leave or remove?
            pagerItem.style.color = "white";
            pagerItem.style.backgroundColor = "dodgerblue";
        }
        else {
            pagerItem.style.color = "black";
            pagerItem.style.backgroundColor = "white";

            $(document.getElementById(i.toString())).hover(function(){
                // when you're hovering over this pager item
                $(this).css("color", "white")
                $(this).css("background-color", "dodgerblue")
              }, function(){
                  // when you're NOT hovering over this pager item
                 $(this).css("color", "black")
                 $(this).css("background-color", "white")
            });
        }
    }

    if (pagesNeeded > 1) {
        let pagerItem = document.createElement('a')
        pagerItem.setAttribute("id", "nextPagerItem")
        pagerItem.style.padding = "10px 16px"
        pagerItem.style.cursor = "pointer"

        let text = document.createTextNode(he.decode("&rsaquo;")) // adds ">"
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        $(pagerItem).hover(function(){
            // when you're hovering over this pager item
            $(this).css("color", "white")
            $(this).css("background-color", "dodgerblue")
          }, function(){
              // when you're NOT hovering over this pager item
             $(this).css("color", "black")
             $(this).css("background-color", "white")
        });

        pagerItem = document.createElement('a')
        pagerItem.setAttribute("id", "lastPagerItem")
        pagerItem.style.padding = "10px 16px"
        pagerItem.style.cursor = "pointer"

        text = document.createTextNode(he.decode("&raquo;")) // adds ">>""
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        $(pagerItem).hover(function(){
            // when you're hovering over this pager item
            $(this).css("color", "white")
            $(this).css("background-color", "dodgerblue")
          }, function(){
              // when you're NOT hovering over this pager item
             $(this).css("color", "black")
             $(this).css("background-color", "white")
        });
    }





    /*
    for (let i = 2; i <= pagesNeeded; i++) {
        $(document.getElementById(i.toString())).hover(function(){
            // when you're hovering over this pager item
            $(this).css("color", "white")
            $(this).css("background-color", "dodgerblue")
          }, function(){
              // when you're NOT hovering over this pager item
             $(this).css("color", "black")
             $(this).css("background-color", "white")
        });
    }

    for (let pageNumber = pagesNeeded + 1; pageNumber <= 9; pageNumber++) {
        $("#" + pageNumber.toString()).remove()
    }

    if (pagesNeeded == 1) {
        $("#firstPagerItem").remove()
        $("#prevPagerItem").remove()
        $("#nextPagerItem").remove()
        $("#lastPagerItem").remove()
    }
    */
}


function showRecipes(recipes, totalResults, foodSearched, pagesNeeded, pageNumber) {
    const limit = (totalResults <= 12) ? totalResults : 12

    document.getElementById("searchResultsTag").innerHTML = "Showing 1 - " + limit + " of " + totalResults.toString().bold() + " results for " + foodSearched.bold()
    var boxes = document.getElementsByClassName("myGridContainer")[0].children

    for (let i = 0; i < recipes[pageNumber].length; i++) {
        //children[0] = div (the image of food shown)
        //children[1] = p (the title of food shown)

        // I'm retrieving the recipes' images this way because the image url provided for the recipes using the search query isn't useful in getting the images
        boxes[i].children[0].children[0].src = recipes[pageNumber][i][2]
        // some may not have images... take care of that

        boxes[i].children[0].style.maxHeight = "100%";
        boxes[i].children[0].style.maxWidth = "100%";
        boxes[i].children[0].style.objectFit = "cover";

        boxes[i].children[1].children[0].textContent = recipes[pageNumber][i][1]

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

function noResultsFoundPage(foodSearched) {
    window.location = "searchResults_notFound.html" + "?foodSearched=" + foodSearched
}



function linkPagerItems(recipes, pagesNeeded, foodSearched) {
    for (let i = 2; i <= pagesNeeded; i++) {
        document.getElementById(i.toString()).addEventListener("click", function() {
            window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + i
        })
    }

    document.getElementById("nextPagerItem").addEventListener("click", function() {
        window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + 2
    })

    document.getElementById("lastPagerItem").addEventListener("click", function() {
        window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + pagesNeeded
    })
}





const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})

getRecipes(searchParams[0])
