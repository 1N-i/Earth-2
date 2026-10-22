let humanIdx = 0
const humans = [
    {
        "name": "HELENA VANCE",
        "age": 34,
        "job": "Agricultural Engineer",
        "pros": ["Mastered the purification of radioactive soil", "Calm demeanor in crisis situations"],
        "cons": ["Infertile", "Refuses to work in a team"]
    },
    {
        "name": "CHARLES LINCE",
        "age": 39,
        "job": "Surgeon",
        "pros": ["Rich", "Works well under pressure"],
        "cons": ["Huge narcissist", "Don't agree with critics"]
    }
]
const info = document.getElementById("info")

const btnYellow = document.getElementById("btn-yellow")
btnYellow.addEventListener("click", () => {
    updateInfo(humanIdx);
})

function updateInfo(hIdx) {
    const human = humans[hIdx]
    info.innerHTML = ""
    info.innerHTML += `<h1>${human["name"]}</h1>`
    info.innerHTML += `<h3>${human["age"]} years • ${human["job"]}</h3>`

    info.innerHTML += "<h4>PROS</h4>"
    info.innerHTML += "<ul>"
    info.innerHTML += ` <li>✔ ${human["pros"][0]}</li>`
    info.innerHTML += ` <li>✔ ${human["pros"][1]}</li>`
    info.innerHTML += "</ul>"

    info.innerHTML += "<h4>CONS</h4>"
    info.innerHTML += "<ul>"
    info.innerHTML += ` <li>✖ ${human["cons"][0]}</li>`
    info.innerHTML += ` <li>✖ ${human["cons"][1]}</li>`
    info.innerHTML += "</ul>"

    humanIdx += 1
    if (humanIdx === humans.length) {
        humanIdx = 0
    }
}