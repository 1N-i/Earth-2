import { createClient } from '@supabase/supabase-js'

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

// 1. Buscar os candidatos do Supabase ao iniciar o jogo
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

// 2. Atualizar as informações na tela
function updateInfo() {
    if (humans.length === 0) return

    const human = humans[humanIdx]

    photo.style.visibility = "visible"    
    info.style.visibility = "visible"
    percentage.style.visibility = "hidden"

    // Supondo que no banco as colunas sejam: img, name, age, job, pros (array), cons (array)
    photo.innerHTML = `<img src="${human.img}">`

    info.innerHTML = `
        <h1>${human.name}</h1>
        <h3>${human.age} years • ${human.job}</h3>
        <h4>PROS</h4>
        <ul>
            <li>✔ ${human.pros[0]}</li>
            <li>✔ ${human.pros[1]}</li>
        </ul>
        <h4>CONS</h4>
        <ul>
            <li>✖ ${human.cons[0]}</li>
            <li>✖ ${human.cons[1]}</li>
        </ul>
    `
}

// Botão Amarelo: Vai para o próximo personagem ou fecha a tela de porcentagem
btnYellow.addEventListener("click", () => {
    if (percentageIsShowing) {
        percentageIsShowing = false
        percentage.style.visibility = "hidden"
        
        // Avança para o próximo índice antes de atualizar a UI
        humanIdx = (humanIdx + 1) % humans.length
        updateInfo()
    }
})

// Botão Verde (Terra 2 / Aprovar)
btnGreen.addEventListener("click", async () => {
    if (!percentageIsShowing) {
        await handleVote("green")
    }
})

// Botão Vermelho (Eliminar / Morrer)
btnRed.addEventListener("click", async () => {
    if (!percentageIsShowing) {
        await handleVote("red")
    }
})

// 3. Função para computar o voto e buscar a porcentagem real atualizada
async function handleVote(buttonType) {
    const currentHuman = humans[humanIdx]
    // Identificador único do candidato no banco (pode ser o ID gerado pelo banco ou o índice)
    const candidateId = currentHuman.id ?? humanIdx + 1

    // Mapeia o tipo de voto para a coluna/parâmetro correspondente
    const voteColumn = buttonType === "green" ? "vote_green" : "vote_red"

    try {
        // Se estiver usando a RPC do Supabase criada no banco
        const { error: rpcError } = await supabase.rpc('vote_candidate', { 
            candidate_id: candidateId, 
            vote_type: buttonType 
        })

        if (rpcError) {
            console.warn("RPC não encontrada ou com erro, tentando update direto...", rpcError)
            
            // Fallback de incremento direto caso a RPC não exista
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
            
            greenPercentage.style.width = `${percentageGreenVal}%`

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

// Inicializa o app buscando os dados do Supabase
fetchCandidates()