async function demarrerApplication() {

    // On charge le fichier meubles.json
    const meubles = await chargerMeubles();

    // On affiche tous les meubles au démarrage
    afficherMeubles(meubles);

    const search = document.getElementById("search");

    search.addEventListener("input", () => {

        const recherche = search.value.toLowerCase();

        const meublesFiltres = meubles.filter((meuble) => {

            return (
                meuble.nom.toLowerCase().includes(recherche) ||
                meuble.categorie.toLowerCase().includes(recherche)
            );

        });

        afficherMeubles(meublesFiltres);

    });

}

demarrerApplication();



function afficherMeubles(meubles) {

    const cards = document.getElementById("cards");

    cards.innerHTML = "";
//
    meubles.forEach(meuble => {
//Pour chaque meuble, crée une carte et ajoute-la à la page.
        cards.insertAdjacentHTML(
            "beforeend",
            creerCarte(meuble)
        );

    });

}

