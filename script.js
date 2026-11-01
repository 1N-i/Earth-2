import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://yqltjicmgimefadpburv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbHRqaWNtZ2ltZWZhZHBidXJ2Iiwicm9sZSI6InlxbHRqaWNtZ2ltZWZhZHBidXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3OTk1MzgsImV4cCI6MjEwODM3NTUzOH0.uIFvKeX66kWUvVVl3d_YDH0EuxYInzleluOek1JxYaI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

let humans = []
let humanIdx = 0
let percentageIsShowing = false
let currentLang = 'pt' 
let savedCount = 0 // Contador de quantos humanos foram salvos para a Terra 2
const MAX_SAVED = 6 // Limite máximo de salvamentos permitidos

// Textos do sistema bilíngue com a explicação detalhada dos botões
const texts = {
    pt: {
        story: `👽 <strong>Atenção Humano!</strong><br>
        Sua espécie foi abduzida. Nós, os Observadores Estelares, exigimos que você analise estes espécimes.<br><br>
        Você tem direito a salvar no máximo <strong>6 humanos</strong> para a nova Terra 2.<br><br>
        <strong>Como jogar:</strong><br>
        🌍 <strong>Terra 2:</strong> Envia o humano selecionado (conta como uma das 6 vagas).<br>
        ❌ <strong>Eliminar:</strong> Envia o humano para a extinção.<br>
        ⏭️ <strong>Próximo:</strong> Avança para o próximo espécime após ver as estatísticas.<br><br>
        Suas escolhas moldarão o futuro!`,
        startBtn: "Começar Julgamento",
        years: "anos",
        jobFallback: "Profissão não informada",
        noPros: "Sem prós cadastrados",
        noCons: "Sem contras cadastrados",
        earth2Label: "Terra 2",
        defeatedLabel: "Eliminados",
        btnRedDesc: "Eliminar",
        btnYellowDesc: "Próximo",
        btnGreenDesc: "Terra 2",
        finishedTitle: "Fim da Linha!",
        finishedText: "🎉 Todos os espécimes foram julgados e o limite de vagas da Terra 2 foi preenchido. Obrigado por decidir o destino da humanidade!"
    },
    en: {
        story: `👽 <strong>Attention Human!</strong><br>
        Your species has been abducted. We, the Star Observers, demand that you analyze these specimens.<br><br>
        You are allowed to save a maximum of <strong>6 humans</strong> for the new Earth 2.<br><br>
        <strong>How to play:</strong><br>
        🌍 <strong>Earth 2:</strong> Send the selected human (counts as one of the 6 slots).<br>
        ❌ <strong>Defeat:</strong> Eliminate the human forever.<br>
        ⏭️ <strong>Next:</strong> Move to the next specimen after seeing the stats.<br><br>
        Your choices will shape the future!`,
        startBtn: "Start Judgment",
        years: "years old",
        jobFallback: "Job not informed",
        noPros: "No pros registered",
        noCons: "No cons registered",
        earth2Label: "Earth 2",
        defeatedLabel: "Defeated",
        btnRedDesc: "Eliminate",
        btnYellowDesc: "Next",
        btnGreenDesc: "Earth 2",
        finishedTitle: "End of the Line!",
        finishedText: "🎉 All specimens have been judged and the Earth 2 slots are full. Thank you for deciding humanity's fate!"
    }
}

// Elementos da UI
const welcomeModal = document.getElementById("welcome-modal")
const gameContainer = document.getElementById("game-container")
const storyBox = document.getElementById("story-box")
const storyText = document.getElementById("story-text")
const introText = document.getElementById("intro-text")
const btnStart = document.getElementById("btn-start")
const btnPt = document.getElementById("btn-pt")
const btnEn = document.getElementById("btn-en")

const btnYellow = document.getElementById("btn-yellow")
const btnGreen = document.getElementById("btn-green")
const btnRed = document.getElementById("btn-red")
const photo = document.getElementById("character")
const info = document.getElementById("info")
const percentage = document.getElementById("percentages")
const greenPercentage = document.getElementById("percentage-green")

btnPt.addEventListener("click", () => setLanguage('pt'))
btnEn.addEventListener("click", () => setLanguage('en'))

