import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://yqltjicmgimefadpburv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbHRqaWNtZ2ltZWZhZHBidXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3OTk1MzgsImV4cCI6MjEwODM3NTUzOH0.uIFvKeX66kWUvVVl3d_YDH0EuxYInzleluOek1JxYaI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

let humans = []
let humanIdx = 0
let percentageIsShowing = false
let currentLang = 'pt' 
let savedCount = 0 
const MAX_SAVED = 6 

// Dicionário considerando exatamente os textos inseridos por você no Supabase
const translations = {
    // Arthur Mendes
    "Cybersecurity Specialist": "Especialista em Cibersegurança",
    "Advanced skill in tracking and neutralizing digital attacks": "Habilidade avançada em rastrear e neutralizar ataques digitais",
    "In-depth knowledge of maintaining isolated electrical networks": "Conhecimento profundo em manutenção de redes elétricas isoladas",
    "Extreme paranoia history": "Histórico de paranoia extrema",
    "Severe difficulty following orders": "Dificuldade severa em seguir ordens",

    // Beatriz Souza
    "Molecular Biologist": "Bióloga Molecular",
    "Discovered cure for an aggressive fungal mutation in crops": "Descobriu a cura para uma mutação fúngica agressiva em plantações",
    "Extreme physical and mental resilience under prolonged isolation": "Extrema resiliência física e mental sob isolamento prolongado",
    "Severe allergy to multiple common antibiotics": "Alergia severa a múltiplos antibióticos comuns",
    "Prefers to live completely alone": "Prefere viver completamente sozinha",

    // Mark Smith
    "Aerospace Engineer": "Engenheiro Aeroespacial",
    "Designed low-energy propulsion systems for colonial ships": "Projetou sistemas de propulsão de baixo consumo para naves coloniais",
    "Decades of leadership in high-pressure technical teams": "Décadas de leadership em equipes técnicas sob alta pressão",
    "Shows early symptoms of a mild degenerative disease": "Apresenta sintomas iniciais de uma doença degenerativa leve",
    "Stubborn and averse to new concepts of freedom": "Teimoso e avesso a novos conceitos de liberdade",

    // Liliane Ducharme
    "Behavioral Psychologist": "Psicóloga Comportamental",
    "Specialist in conflict mediation within closed communities": "Especialista em mediação de conflitos em comunidades fechadas",
    "Fluent in four languages and excellent teaching ability": "Fluente em quatro idiomas e excelente capacidade de ensino",
    "No practical experience in manual survival labor": "Sem experiência prática em trabalhos manuais de sobrevivência",
    "Tends to hesitate in drastic decisions under life threat": "Tende a hesitar em decisões drásticas sob risco de vida",

    // Hikari Tanaka
    "Sustainable Urban Architect": "Arquiteta Urbanista Sustentável",
    "Creator of self-sufficient ecological structures with recycled materials": "Criadora de estruturas ecológicas autossuficientes com materiais reciclados",
    "Highly collaborative and focused on collective well-being": "Altamente colaborativa e focada no bem-estar coletivo",
    "Overly demanding with aesthetic and organizational standards": "Exigente demais com padrões estéticos e organizacionais",
    "Refuses to work in polluted or messy environments": "Recusa-se a trabalhar em ambientes poluídos ou bagunçados",

    // Dante Alvarez
    "Hydroponic Farmer": "Agricultor Hidropônico",
    "Mastered high-yield vertical farming under zero-sun conditions": "Dominou a agricultura vertical de alto rendimento sem luz solar",
    "Physically robust and accustomed to heavy manual labor": "Fisicamente robusto e acostumado com trabalho manual pesado",
    "Prone to impulsive decisions when stressed": "Propenso a decisões impulsivas quando estressado",
    "Refuses to share food preservation techniques easily": "Recusa-se a compartilhar facilmente técnicas de conservação de alimentos",

    // Elena Rostova
    "Nuclear Physicist": "Física Nuclear",
    "Expert in compact plasma reactor stabilization": "Especialista em estabilização de reatores de plasma compactos",
    "Exceptionally analytical and calm during equipment failure": "Excepcionalmente analítica e calma durante falhas de equipamentos",
    "Cold and emotionally distant from teammates": "Fria e emocionalmente distante dos colegas de equipe",
    "Racist": "Racista",

    // Kenta Sato
    "Robotics Technician": "Técnico em Robótica",
    "Can repair automated construction drones with basic scrap parts": "Pode reparar drones de construção automatizados com sucatas básicas",
    "High adaptability to fast-paced mechanical challenges": "Alta adaptabilidade a desafios mecânicos rápidos",
    "Easily bored with routine maintenance tasks": "Entedia-se facilmente com tarefas de manutenção de rotina",
    "Chronic insomnia affects morning concentration": "Insônia crônica afeta a concentração matinal",

    // Amara Okoro
    "Emergency Surgeon": "Cirurgiã de Emergência",
    "Saved hundreds of lives in active disaster zones": "Salvou centenas de vidas em zonas de desastre ativo",
    "Proficient in improvised field medicine and trauma care": "Proficiente em medicina de campo improvisada e atendimento a traumas",
    "Suffers from occasional hand tremors during cold weather": "Sofre de tremores ocasionais nas mãos durante o tempo frio",
    "Extremely critical of junior medical assistants": "Extremamente crítica com assistentes médicos iniciantes",

    // Victoria Chen
    "Materials Engineer": "Engenheira de Materiais",
    "Invented ultra-lightweight radiation-shielding alloy": "Inventou uma liga ultra-leve de blindagem contra radiação",
    "Visionary mindset for large-scale infrastructure expansion": "Visão visionária para expansão de infraestrutura em grande escala",
    "Overconfident in experimental materials safety": "Excessivamente confiante na segurança de materiais experimentais",
    "Demands total creative control over all projects": "Exige controle criativo total sobre todos os projetos"
}

