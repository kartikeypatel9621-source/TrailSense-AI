/* =========================================
   TRAILSENSE AI
   Frontend prototype
   HTML + CSS + JavaScript
========================================= */


/* ---------- APP STATE ---------- */

let xp = Number(localStorage.getItem("trailXP")) || 420;
let discoveries = Number(localStorage.getItem("trailDiscoveries")) || 18;
let streak = Number(localStorage.getItem("trailStreak")) || 6;

const missions = [

    {
        title: "Find something that shows evidence of wildlife.",
        description:
            "Look for footprints, feathers, nests, bite marks or any other sign of an animal.",
        icon: "🐾"
    },

    {
        title: "Find three different leaf shapes.",
        description:
            "Walk outside and find three leaves that have noticeably different shapes.",
        icon: "🍃"
    },

    {
        title: "Find something that has perfect symmetry.",
        description:
            "Look carefully at flowers, leaves, insects or natural patterns around you.",
        icon: "🌸"
    },

    {
        title: "Listen silently for one minute.",
        description:
            "Put your phone away and identify as many different sounds as possible.",
        icon: "🐦"
    },

    {
        title: "Find evidence that something changed over time.",
        description:
            "Look for tree rings, erosion, fallen leaves, weathering or another natural clue.",
        icon: "🌳"
    },

    {
        title: "Find five different shades of green.",
        description:
            "Look around you and photograph five naturally occurring shades of green.",
        icon: "🌿"
    }

];


/* ---------- INITIALIZATION ---------- */

document.addEventListener("DOMContentLoaded", () => {

    updateStats();

});


/* ---------- STATS ---------- */

function updateStats() {

    document.getElementById("xp").textContent = xp;
    document.getElementById("discoveries").textContent = discoveries;
    document.getElementById("streak").textContent = `${streak} 🔥`;

    const level = Math.floor(xp / 100) + 1;

    document.getElementById("level").textContent =
        String(level).padStart(2, "0");

    document.getElementById("reportXP").textContent = xp;
    document.getElementById("reportDiscoveries").textContent = discoveries;

    localStorage.setItem("trailXP", xp);
    localStorage.setItem("trailDiscoveries", discoveries);
    localStorage.setItem("trailStreak", streak);
}


/* ---------- MISSIONS ---------- */

function generateMission() {

    const mission =
        missions[Math.floor(Math.random() * missions.length)];

    document.getElementById("missionTitle").textContent =
        mission.title;

    document.getElementById("missionDescription").textContent =
        mission.description;

    document.querySelector(".mission-art").textContent =
        mission.icon;

}


