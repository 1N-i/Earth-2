import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

let humans = []
let humanIdx = 0
let percentageIsShowing = false

const btnYellow = document.getElementById("btn-yellow")
const btnGreen = document.getElementById("btn-green")
const btnRed = document.getElementById("btn-red")
const photo = document.getElementById("character")
const info = document.getElementById("info")
const percentage = document.getElementById("percentages")
const greenPercentage = document.getElementById("percentage-green")

// Search the characters
async function fetchCandidates() {
    const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('id', { ascending: true })

    if (error) {
        console.error("Erro ao buscar candidatos:", error)
        return
    }

    if (data && data.length > 0) {
        humans = data
        updateInfo() // Exibe o primeiro personagem após carregar
    }
}

// Update the info on screen
function updateInfo() {
    if (humans.length === 0) return

    const human = humans[humanIdx]

    photo.style.visibility = "visible"    
    info.style.visibility = "visible"
    percentage.style.visibility = "hidden"

    const prosList = Array.isArray(human.pros) ? human.pros : (typeof human.pros === 'string' ? JSON.parse(human.pros) : ["Sem prós cadastrados", ""])
    const consList = Array.isArray(human.cons) ? human.cons : (typeof human.cons === 'string' ? JSON.parse(human.cons) : ["Sem contras cadastrados", ""])

    photo.innerHTML = `<img src="${human.img || ''}" alt="Candidato">`

    info.innerHTML = `
        <h1>${human.name || 'Sem Nome'}</h1>
        <h3>${human.age || 0} anos • ${human.job || 'Profissão não informada'}</h3>
        <h4>PRÓS</h4>
        <ul>
            <li>✔ ${prosList[0] || ''}</li>
            <li>✔ ${prosList[1] || ''}</li>
        </ul>
        <h4>CONTRAS</h4>
        <ul>
            <li>✖ ${consList[0] || ''}</li>
            <li>✖ ${consList[1] || ''}</li>
        </ul>
    `
}

// Calls the next character
btnYellow.addEventListener("click", () => {
    if (percentageIsShowing) {
        percentageIsShowing = false
        percentage.style.visibility = "hidden"
        
        humanIdx = (humanIdx + 1) % humans.length
        updateInfo()
    }
})

// Send human to Earth 2
btnGreen.addEventListener("click", async () => {
    if (!percentageIsShowing) {
        await handleVote("green")
    }
})

// Defeat human
btnRed.addEventListener("click", async () => {
    if (!percentageIsShowing) {
        await handleVote("red")
    }
})

//Compute vote
async function handleVote(buttonType) {
    const currentHuman = humans[humanIdx]
    const candidateId = currentHuman.id ?? humanIdx + 1

    const voteColumn = buttonType === "green" ? "vote_green" : "vote_red"

    try {
        const { error: rpcError } = await supabase.rpc('vote_candidate', { 
            candidate_id: candidateId, 
            vote_type: buttonType 
        })

        if (rpcError) {
            console.warn("RPC não encontrada ou com erro, tentando update direto...", rpcError)
            
            const currentVotes = currentHuman[voteColumn] || 0
            await supabase
                .from('candidates')
                .update({ [voteColumn]: currentVotes + 1 })
                .eq('id', candidateId)
        }

        const { data, error } = await supabase
            .from('candidates')
            .select('vote_green, vote_red')
            .eq('id', candidateId)
            .single()

        if (!error && data) {
            const total = (data.vote_green || 0) + (data.vote_red || 0)
            const percentageGreenVal = total > 0 ? Math.round(((data.vote_green || 0) / total) * 100) : 50
            const percentageRedVal = 100 - percentageGreenVal
            
            greenPercentage.style.width = `${percentageGreenVal}%`
            document.getElementById("val-green").innerText = `${percentageGreenVal}%`
            document.getElementById("val-red").innerText = `${percentageRedVal}%`

            currentHuman.vote_green = data.vote_green
            currentHuman.vote_red = data.vote_red
        }

        info.style.visibility = "hidden"
        photo.style.visibility = "hidden"
        percentage.style.visibility = "visible"
        percentageIsShowing = true

    } catch (err) {
        console.error("Erro ao registrar voto:", err)
    }
}

fetchCandidates()
