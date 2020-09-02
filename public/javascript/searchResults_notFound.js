function displayMessage(foodSearched) {
    document.getElementById("searchResultsTag").innerHTML = "No results found for \"" + foodSearched.bold() + "\""

    // const searchErrorContainer = document.createElement("div")
    // searchErrorContainer.style.backgroundColor = "white"
    // searchErrorContainer.style.width = "1000px"
    // searchErrorContainer.style.margin = "auto"
    //
    // const header = document.createElement("h2")
    // const headerText = document.createTextNode("Please try again using these search tips")
    // header.appendChild(headerText)
    //
    // const p1 = document.createElement("p")
    // const p1Text = document.createTextNode("> Make sure your spelling is correct") //&raquo;
    // p1.appendChild(p1Text)
    //
    // const p2 = document.createElement("p")
    // const p2Text = document.createTextNode("> Try more general words")
    // p2.appendChild(p2Text)
    //
    // const p3 = document.createElement("p")
    // const p3Text = document.createTextNode("> Try fewer keywords")
    // p3.appendChild(p3Text)
    //
    // searchErrorContainer.appendChild(header)
    // searchErrorContainer.appendChild(p1)
    // searchErrorContainer.appendChild(p2)
    // searchErrorContainer.appendChild(p3)
    // document.getElementById("errorMsgContainer").appendChild(searchErrorContainer)
}




function navBarStuff() {
    setupSearchMenu("magnifyingglassIcon", "magnifyingglassMenu")

    setupNavBarEvents("hamburgerIcon-container", "hamburgerIcon", "hamburgerMenu")
    setupNavBarEvents("hamburgerMenu-subcategory1-item1", "hamburgerMenu-subcategory1-item1-arrow", "mealTypes-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory1-item2", "hamburgerMenu-subcategory1-item2-arrow", "cuisines-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory2-item1", "americanFoods-down-arrow", "americanFoods-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory2-item2", "europeanFoods-down-arrow", "europeanFoods-submenu")
}

function setupSearchMenu(buttonName, containerName) {
    const toggleButton = document.getElementById(buttonName)
    const container = document.getElementById(containerName)

    toggleButton.addEventListener("click", () => {
        document.getElementById("hamburgerMenu").style.display = "none"
        document.getElementById("hamburgerIcon").src = "/images/hamburger.png"

        let buttonURL = toggleButton.src.substr(toggleButton.src.lastIndexOf("/") + 1)

        if (buttonURL === "magnifyingglass_big.png") toggleButton.src = "/images/close.png"
        else toggleButton.src = "/images/magnifyingglass_big.png"

        $("#"+containerName).slideToggle()
    })
}

function setupNavBarEvents(anchorTagName, imgTagName, containerName) {
    const toggleButton = document.getElementById(anchorTagName)
    const arrowImg_container = document.getElementById(imgTagName)
    const container = document.getElementById(containerName)


    toggleButton.addEventListener("click", () => {
        // closes the "magnifyingglass" menu (in case it's open when we try to open the hamburger menu)
        document.getElementById("magnifyingglassMenu").style.display = "none"
        document.getElementById("magnifyingglassIcon").src = "/images/magnifyingglass_big.png"

        let arrowURL = arrowImg_container.src.substr(arrowImg_container.src.lastIndexOf("/") + 1)

        if (arrowURL === "hamburger.png") arrowImg_container.src = "/images/close.png"
        else if (arrowURL === "close.png") arrowImg_container.src = "/images/hamburger.png"
        else if (arrowURL === "up-arrow.png") arrowImg_container.src = "/images/down-arrow.png"
        else arrowImg_container.src = "/images/up-arrow.png"

        if (containerName === "hamburgerMenu")
            $("#"+containerName).toggle("slide")
        else
            $("#"+containerName).slideToggle()
    })
}




const searchParams = []

new URLSearchParams(window.location.search).forEach((value, name) => {
    searchParams.push(`${value}`)
    searchParams.push(`${name}`)
})


displayMessage(searchParams[0])

navBarStuff()