function startMission() {

    document.querySelector(".mission-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function completeMission() {

    xp += 50;
    discoveries += 1;

    updateStats();

    document.getElementById("missionModal")
        .classList.add("active");

}


/* ---------- MODALS ---------- */

function openScanner() {

    document.getElementById("scannerModal")
        .classList.add("active");

}


function openAI() {

    document.getElementById("aiModal")
        .classList.add("active");

}


function showReport() {

    updateStats();

    document.getElementById("reportModal")
        .classList.add("active");

}


function closeModal(id) {

    document.getElementById(id)
        .classList.remove("active");

}


/* ---------- IMAGE PREVIEW ---------- */

function previewImage(event) {

    const file = event.target.files[0];

    if (!file) return;

    const image =
        document.getElementById("preview");

    image.src =
        URL.createObjectURL(file);

    image.style.display = "block";

    document.getElementById("uploadText")
        .textContent = "✓ Photo selected";

}


/* ---------- AI IMAGE ANALYSIS ---------- */

async function analyzeImage() {

    const file =
        document.getElementById("imageInput").files[0];

    const result =
        document.getElementById("scanResult");

    if (!file) {

        result.innerHTML =
            "📷 Please choose a photo first.";

        return;

    }

    result.innerHTML =
        "🧠 <strong>AI is analyzing your observation...</strong>";

    /*
       ========================================
       OPEN AI MODEL INTEGRATION POINT
       ========================================

       Replace this section with your chosen
       open-weight vision model endpoint.

       Example architecture:

       Browser
          ↓
       JavaScript
          ↓
       Open-weight Vision Model
          ↓
       JSON result
          ↓
       UI

       The frontend is intentionally prepared
       for a local/open model.
    */

    await wait(1500);

    const responses = [

        "🌿 This looks like a natural plant or leaf observation. Look closely at its shape, texture and vein pattern.",

        "🌳 Interesting natural structure detected. Try comparing it with another nearby object.",

        "🐾 Your observation appears to contain something worth investigating. Look around for related evidence.",

        "🔎 Observation recorded. Try asking TrailSense: 'What should I look for next?'"

    ];

    const answer =
        responses[Math.floor(Math.random() * responses.length)];

    result.innerHTML = `
        <strong>✦ AI OBSERVATION</strong>
        <br><br>
        ${answer}
        <br><br>
        <span style="color:#7dff9a">
        +10 discovery XP
        </span>
    `;

    xp += 10;
    discoveries += 1;

    updateStats();

}


/* ---------- AI CHAT ---------- */

async function askAI() {

    const input =
        document.getElementById("question");

    const question =
        input.value.trim();

    if (!question) return;

    const chat =
        document.getElementById("chat");


    chat.innerHTML += `
        <div class="message user">
            ${escapeHTML(question)}
        </div>
    `;

    input.value = "";

    chat.innerHTML += `
        <div class="message ai" id="thinking">
            🧠 Thinking...
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;


    /*
       ========================================
       OPEN-WEIGHT AI CHAT INTEGRATION POINT
       ========================================

       Connect this function to a local model
       such as an open-weight LLM running through
       a local inference server.

       Example:

       JavaScript
          ↓
       fetch()
          ↓
       Local AI model
          ↓
       response
    */


    await wait(1000);

    document.getElementById("thinking").remove();


    const answer =
        generateLocalResponse(question);

    chat.innerHTML += `
        <div class="message ai">
            ${answer}
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

}


/* ---------- SIMPLE DEVELOPMENT AI ---------- */

function generateLocalResponse(question) {

    const q =
        question.toLowerCase();


    if (q.includes("plant")) {

        return `
            🌿 Look at the leaf shape, arrangement,
            texture and veins. If you photograph it,
            I can help structure an identification
            workflow using an open vision model.
        `;

    }


    if (q.includes("bird")) {

        return `
            🐦 Stop walking for a moment and listen.
            Try to identify whether the sound has a
            repeated rhythm, whistle or call pattern.
        `;

    }


    if (q.includes("walk") || q.includes("hike")) {

        return `
            🥾 Try a 20-minute screen-free exploration.
            Your mission: notice five things you normally
            walk past without seeing.
        `;

    }


    if (q.includes("tree")) {

        return `
            🌳 Look at the bark, leaves, branching pattern
            and surrounding environment. Nature becomes
            much more interesting when you slow down.
        `;

    }


    return `
        🌱 Interesting question.

        Try turning it into an outdoor observation:
        instead of only asking what something is,
        ask yourself <strong>why it is there,
        what changed it, and what lives around it.</strong>
    `;

}


/* ---------- VOICE ---------- */

function startVoice() {

    if (!("webkitSpeechRecognition" in window)) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;

    }


    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();


    recognition.onstart = () => {

        alert(
            "🎙️ Listening...\n\nAsk TrailSense something."
        );

    };


    recognition.onresult = event => {

        const text =
            event.results[0][0].transcript;

        openAI();

        document.getElementById("question")
            .value = text;

        askAI();

    };

}


/* ---------- UTILITIES ---------- */

function wait(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );

}


function escapeHTML(text) {

    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ---------- MENU ---------- */

function toggleMenu() {

    alert(
        "TrailSense AI\n\n" +
        "🌿 Explore\n" +
        "📸 Nature Scanner\n" +
        "🧠 AI Companion\n" +
        "🏆 Achievements"
    );

}


/* ---------- CLOSE MODAL ON BACKGROUND ---------- */

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    });

});