const sulfa = createSulfa({
    imageUriFormat: '/{name}_{variation}.svg',
});
const starsParticles = sulfa.generator({
    name: 'star',
    variations: 1,
    sizeRange: { min: 7, max: 15 },
    gravity: 0.3,
    wind: 0.3,
    fps: 180
});

const awakeTimes = [4, 5, 6, 7, 8, 9, 10, 11];
const stars = [
    { name: "Kriptonix", color: "#00FF88" },
    { name: "Spica", color: "#00FFFF" },
    { name: "Vega", color: "#0092FF" },
    { name: "Kappa 2", color: "#FFFFFF" },
    { name: "Arcturus", color: "#F2E99E" },
    { name: "Sun", color: "#FCEE21" },
    { name: "Konhab", color: "#F7931E" },
    { name: "Puppis", color: "#F15A24" },
];
let documentEl = document.documentElement;

function openFullscreen() {
    if (documentEl.requestFullscreen) {
        documentEl.requestFullscreen();
    } else if (documentEl.webkitRequestFullscreen) { /* Safari */
        documentEl.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        documentEl.msRequestFullscreen();
    }
}

const appEl = document.querySelector("#app");
const menuEl = document.querySelector("#menu");
const sunriseEl = document.querySelector("#sunrise");
const timesEl = document.getElementById("times");
const starsEl = document.getElementById("stars");
const sidebarEl = document.getElementById("sidebar");
const startEl = document.getElementById("start");
const exitEl = document.getElementById("exit");
let selectedTime = 6;
let selectedStar = stars.find(star => star.name === 'Vega');


function selectTime(selectedTimeEl) {
    selectedTime = parseInt(selectedTimeEl.getAttribute("data-time"));

    document.querySelectorAll(".time").forEach(timeEl => {
        if (selectedTimeEl === timeEl) {
            timeEl.classList.add("selected");
        } else {
            timeEl.classList.remove("selected");
        }
    })
}

function updateSelectedTime() {
    document.querySelectorAll(".time").forEach(timeEl => {
        if (parseInt(timeEl.getAttribute("data-time")) === selectedTime) {
            timeEl.classList.add("selected");
        } else {
            timeEl.classList.remove("selected");
        }
    })
}

function selectStar(selectedStarEl) {
    selectedStar = stars.find(star => star.name === selectedStarEl.getAttribute("data-name"));

    document.querySelectorAll(".star").forEach(starEl => {
        if (selectedStarEl === starEl) {
            starEl.classList.add("selected");
        } else {
            starEl.classList.remove("selected");
        }
    });

    updateSelectedStar();
}

function updateSelectedStar() {
    document.querySelectorAll(".star").forEach(starEl => {
        if (starEl.getAttribute("data-name") === selectedStar.name) {
            starEl.classList.add("selected");
        } else {
            starEl.classList.remove("selected");
        }
    });

    menuEl.style.boxShadow = `inset 0 -100vw 100vw -70vw ${selectedStar.color}11, inset 0 -15vw 15vw -15vw ${selectedStar.color}99, inset 0 -1vw 1vw -1vw ${selectedStar.color}, inset 0 -.25vw .25vw -1vw #ffffff, inset 0 -3.25vw 3.25vw -5vw #ffffff, inset 0 -3.25vw 3.25vw -3.25vw #ffffff`;
}

async function scheduleSunrise() {
    appEl.style.display = 'none';
    sunriseEl.style.display = 'block';

    const currentTime = new Date();
    let sunriseTime = new Date();
    let sunriseDuration = 1 * 60 * 1000;

    if (currentTime.getHours() <= selectedTime) {
        sunriseTime.setHours(selectedTime);
    } else {
        sunriseTime.setDate(currentTime.getDate() + 1);
        sunriseTime.setHours(selectedTime);
    }

    const sunriseBeginning = sunriseTime.getTime() - sunriseDuration;

    const updateColor = () => {
        const now = Date.now();
        const factor = clamp(0, now - sunriseBeginning, sunriseDuration) / sunriseDuration;
        sunriseEl.style.backgroundColor = mixColors('#000000', selectedStar.color, factor);

        if (factor < 0.99) {
            window.requestAnimationFrame(updateColor);
        }
    }
    window.requestAnimationFrame(updateColor);
    openFullscreen();
    tryWakeLock();
}

function decodeColor(color) {
    if (typeof color !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(color)) {
        throw new Error(`${color} is not a hex color.`);
    }

    return [
        parseInt(color.substring(1, 3), 16),
        parseInt(color.substring(3, 5), 16),
        parseInt(color.substring(5, 7), 16),
    ];
}

function encodeColor(r, g, b) {
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function mixColors(a, b, factor) {
    const [ar, ag, ab] = decodeColor(a);
    const [br, bg, bb] = decodeColor(b);
    const mr = Math.ceil(ar * (1 - factor) + br * factor);
    const mg = Math.ceil(ag * (1 - factor) + bg * factor);
    const mb = Math.ceil(ab * (1 - factor) + bb * factor);

    return encodeColor(mr, mg, mb);
}

function clamp(min, number, max) {
    return Math.min(max, Math.max(min, number));
}

function tryWakeLock() {
    if (!("wakeLock" in navigator)) {
        return;
    }

    const { wakeLock } = navigator;
    wakeLock.request('screen');
}

(async function setupUI() {
    for (const awakeTime of awakeTimes) {
        timesEl.innerHTML += `<div class="time" data-time="${awakeTime}">${awakeTime}:00</div>`;
    }

    for (const { name, color } of stars) {
        starsEl.innerHTML += `
            <div class="star" data-name="${name}">
                <div class="star-icon" style="background-color: ${color};"></div>
                <span class="star-name">${name}</span>
            </div>`;
    }

    document.querySelectorAll(".time").forEach(timeEl => {
        timeEl.addEventListener("click", () => {
            selectTime(timeEl);
        });
    })

    document.querySelectorAll(".star").forEach(starEl => {
        starEl.addEventListener("click", () => {
            selectStar(starEl);
        });
    })

    startEl.addEventListener('click', scheduleSunrise);
    exitEl.addEventListener('click', () => window.location.reload());

    updateSelectedTime();
    updateSelectedStar();

    setInterval(() => Math.random() < .2 ? starsParticles.splash({ x: window.innerWidth * Math.random() - 500, y: -500 }, 1, 5) : void 0, 1000)
})();
