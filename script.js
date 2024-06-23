const awakeTimes = [6, 7, 8, 9];
const stars = [
    { name: "Spica",    color: "#00FFFF" },
    { name: "Vega",     color: "#0092FF" },
    { name: "Kappa 2",  color: "#FFFFFF" },
    { name: "Arcturus", color: "#F2E99E" },
    { name: "Sun",      color: "#FCEE21" },
    { name: "Konhab",   color: "#F7931E" },
    { name: "Puppis",   color: "#F15A24" },
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
const sunriseEl = document.querySelector("#sunrise");
const timesEl = document.getElementById("times");
const starsEl = document.getElementById("stars");
const sidebarEl = document.getElementById("sidebar");
const startEl = document.getElementById("start");
const exitEl = document.getElementById("exit");
let selectedTime = 6;
let selectedStar = stars.find(star => star.name === 'Arcturus');


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

    sidebarEl.style.backgroundColor = selectedStar.color;
}

function updateSelectedStar() {
    document.querySelectorAll(".star").forEach(starEl => {
        if (starEl.getAttribute("data-name") === selectedStar.name) {
            starEl.classList.add("selected");
        } else {
            starEl.classList.remove("selected");
        }
    });

    sidebarEl.style.backgroundColor = selectedStar.color;
}

async function scheduleSunrise() {
    appEl.style.display = 'none';
    sunriseEl.style.display = 'block';
    sunriseEl.style.backgroundColor = 'black';

    const currentTime = new Date();
    let sunriseTime = new Date();
    let sunriseDuration = 20 * 60 * 60 * 1000;

    if (currentTime.getHours() <= selectedTime) {
        sunriseTime.setHours(selectedTime);
    } else {
        sunriseTime.setDate(currentTime.getDate() + 1);
        sunriseTime.setHours(selectedTime);
    }

    sunriseEl.style.transition = `${sunriseDuration}ms background-color ease-in-out`;

    setTimeout(() => {
        sunriseEl.style.backgroundColor = selectedStar.color;
    }, sunriseTime.getTime() - currentTime.getTime() - sunriseDuration);
    openFullscreen();
}

(async function setupUI() {
    for (const awakeTime of awakeTimes) {
        timesEl.innerHTML += `<div class="time" data-time="${awakeTime}">${awakeTime}:00</div>`;
    }

    for (const {name, color} of stars) {
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
})();
