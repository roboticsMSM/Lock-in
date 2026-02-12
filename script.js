document.addEventListener('DOMContentLoaded', () => {
    const totalPhotos = 306; 
    const imageFolder = "images"; 
    const fileExtension = "jpg"; 

    // Your massive tips list...
    const tips = [
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

    const dash = document.getElementById('study-dashboard');
    const frame = document.getElementById('photo-frame');
    const panic = document.getElementById('panic-screen');
    const tipEl = document.getElementById('care-tip');

    // --- CLOCK ---
    function updateTime() {
        const now = new Date();
        document.getElementById('main-clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        if (!isBreak && panic.style.display !== 'block') {
            sessionSeconds++;
            const h = Math.floor(sessionSeconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((sessionSeconds % 3600) / 60).toString().padStart(2, '0');
            const s = (sessionSeconds % 60).toString().padStart(2, '0');
            document.getElementById('session-timer').innerText = `SESSION: ${h}:${m}:${s}`;
            localStorage.setItem('manya_study_time', sessionSeconds);
        }
    }

    const saved = localStorage.getItem('manya_study_time');
    if (saved) sessionSeconds = parseInt(saved);
    setInterval(updateTime, 1000);

    // --- PHOTO LOGIC (The Mobile-Safe Dual Layer) ---
    function changePhoto() {
        const num = Math.floor(Math.random() * totalPhotos) + 1;
        const basePath = `${imageFolder}/photo (${num})`;
        
        const testImg = new Image();
        
        const applyPath = (path) => {
            // This sets a CSS variable that both ::before and ::after use
            frame.style.setProperty('--bg-img', `url('${path}')`);
        };

        testImg.onload = () => applyPath(`${basePath}.jpg`);
        testImg.onerror = () => applyPath(`${basePath}.jpeg`);
        testImg.src = `${basePath}.jpg`;

        tipEl.innerText = tips[Math.floor(Math.random() * tips.length)];
    }

    // --- ACTIONS ---
    document.getElementById('break-btn').onclick = () => {
        isBreak = true;
        dash.classList.add('zoom-active');
        setTimeout(() => {
            dash.style.display = 'none';
            frame.style.display = 'block';
            changePhoto();
            photoInterval = setInterval(changePhoto, 25000);
        }, 600);
    };

    document.getElementById('locked-in-btn').onclick = () => {
        isBreak = false;
        clearInterval(photoInterval);
        frame.style.display = 'none';
        dash.style.display = 'flex';
        setTimeout(() => dash.classList.remove('zoom-active'), 50);
    };

    // --- PANIC KEYS ---
    window.onkeydown = (e) => {
        if (e.key === "Escape") {
            if (isBreak) document.getElementById('locked-in-btn').click();
            else panic.style.display = 'block';
        }
        if (e.key === " " && panic.style.display === 'block') panic.style.display = 'none';
    };

    // Mobile Hidden Panic (Triple tap the clock to show panic)
    document.getElementById('main-clock').addEventListener('click', function (e) {
        if (e.detail === 3) panic.style.display = 'block';
    });
});