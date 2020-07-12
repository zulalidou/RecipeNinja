const r = document.getElementById("result")

new URLSearchParams(window.location.search).forEach((value, name) => {
    r.append(`${name} = ${value}`)
    r.append(document.createElement("br"))
})
