async function chargerMeubles() {

   

    const reponse = await fetch("../data/meubles.json");
    const meubles = await reponse.json();
   

    console.log(meubles);
                             
    const disponibles = meubles.filter(
        meuble => meuble.statut === "Disponible"
    );
    
    

    let valeurRestante = 0;
    disponibles.forEach(meuble => {
        valeurRestante += meuble.prix.vente;
    });  

    const reserves = meubles.filter(
        meuble => meuble.statut === "Réservé"
    );


    const vendus = meubles.filter(
        meuble => meuble.statut === "Vendu"
    );


    mettreAJourStatistique("nb-disponibles", disponibles.length);
    mettreAJourStatistique("nb-reserves", reserves.length);
    mettreAJourStatistique("nb-vendus", vendus.length);
    mettreAJourStatistique("valeur-stock", valeurRestante);

    console.log("Disponibles :", disponibles.length);
    console.log("Réservés :", reserves.length);
    console.log("Vendus :", vendus.length);
    console.log("Valeur restante :", valeurRestante);



}

chargerMeubles();


function mettreAJourStatistique(id, valeur) {
    const element = document.getElementById(id);
    if (!element) return;
    if (id === "valeur-stock") {
        animerCompteurEuro(id, valeur);
    } else {
        animerCompteur(id, valeur);
    }
}


async function chargerFrequentation() {

    try {

        const response = await fetch("https://goatcounter-api.ac-boileau.workers.dev");

        if (!response.ok) {
            throw new Error("Impossible de récupérer les statistiques");
        }

        const stats = await response.json();

        const date = new Date();

        const heure = date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });

        const jour = stats.currentDay
            ? stats.currentDay.split("-").reverse().join("/")
            : "--/--/----";

        document.getElementById("last-visit").textContent =
            `${jour} à ${heure}`;

        afficherTopMeubles(stats.topMeubles);

        const labels = stats.history.map(jour => jour.day);
        const valeurs = stats.history.map(jour => jour.visits);

        animerCompteur("todayVisits", stats.todayVisits);
        animerCompteur("weekVisits", stats.week);
        animerCompteur("totalVisits", stats.total);

        afficherGraphique(labels, valeurs);

    } catch (err) {

        console.error(err);

        document.getElementById("last-visit").textContent = "--";

        afficherTopMeubles([]);

        animerCompteur("todayVisits", 0);
        animerCompteur("weekVisits", 0);
        animerCompteur("totalVisits", 0);

    }

}

function animerCompteur(id, valeurFinale, duree = 800) {

    const element = document.getElementById(id);

    const debut = 0;
    const increment = valeurFinale / (duree / 16);

    let valeur = debut;

    const timer = setInterval(() => {

        valeur += increment;

        if (valeur >= valeurFinale) {
            valeur = valeurFinale;
            clearInterval(timer);
        }

        element.textContent = Math.round(valeur);

    }, 16);

}

function animerCompteurEuro(id, fin) {

    const element = document.getElementById(id);

    let debut = 0;
    const duree = 1200;
    const increment = fin / (duree / 16);

    const timer = setInterval(() => {

        debut += increment;

        if (debut >= fin) {
            debut = fin;
            clearInterval(timer);
        }

        element.textContent = Math.round(debut).toLocaleString("fr-FR") + " €";

    }, 16);

}



chargerFrequentation();

function afficherGraphique(labels, valeurs) {
    const ctx = document.getElementById("visitsChart");
    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Visites",
                data: valeurs,
                borderColor: "#6A8F63",
                backgroundColor: "rgba(106,143,99,.15)",
                fill: true,
                tension: 0.18,
                radius: 5,
                hoverRadius: 8,
                pointBackgroundColor: "#6A8F63",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                borderWidth: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function afficherTopMeubles(meubles) {
    const conteneur = document.getElementById("topMeubles");
    if (!meubles || meubles.length === 0) {
        conteneur.innerHTML = `
            <p>Aucun meuble consulté pour le moment.</p>
        `;
        return;
    }
    const medailles = ["🥇","🥈","🥉"];
    const max = Math.max(...meubles.map(m => m.visits));
    conteneur.innerHTML = meubles.map((meuble,index)=>{
        const largeur = (meuble.visits / max) * 100;

    setTimeout(() => {
        document.querySelectorAll(".progress-fill").forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 50);

    return `

<div class="top-meuble">

    <div class="top-header">

        <div class="top-gauche">
            <span class="medaille">${medailles[index] || "🏅"}</span>
            <span class="nom-meuble">${meuble.title}</span>
        </div>

        <span class="nb-visites">
            👁 ${meuble.visits} vue(s)
        </span>

    </div>

    <div class="progress-zone">

        <div class="progress">
            <div
                class="progress-fill"
                data-width="${largeur}%"
                style="width:0%">
            </div>
        </div>

    </div>

</div>

`;
    }).join("");

}



