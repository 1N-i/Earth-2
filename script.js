const humans = [
    {
        "img": "human-image/human1.png",
        "name": "HELENA VANCE",
        "age": 34,
        "job": "Agricultural Engineer",
        "pros": ["Mastered the purification of radioactive soil", "Calm demeanor in crisis situations"],
        "cons": ["Infertile", "Refuses to work in a team"]
    },
    {
        "img": "human-image/human2.png",
        "name": "CHARLES LINCE",
        "age": 39,
        "job": "Surgeon",
        "pros": ["Rich", "Works well under pressure"],
        "cons": ["Huge narcissist", "Don't agree with critics"]
    }
]

let humanIdx = 0
const btnYellow = document.getElementById("btn-yellow")
btnYellow.addEventListener("click", () => {
    if (percentageIsShowing) {
        updateInfo(humanIdx)
        percentageIsShowing = false
        percentage.style.visibility = "hidden"
    }
})

const photo = document.getElementById("character")
photo.style.visibility = "hidden"
const info = document.getElementById("info")
info.style.visibility = "hidden"

function updateInfo(hIdx) {
    const human = humans[hIdx]

    photo.style.visibility = "visible"    
    info.style.visibility = "visible"

    photo.innerHTML = `<img src="${human["img"]}">`

    info.innerHTML = ""
    info.innerHTML += `<h1>${human["name"]}</h1>`
    info.innerHTML += `<h3>${human["age"]} years • ${human["job"]}</h3>`

    info.innerHTML += "<h4>PROS</h4>"
    info.innerHTML += "<ul>"
    info.innerHTML += `    <li>✔ ${human["pros"][0]}</li>`
    info.innerHTML += `    <li>✔ ${human["pros"][1]}</li>`
    info.innerHTML += "</ul>"

    info.innerHTML += "<h4>CONS</h4>"
    info.innerHTML += "<ul>"
    info.innerHTML += `    <li>✖ ${human["cons"][0]}</li>`
    info.innerHTML += `    <li>✖ ${human["cons"][1]}</li>`
    info.innerHTML += "</ul>"

    humanIdx += 1
    if (humanIdx === humans.length) {
        humanIdx = 0
    }
}


let percentageIsShowing = true
const btnGreen = document.getElementById("btn-green")
btnGreen.addEventListener("click", () => {
    if (!percentageIsShowing) {
        showPercentage("green")
    }
})

const btnRed = document.getElementById("btn-red")
btnRed.addEventListener("click", () => {
    if (!percentageIsShowing) {
        showPercentage("red")
    }
})


const percentage = document.getElementById("percentages")
const greenPercentage = document.getElementById("percentage-green")
percentage.style.visibility = "hidden"

function showPercentage(button) {
    const num = 75
    if (!percentageIsShowing) {
        if (button === "green") {
            //Adds value for saving that human
        }
        if (button === "red") {
            //Adds value for 'defeating' that human
        }
        info.style.visibility = "hidden"
        photo.style.visibility = "hidden"
        percentage.style.visibility = "visible"
        greenPercentage.style.width = `${num}%`

    } else {
        percentage.style.visibility = "hidden"
    }

    percentageIsShowing = !percentageIsShowing
}