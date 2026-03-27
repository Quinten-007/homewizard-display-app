const labels = [];
const datapunten = [];
let dagverbruik = 0;
let piekMomenten = 0;
let hweIp = null;

function slaIpOp() {
    hweIp = document.getElementById("ip-input").value;
    document.getElementById("ip-form").style.display = "none";
}
const ctx = document.getElementById("grafiek").getContext("2d");
const grafiek = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Verbruik (W)",
            data: datapunten,
            borderColor: "blue",
            fill: false
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        },
        scales: {
            x: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" }
            },
            y: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" }
            }
        }
    }
});

// ---- DATA OPHALEN ----
async function fetchData() {
    const res = await fetch("http://" + hweIp + "/api/v1/data");
    const data = await res.json();
    verwerkData(data);
}

// ---- DATA VERWERKEN ----
function verwerkData(data) {
    const watt = data.active_power_w;

     if (watt > 0) {
        document.getElementById("verbruik").textContent = Math.round(watt) + " w";
        document.getElementById("teruglevering").textContent = "0 w";
        dagverbruik += watt;
        document.getElementById("dagverbruik").textContent = Math.round(dagverbruik) + " w";
        if (watt > 1600) {
            piekMomenten++;
            document.getElementById("piek").textContent = piekMomenten;
}
    } else {
        document.getElementById("verbruik").textContent = "0 W";
        document.getElementById("teruglevering").textContent = Math.abs.round(watt) + " w";
    }
    const tijd = new Date().toLocaleTimeString();
    labels.push(tijd);
    datapunten.push(watt);
    // Max 20 punten bewaren
    if (labels.length > 20) {
        labels.shift();
        datapunten.shift();
    }

grafiek.update();
}
// ----- reset ----
function reset() {
    dagverbruik = 0;
    piekMomenten = 0;
    document.getElementById("dagverbruik").textContent = "0 W";
    document.getElementById("piek").textContent = "0";
    labels.length = 0;
    datapunten.length = 0;
    grafiek.update();
}
function updateKlok() {
    const nu = new Date();
    document.getElementById("klok").textContent = nu.toLocaleTimeString("nl-BE");
    document.getElementById("datum").textContent = nu.toLocaleDateString("nl-BE");
}

setInterval(updateKlok, 1000);
updateKlok();

function checkMidnacht() {
    const nu = new Date();
    const opgeslagenDag = localStorage.getItem("dag");
    const vandaag = nu.toLocaleDateString("nl-BE");

    if (opgeslagenDag !== vandaag) {
        dagverbruik = 0;
        piekMomenten = 0;
        document.getElementById("dagverbruik").textContent = "0 w";
        document.getElementById("piek").textContent = "0";
        localStorage.setItem("dag", vandaag);
        localStorage.removeItem("dagverbruik");
        localStorage.removeItem("piekMomenten");
    }
}
// ---- START ----
fetchData(); 
setInterval(fetchData, 5000); 
checkMidnacht();
setInterval(checkMidnacht, 60000);