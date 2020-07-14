function getRecipes(foodSearched) {
    const url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"

    $.getJSON(url, function(data) {
        const totalResults = (data.number <= data.totalResults) ? data.number : data.totalResults
        const pagesNeeded = Math.round(totalResults / 12)
        let recipes = Object()

        /*
        console.log("foodSearched = " + foodSearched)
        console.log("totalResults = " + totalResults)
        console.log("pagesNeeded = " + pagesNeeded)
        */

        let pageNumber = 1

        let pageRecipes = []
        for (let i = 0; i < totalResults; i++) {
            const recipeInfo = [data.results[i].id, data.results[i].title, data.results[i].image]
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

        setupPageTabs(pagesNeeded)
        showRecipes(pagesNeeded, recipes)
    })
}


function setupPageTabs(pagesNeeded) {
    console.log("pagesNeeded = " + pagesNeeded)

    if (pagesNeeded === 1) {
        let prev = document.getElementById("prevPagerItem")
        prev.style.visibility = "hidden"

        let first = document.getElementById("firstPagerItem")
        first.style.visibility = "hidden"

        let e1 = document.getElementById("ellipsis1")
        e1.style.visibility = "hidden"

        let one = document.getElementById("1")
        one.style.visibility = "hidden"

        let two = document.getElementById("2")
        two.style.visibility = "hidden"

        document.getElementById("3").innerHTML = "1"

        let four = document.getElementById("4")
        four.style.visibility = "hidden"

        let five = document.getElementById("5")
        five.style.visibility = "hidden"

        let e2 = document.getElementById("ellipsis2")
        e2.style.visibility = "hidden"

        let last = document.getElementById("lastPagerItem")
        last.style.visibility = "hidden"

        let next = document.getElementById("nextPagerItem")
        next.style.visibility = "hidden"

        /*
        const li = document.createElement('li')
        const text = document.createTextNode("1");
        li.appendChild(text)
        document.getElementById("x").appendChild(ingredientBlock);
        */
    }
    else if (pagesNeeded >= 2 && pagesNeeded <= 5) {
        let prev = document.getElementById("prevPagerItem")
        prev.style.visibility = "hidden"

        let first = document.getElementById("firstPagerItem")
        first.style.visibility = "hidden"

        let e1 = document.getElementById("ellipsis1")
        e1.style.visibility = "hidden"

        let e2 = document.getElementById("ellipsis2")
        e2.style.visibility = "hidden"
    }
    else {
        let prev = document.getElementById("prevPagerItem")
        prev.style.visibility = "hidden"

        let first = document.getElementById("firstPagerItem")
        first.style.visibility = "hidden"

        let e1 = document.getElementById("ellipsis1")
        e1.style.visibility = "hidden"
    }
}


function showRecipes(pagesNeeded, recipes) {
    recipesToDisplay = recipes[1]

    for (let i = 0; i < recipesToDisplay.length; i++) {
        
    }
}


const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})

getRecipes(searchParams[0])
