function setupPageTabs(recipes, pageNumber, pagesNeeded) {
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




    /*
    for (let i = 1; i <= pagesNeeded; i++) {
        //document.getElementById(i.toString()).style.visibility = "visible"

        if (i == pageNumber) {
            document.getElementById(i.toString()).disabled = true;
            document.getElementById(i.toString()).style.color = "white";
            document.getElementById(i.toString()).style.backgroundColor = "dodgerblue";
        }
        else {
            document.getElementById(i.toString()).disabled = false;
            document.getElementById(i.toString()).style.color = "black";
            document.getElementById(i.toString()).style.backgroundColor = "white";
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
    */
}


function showRecipes(recipes, pageNumber, pagesNeeded) {
    var boxes = document.getElementsByClassName("myGridContainer")[0].children
    console.log(recipes)

    /*
    for (let i = 0; i < 12; i++)
        boxes[i].style.visibility = "visible"
    */

    for (let i = 0; i < recipes.length; i++) {
        //children[0] = div (the image of food shown)
        //children[1] = p (the title of food shown)

        // I'm retrieving the recipes' images this way because the image url provided for the recipes using the search query isn't useful in getting the images
        boxes[i].children[0].children[0].src = "https://spoonacular.com/recipeImages/" + recipes[i][0] + "-556x370.jpg"
        // some may not have images... take care of that

        boxes[i].children[0].style.maxHeight = "100%";
        boxes[i].children[0].style.maxWidth = "100%";
        boxes[i].children[0].style.objectFit = "cover";

        boxes[i].children[1].children[0].textContent = recipes[i][1]
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
    window.location = "infoPage.html" + "?id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",https://spoonacular.com/recipeImages/" + recipeInfo[0] + "-556x370.jpg"
}


function linkPagerItems(foodSearched, currentPage, pagesNeeded) {
    if (document.getElementById("firstPagerItem") !== null) {
        document.getElementById("firstPagerItem").addEventListener("click", function() {
            window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + 1
        })
    }

    if (document.getElementById("prevPagerItem") !== null) {
        if (currentPage - 1 >= 1) {
            document.getElementById("prevPagerItem").addEventListener("click", function() {
                window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + (currentPage - 1)
            })
        }
    }

    for (let i = 1; i <= pagesNeeded; i++) {
        if (i == currentPage) continue

        document.getElementById(i.toString()).addEventListener("click", function() {
            window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + i
        })
    }

    if (document.getElementById("nextPagerItem") !== null) {
        if (parseInt(currentPage) + 1 <= pagesNeeded) {
            document.getElementById("nextPagerItem").addEventListener("click", function() {
                window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + (currentPage + 1)
            })
        }
    }

    if (document.getElementById("lastPagerItem") !== null) {
        document.getElementById("lastPagerItem").addEventListener("click", function() {
            window.location = "paginateThroughResults.html" + "?foodSearched=" + foodSearched + ",pagesNeeded=" + pagesNeeded + ",pageNumber=" + pagesNeeded
        })
    }
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


setupPageTabs(recipes, parseInt(pageNumber), parseInt(pagesNeeded))
showRecipes(recipes, parseInt(pageNumber), parseInt(pagesNeeded))
linkPagerItems(foodSearched, parseInt(pageNumber), parseInt(pagesNeeded))

//console.log(JSON.parse(sessionStorage.getItem(foodSearched))[pageNumber])
