function displayMessage(foodSearched) {
    document.getElementById("searchResultsTag").innerHTML = "No results found for \"" + foodSearched.bold() + "\""

    const searchErrorContainer = document.createElement("div")
    searchErrorContainer.style.backgroundColor = "white"
    searchErrorContainer.style.width = "1000px"
    searchErrorContainer.style.margin = "auto"

    const header = document.createElement("h2")
    const headerText = document.createTextNode("Please try again using these search tips")
    header.appendChild(headerText)

    const p1 = document.createElement("p")
    const p1Text = document.createTextNode(he.decode("&raquo;") + " Make sure your spelling is correct")
    p1.appendChild(p1Text)

    const p2 = document.createElement("p")
    const p2Text = document.createTextNode(he.decode("&raquo;") + " Try more general words")
    p2.appendChild(p2Text)

    const p3 = document.createElement("p")
    const p3Text = document.createTextNode(he.decode("&raquo;") + " Try fewer keywords")
    p3.appendChild(p3Text)

    searchErrorContainer.appendChild(header)
    searchErrorContainer.appendChild(p1)
    searchErrorContainer.appendChild(p2)
    searchErrorContainer.appendChild(p3)
    document.querySelector(".myGridContainer").appendChild(searchErrorContainer)
}




const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})


displayMessage(searchParams[0])