// Função de tradução que só traduz se o idioma escolhido for 'pt'
function translateText(str) {
    if (currentLang === 'pt' && translations[str]) {
        return translations[str]
    }
    return str
}

const texts = {
    pt: {
        story: `👽 <strong>Atenção Humano!</strong><br>
        Sua espécie foi abduzida. Nós, os Observadores Estelares, exigimos que você analise estes espécimes.<br><br>
        Você tem direito a salvar no máximo <strong>6 humanos</strong> para a nova Terra 2.<br><br>
        <strong>O que cada botão faz:</strong><br>
        <strong>Terra 2 (Botão Verde):</strong> Envia o humano para a nova colônia (gasta uma das 6 vagas).<br>
        <strong>Próximo (Botão Amarelo):</strong> Vai para o próximo espécime após ver as estatísticas.<br>
        <strong>Eliminar (Botão Vermelho):</strong> Condena o humano à extinção.<br><br>
        Suas escolhas moldarão o futuro!`,
        startBtn: "Começar Julgamento",
        years: "anos",
        jobFallback: "Profissão não informada",
        noPros: "Sem prós cadastrados",
        noCons: "Sem contras cadastrados",
        earth2Label: "Terra 2",
        defeatedLabel: "Defeated",
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
        <strong>What each button does:</strong><br>
        <strong>Earth 2 (Green Button):</strong> Sends the human to the new colony (uses one of the 6 slots).<br>
        <strong>Next (Yellow Button):</strong> Moves to the next specimen after seeing the stats.<br>
        <strong>Defeat (Red Button):</strong> Condemns the human to extinction.<br><br>
        Your choices will shape the future!`,
        startBtn: "Start Judgment",
        years: "years old",
        jobFallback: "Job not informed",
        noPros: "No pros registered",
        noCons: "No cons registered",
        earth2Label: "Earth 2",
        defeatedLabel: "Defeated",
        btnRedDesc: "Defeat",
        btnYellowDesc: "Next",
        btnGreenDesc: "Earth 2",
        finishedTitle: "End of the Line!",
        finishedText: "🎉 All specimens have been judged and the Earth 2 slots are full. Thank you for deciding humanity's fate!"
    }
}

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
    if (introText) introText.style.display = "none"
    if (btnPt && btnPt.parentElement) btnPt.parentElement.style.display = "none"
    
    if (storyBox) {
        storyBox.style.display = "block"
        storyText.innerHTML = texts[lang].story
        btnStart.innerText = texts[lang].startBtn
    }

    const labelEarth2 = document.getElementById("label-earth2")
    const labelDefeated = document.getElementById("label-defeated")
    const labelBtnRed = document.getElementById("label-btn-red")
    const labelBtnYellow = document.getElementById("label-btn-yellow")
    const labelBtnGreen = document.getElementById("label-btn-green")

    if (labelEarth2) labelEarth2.innerText = texts[lang].earth2Label
    if (labelDefeated) labelDefeated.innerText = texts[lang].defeatedLabel
    if (labelBtnRed) labelBtnRed.innerText = texts[lang].btnRedDesc
    if (labelBtnYellow) labelBtnYellow.innerText = texts[lang].btnYellowDesc
    if (labelBtnGreen) labelBtnGreen.innerText = texts[lang].btnGreenDesc
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
    if (humans.length === 0 || humanIdx >= humans.length) {
        showFinishedScreen()
        return
    }

    const human = humans[humanIdx]

    photo.style.visibility = "visible"    
    info.style.visibility = "visible"
    percentage.style.visibility = "hidden"

    const labelBtnGreen = document.getElementById("label-btn-green")
    if (savedCount >= MAX_SAVED) {
        btnGreen.style.opacity = "0.3"
        btnGreen.style.pointerEvents = "none"
        if (labelBtnGreen) labelBtnGreen.innerText = currentLang === 'pt' ? "Vagas Esgotadas" : "Slots Full"
    } else {
        btnGreen.style.opacity = "1"
        btnGreen.style.pointerEvents = "auto"
        if (labelBtnGreen) labelBtnGreen.innerText = texts[currentLang].btnGreenDesc
    }

    const t = texts[currentLang]
    const prosRaw = Array.isArray(human.pros) ? human.pros : (typeof human.pros === 'string' ? JSON.parse(human.pros) : [t.noPros, ""])
    const consRaw = Array.isArray(human.cons) ? human.cons : (typeof human.cons === 'string' ? JSON.parse(human.cons) : [t.noCons, ""])

    // Aplica a tradução baseada nos textos exatos enviados no seu script SQL
    const jobTranslated = translateText(human.job) || t.jobFallback
    const prosList = prosRaw.map(p => translateText(p))
    const consList = consRaw.map(c => translateText(c))

    photo.innerHTML = `<img src="${human.img || ''}" alt="Candidato">`

    info.innerHTML = `
        <h1>${human.name || 'Unknown'}</h1>
        <h3>${human.age || 0} ${t.years} • ${jobTranslated}</h3>
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
    const actionWrapper = document.querySelector(".action-wrapper")
    if (actionWrapper) actionWrapper.style.display = "none"
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
        savedCount += 1 
        await handleVote("green")
    }
})

btnRed.addEventListener("click", async () => {
    if (!percentageIsShowing) {
        await handleVote("red")
    }
})

async function handleVote(buttonType) {
    if (humans.length === 0 || !humans[humanIdx]) return;

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
