$(document).ready(function() {
    setupNavBarEvents("hamburgerIcon", "hamburgerMenu")
    setupNavBarEvents("mealTypes-down-arrow", "mealTypes-submenu")
    setupNavBarEvents("cuisines-down-arrow", "cuisines-submenu")
    setupNavBarEvents("americanFoods-down-arrow", "americanFoods-submenu")
    setupNavBarEvents("europeanFoods-down-arrow", "europeanFoods-submenu")
})

function setupNavBarEvents(buttonName, className) {
    const toggleButton = document.getElementById(buttonName)
    const container = document.getElementById(className)

    console.log(toggleButton)
    console.log(container)

    toggleButton.addEventListener("click", () => {
        if (container.style.display === "none" || container.style.display === "") {
            container.style.display = "block"

            if (buttonName === "hamburgerIcon")
                toggleButton.src = "/images/close.png"
            else
                toggleButton.src = "/images/up-arrow.png"

            console.log(button)
        }
        else {
            container.style.display = "none"

            if (buttonName === "hamburgerIcon")
                toggleButton.src = "/images/hamburger.png"
            else
                toggleButton.src = "/images/down-arrow.png"

            console.log(button)
        }
    })
}
