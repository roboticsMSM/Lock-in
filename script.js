// --- CONFIGURATION ---
const totalPhotos = 100; // Change this to the exact number of photos you have
const imageFolder = "images"; // Your folder name
const fileExtension = "jpg"; // Check if your files are .jpg or .png

const tips = [
    "Hey Manya, go grab some coffee.",
    "Time for a water break. Stay hydrated.",
    "You're doing great. Stretch for a second.",
    "Take a deep breath. You're making progress.",
    "Go eat a quick snack, you need the energy.",
    "Eyes off the screen for a minute. Rest them.",
    "You're one step closer to finishing. Keep going!"
    "Hydrate. Your brain needs it.",
    "Stand up. Quick stretch.",
    "Snack break. Fuel up.",
    "Fix your posture.",
    "Deep breath. Reset.",
    "Rest your eyes. 20 seconds.",
    "Unclench your jaw.",
    "Shoulders back. Sit tall.",
    "Refill your water bottle.",
    "Walk around for a minute.",
    "Eat something light.",
    "Wash your face. Refresh.",
    "Breathe in. Breathe out.",
    "Tiny break. Big comeback.",
    "You’re doing well. Keep going.",
    "Protein > junk. Choose smart.",
    "Stretch your neck slowly.",
    "Relax your hands.",
    "Look far away. Eye reset.",
    "Hydration check.",
    "Clear desk. Clear mind.",
    "Pause. Don’t quit.",
    "Snack if you’re low-energy.",
    "Shake off the tension.",
    "Slow down. Focus up.",
    "Stand tall. Royal energy.",
    "Water first. Always.",
    "Short walk. Fresh mind.",
    "Blink properly.",
    "Loosen your shoulders.",
    "Eat fruit. Quick boost.",
    "Breathe for 10 seconds.",
    "Reset your focus.",
    "You’re closer than you think.",
    "Small steps count.",
    "Stretch your back gently.",
    "Hydrate again.",
    "Relax your face.",
    "One task at a time.",
    "You’ve got this.",
    "Micro break. Then attack.",
    "Energy low? Eat.",
    "Sit straight.",
    "Refocus. Continue.",
    "Rest. Then return stronger.",
    "Drink water now.",
    "Move your body.",
    "Calm mind. Sharp work.",
    "Keep the momentum.",
    "Short pause. Big results.",
    "Stay consistent.",
    "Protect your energy.",
    "Focus mode: on.",
    "Quick reset.",
    "Nourish your body.",
    "Breathe deeper.",
    "Stay steady.",
    "Mindset check.",
    "Eyes off screen.",
    "Fuel your focus.",
    "Gentle stretch.",
    "Hydrate properly.",
    "Relax your spine.",
    "Progress matters.",
    "Eat real food.",
    "Center yourself.",
    "Tiny wins add up.",
    "Re-center. Restart.",
    "Stay sharp.",
    "Trust the process.",
    "Posture check.",
    "Short break only.",
    "Refresh and return.",
    "Control your pace.",
    "Stay disciplined.",
    "Don’t rush it.",
    "Breathe slowly.",
    "Reset your thoughts.",
    "Hydrate consistently.",
    "Focus quietly.",
    "Keep pushing.",
    "Energy check.",
    "Stretch lightly.",
    "Mind over mood.",
    "Stay hydrated.",
    "Eat if needed.",
    "Protect your focus.",
    "You’re improving.",
    "Slow and steady.",
    "Eyes rest.",
    "Relax tension.",
    "Refuel smart.",
    "You’re capable.",
    "Stay present.",
    "Back straight.",
    "Short walk.",
    "Hydrate again.",
    "Finish strong."
];

let sessionSeconds = 0;
let isBreak = false;
let photoInterval;

// Elements
const dash = document.getElementById('study-dashboard');
const frame = document.getElementById('photo-frame');
const panic = document.getElementById('panic-screen');
const tipEl = document.getElementById('care-tip');
const mainClock = document.getElementById('main-clock');
const sessionTimer = document.getElementById('session-timer');

// --- CLOCK LOGIC ---
function updateTime() {
    const now = new Date();
    // Using 12-hour format for a friendlier feel, or keep it 24-hour if you prefer
    mainClock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (!isBreak && panic.style.display !== 'block') {
        sessionSeconds++;
        const h = Math.floor(sessionSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((sessionSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (sessionSeconds % 60).toString().padStart(2, '0');
        sessionTimer.innerText = `SESSION: ${h}:${m}:${s}`;
        
        // Save to Local Storage so she can see her total effort
        localStorage.setItem('manya_study_time', sessionSeconds);
    }
}

// Load previous progress on startup
window.onload = () => {
    const saved = localStorage.getItem('manya_study_time');
    if (saved) sessionSeconds = parseInt(saved);
    setInterval(updateTime, 1000);
};

// --- BREAK TRANSITIONS ---
function startBreak() {
    isBreak = true;
    dash.classList.add('zoom-active');
    
    setTimeout(() => {
        dash.style.display = 'none';
        frame.style.display = 'block';
        changePhoto();
        // Cycles photos every 25 seconds
        photoInterval = setInterval(changePhoto, 25000); 
    }, 600);
}

function endBreak() {
    isBreak = false;
    clearInterval(photoInterval);
    frame.style.display = 'none';
    dash.style.display = 'flex';
    setTimeout(() => {
        dash.classList.remove('zoom-active');
    }, 50);
}

function changePhoto() {
    // Generate random number between 1 and totalPhotos
    const randomNumber = Math.floor(Math.random() * totalPhotos) + 1;
    
    // MATCHING WINDOWS FORMAT: photo (1).jpg
    // Note: If you renamed them as "photo (1)", Windows puts a space before the bracket
    const photoPath = `${imageFolder}/photo (${randomNumber}).${fileExtension}`;
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Apply background with a slight dark overlay to make the "Locked In" button and tips readable
    frame.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${photoPath}')`;
    
    // Add a small fade effect to the text change
    tipEl.style.opacity = 0;
    setTimeout(() => {
        tipEl.innerText = randomTip;
        tipEl.style.opacity = 1;
    }, 500);
}

// --- CONTROLS ---
document.getElementById('break-btn').addEventListener('click', startBreak);
document.getElementById('locked-in-btn').addEventListener('click', endBreak);

window.onkeydown = function(e) {
    // ESC key: Emergency Switch (The Panic Switch)
    if (e.key === "Escape") { 
        if (isBreak) {
            endBreak(); // Instantly returns to dashboard
        } else {
            // Fakes the boring study page
            panic.style.display = 'block'; 
        }
    }
    // SPACE key: Hide Panic Screen and go back to Dashboard
    if (e.key === " " && panic.style.display === 'block') {
        panic.style.display = 'none';
    }
};