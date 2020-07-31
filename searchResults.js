function getRecipes(foodSearched, firstSearch) {
    if (sessionStorage.getItem(foodSearched) !== null)
        return

    $.ajaxSetup({
    async: false
    });

    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        //console.log(data)
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

            //console.log(recipes)
            //console.log("pagesNeeded = " + pagesNeeded)

            recipes["totalResults"] = totalResults
            recipes["pagesNeeded"] = pagesNeeded

            //if (sessionStorage.getItem(foodSearched) === null) {
            sessionStorage.setItem(foodSearched, JSON.stringify(recipes))
            //console.log(sessionStorage.getItem(foodSearched))
            //}
        }
    })

    $.ajaxSetup({
    async: true
    });
}


function setupPageTabs(pageNumber, pagesNeeded) {
    if (pageNumber > 1) {
        let pagerItem = document.createElement('a')
        pagerItem.setAttribute("id", "firstPagerItem")
        pagerItem.style.padding = "10px 16px"
        pagerItem.style.cursor = "pointer"

        let text = document.createTextNode(he.decode("&laquo;")) // adds "<<""
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
        pagerItem.setAttribute("id", "prevPagerItem")
        pagerItem.style.padding = "10px 16px"
        pagerItem.style.cursor = "pointer"

        text = document.createTextNode(he.decode("&lsaquo;")) // adds "<"
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


    for (let i = 1; i <= pagesNeeded; i++) {
        const pagerItem = document.createElement('a')
        pagerItem.setAttribute("id", i.toString())
        pagerItem.style.padding = "10px 16px"
        pagerItem.style.cursor = "pointer"

        const text = document.createTextNode(i.toString())
        pagerItem.appendChild(text)
        document.getElementById("innerPaginationBlock").appendChild(pagerItem)

        if (i == pageNumber) {
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

    if (pageNumber < pagesNeeded) {
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
}


function showRecipes(foodSearched, recipes, totalResults, pageNumber) {
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


function linkPagerItems(foodSearched, recipes, pageNumber, pagesNeeded) {
    if (document.getElementById("firstPagerItem") !== null) {
        document.getElementById("firstPagerItem").addEventListener("click", function() {
            window.location = "searchResults.html?foodSearched=" + foodSearched + ",pageNumber=" + 1
        })
    }

    if (document.getElementById("prevPagerItem") !== null) {
        if (pageNumber - 1 >= 1) {
            document.getElementById("prevPagerItem").addEventListener("click", function() {
                window.location = "searchResults.html?foodSearched=" + foodSearched + ",pageNumber=" + (pageNumber - 1)
            })
        }
    }


    for (let i = 1; i <= pagesNeeded; i++) {
        if (i == pageNumber)
            continue

        document.getElementById(i.toString()).addEventListener("click", function() {
            window.location = "searchResults.html?foodSearched=" + foodSearched + ",pageNumber=" + i
        })
    }


    if (document.getElementById("nextPagerItem") !== null) {
        if (pageNumber + 1 <= pagesNeeded) {
            document.getElementById("nextPagerItem").addEventListener("click", function() {
                window.location = "searchResults.html?foodSearched=" + foodSearched + ",pageNumber=" + (pageNumber + 1)
            })
        }
    }

    if (document.getElementById("lastPagerItem") !== null) {
        document.getElementById("lastPagerItem").addEventListener("click", function() {
            window.location = "searchResults.html?foodSearched=" + foodSearched + ",pageNumber=" + pagesNeeded
        })
    }
}




/*
const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})
*/

let parameters = window.location.search.replace(/\%20/g, ""); //It takes everything in the query string up to the 1st '=', and replaces them with ''
parameters = parameters.split(",")

const firstSearch = (parameters.length == 1) ? true : false
const foodSearched = parameters[0].substring(parameters[0].indexOf("=") + 1)
//const pagesNeeded = (parameters.length > 1) ? parameters[1].substring(parameters[1].indexOf("=") + 1) : -1
const pageNumber = (parameters.length > 1) ? parseInt(parameters[1].substring(parameters[1].indexOf("=") + 1)) : 1


getRecipes(foodSearched, firstSearch)
const allRecipesFound = JSON.parse(sessionStorage.getItem(foodSearched))
console.log(allRecipesFound)
console.log(allRecipesFound["pagesNeeded"])

setupPageTabs(pageNumber, allRecipesFound["pagesNeeded"])
showRecipes(foodSearched, allRecipesFound, allRecipesFound["totalResults"], pageNumber)
linkPagerItems(foodSearched, allRecipesFound, pageNumber, allRecipesFound["pagesNeeded"])

//console.log(searchParams)
console.log(pageNumber)
console.log(typeof pageNumber)