function setLanguage(lang) {
    currentLang = lang
    introText.style.display = "none"
    btnPt.parentElement.style.display = "none"
    
    storyBox.style.display = "block"
    storyText.innerHTML = texts[lang].story
    btnStart.innerText = texts[lang].startBtn

    document.getElementById("label-earth2").innerText = texts[lang].earth2Label
    document.getElementById("label-defeated").innerText = texts[lang].defeatedLabel
    document.getElementById("label-btn-red").innerText = texts[lang].btnRedDesc
    document.getElementById("label-btn-yellow").innerText = texts[lang].btnYellowDesc
    document.getElementById("label-btn-green").innerText = texts[lang].btnGreenDesc
}

btnStart.addEventListener("click", () => {
    welcomeModal.style.display = "none"
    gameContainer.style.display = "grid"
    fetchCandidates()
})

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
        updateInfo()
    }
}

function updateInfo() {
    if (humanIdx >= humans.length) {
        showFinishedScreen()
        return
    }

    const human = humans[humanIdx]

    photo.style.visibility = "visible"    
    info.style.visibility = "visible"
    percentage.style.visibility = "hidden"

    // Gerencia a disponibilidade do botão verde se atingiu o limite de 6 salvos
    const greenGroup = btnGreen.closest('.btn-group')
    if (savedCount >= MAX_SAVED) {
        btnGreen.style.opacity = "0.3"
        btnGreen.style.pointerEvents = "none"
        document.getElementById("label-btn-green").innerText = currentLang === 'pt' ? "Vagas Esgotadas" : "Slots Full"
    } else {
        btnGreen.style.opacity = "1"
        btnGreen.style.pointerEvents = "auto"
        document.getElementById("label-btn-green").innerText = texts[currentLang].btnGreenDesc
    }

    const t = texts[currentLang]
    const prosList = Array.isArray(human.pros) ? human.pros : (typeof human.pros === 'string' ? JSON.parse(human.pros) : [t.noPros, ""])
    const consList = Array.isArray(human.cons) ? human.cons : (typeof human.cons === 'string' ? JSON.parse(human.cons) : [t.noCons, ""])

    photo.innerHTML = `<img src="${human.img || ''}" alt="Candidato">`

    info.innerHTML = `
        <h1>${human.name || 'Unknown'}</h1>
        <h3>${human.age || 0} ${t.years} • ${human.job || t.jobFallback}</h3>
        <h4>PROS</h4>
        <ul>
            <li>✔ ${prosList[0] || ''}</li>
            <li>✔ ${prosList[1] || ''}</li>
        </ul>
        <h4>CONS</h4>
        <ul>
            <li>✖ ${consList[0] || ''}</li>
            <li>✖ ${consList[1] || ''}</li>
        </ul>
    `
}

function showFinishedScreen() {
    const t = texts[currentLang]
    photo.style.visibility = "hidden"
    percentage.style.visibility = "hidden"
    
    info.style.visibility = "visible"
    info.innerHTML = `
        <h1 style="color: var(--green); margin-bottom: 20px;">${t.finishedTitle}</h1>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #fff;">${t.finishedText}</p>
    `
    document.querySelector(".action-wrapper").style.display = "none"
}

btnYellow.addEventListener("click", () => {
    if (percentageIsShowing) {
        percentageIsShowing = false
        percentage.style.visibility = "hidden"
        
        humanIdx += 1
        updateInfo()
    }
})

btnGreen.addEventListener("click", async () => {
    if (!percentageIsShowing && savedCount < MAX_SAVED) {
        savedCount += 1 // Incrementa o número de salvos com sucesso
        await handleVote("green")
    }
})

btnRed.addEventListener("click", async () => {
    if (!percentageIsShowing) {
        await handleVote("red")
    }
})

async function handleVote(buttonType) {
    const currentHuman = humans[humanIdx]
    const candidateId = currentHuman.id ?? humanIdx

    const voteColumn = buttonType === "green" ? "vote_green" : "vote_red"

    try {
        const { error: rpcError } = await supabase.rpc('vote_candidate', { 
            candidate_id: candidateId, 
            vote_type: buttonType 
        })

        if (rpcError) {
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
        }

        info.style.visibility = "hidden"
        photo.style.visibility = "hidden"
        percentage.style.visibility = "visible"
        percentageIsShowing = true

    } catch (err) {
        console.error("Erro ao registrar voto:", err)
    }
}
