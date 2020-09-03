function displayMessage(foodSearched) {
    document.getElementById("searchResultsTag").innerHTML = "No results found for \"" + foodSearched.bold() + "\""
}


$(function() {
    const searchParams = []

    new URLSearchParams(window.location.search).forEach((value, name) => {
        searchParams.push(`${value}`)
        searchParams.push(`${name}`)
    })

    displayMessage(searchParams[0])
})
