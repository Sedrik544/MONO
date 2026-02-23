const phrases = [
    "Maximum Performance",
    "Neural Focus Engaged",
    "Breaking Limits",
    "Absolute Zero",
    "Velocity Achieved",
    "Protocol 77 Active"
];

const aiOutput = document.getElementById('ai-output');
const terminal = document.getElementById('terminal');
const trigger = document.getElementById('core-trigger');
const resetBtn = document.getElementById('reset-btn');
const clockEl = document.getElementById('clock');

// Hodiny
setInterval(() => {
    const now = new Date();
    clockEl.innerText = now.getHours().toString().padStart(2, '0') + ":" + 
                        now.getMinutes().toString().padStart(2, '0') + ":" + 
                        now.getSeconds().toString().padStart(2, '0');
}, 1000);

// Logování do terminálu
function addLog(text) {
    const div = document.createElement('div');
    div.innerText = `> ${text}`;
    terminal.prepend(div);
    if (terminal.children.length > 8) terminal.lastChild.remove();
}

// Hlavní akce
trigger.onclick = () => {
    // Efekt
    aiOutput.classList.add('glitch-active');
    addLog("Analyzing neural state...");
    
    setTimeout(() => {
        aiOutput.classList.remove('glitch-active');
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        aiOutput.innerText = randomPhrase;
        addLog(`Executing: ${randomPhrase}`);
        
        // Vibrace
        if (window.navigator.vibrate) window.navigator.vibrate([30, 50, 30]);
    }, 600);
};

resetBtn.onclick = () => {
    aiOutput.innerText = "System Reset";
    addLog("Rebooting sequence...");
    setTimeout(() => aiOutput.innerText = "Ready to Initialize", 1000);
};
