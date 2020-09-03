function setupSearchMenu(buttonName, containerName) {
    const toggleButton = document.getElementById(buttonName)
    const container = document.getElementById(containerName)

    toggleButton.addEventListener("click", () => {
        // closes the "hamburger" menu (in case it's open when we try to open the search menu)
        document.getElementById("hamburgerMenu").style.display = "none"
        document.getElementById("hamburgerIcon").src = "/images/hamburger.png"

        let buttonURL = toggleButton.src.substr(toggleButton.src.lastIndexOf("/") + 1)

        if (buttonURL === "magnifyingglass_big.png")
            toggleButton.src = "/images/close.png"
        else
            toggleButton.src = "/images/magnifyingglass_big.png"

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

        if (arrowURL === "hamburger.png")
            arrowImg_container.src = "/images/close.png"
        else if (arrowURL === "close.png")
            arrowImg_container.src = "/images/hamburger.png"
        else if (arrowURL === "up-arrow.png")
            arrowImg_container.src = "/images/down-arrow.png"
        else
            arrowImg_container.src = "/images/up-arrow.png"

        if (containerName === "hamburgerMenu")
            $("#"+containerName).toggle("slide")
        else
            $("#"+containerName).slideToggle()
    })
}


$(document).ready(function() {
    setupSearchMenu("magnifyingglassIcon", "magnifyingglassMenu")
    setupNavBarEvents("hamburgerIcon-container", "hamburgerIcon", "hamburgerMenu")
    setupNavBarEvents("hamburgerMenu-subcategory1-item1", "hamburgerMenu-subcategory1-item1-arrow", "mealTypes-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory1-item2", "hamburgerMenu-subcategory1-item2-arrow", "cuisines-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory2-item1", "americanFoods-down-arrow", "americanFoods-submenu")
    setupNavBarEvents("hamburgerMenu-subcategory2-item2", "europeanFoods-down-arrow", "europeanFoods-submenu")
})
