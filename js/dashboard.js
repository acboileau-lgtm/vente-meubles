async function chargerMeubles() {

    function mettreAJourStatistique(id, valeur) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = valeur;
        }

    }

    const reponse = await fetch("data/meubles.json");
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

    console.log("Disponibles :", disponibles.length);
    console.log("Réservés :", reserves.length);
    console.log("Vendus :", vendus.length);
    console.log("Valeur restante :", valeurRestante);



}

chargerMeubles();



document.getElementById("last-visit").innerHTML =
    "Aujourd'hui à 15:42";

async function chargerFrequentation() {
    try {
        const response = await fetch("https://goatcounter-api.ac-boileau.workers.dev");

        if (!response.ok) {
            throw new Error("Impossible de récupérer les statistiques");
        }

        const stats = await response.json();

        document.getElementById("todayVisits").textContent = stats.today;
        document.getElementById("weekVisits").textContent = stats.week;
        document.getElementById("totalVisits").textContent = stats.total;

    } catch (err) {
        console.error(err);

        document.getElementById("todayVisits").textContent = "--";
        document.getElementById("weekVisits").textContent = "--";
        document.getElementById("totalVisits").textContent = "--";
    }
}

chargerFrequentation();
