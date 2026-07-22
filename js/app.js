async function demarrerApplication() {

    // On charge le fichier meubles.json
    const meubles = await chargerMeubles();

    meubles.sort((meubleA, meubleB) => {

    if (meubleA.categorie === meubleB.categorie) {

        return meubleA.nom.localeCompare(meubleB.nom);

    }

    return meubleA.categorie.localeCompare(meubleB.categorie);

});

    // On affiche tous les meubles au démarrage
    afficherCatalogue(meubles);

    const search = document.getElementById("search");

    search.addEventListener("input", () => {

        const recherche = search.value.toLowerCase();

        const meublesFiltres = meubles.filter((meuble) => {

            return (
                meuble.nom.toLowerCase().includes(recherche) ||
                meuble.categorie.toLowerCase().includes(recherche)
            );

        });

        afficherCatalogue(meublesFiltres);

    });

}

demarrerApplication();



function afficherCatalogue(meubles) {

    const catalogue = document.getElementById("catalogue");

    catalogue.innerHTML = "";

    let categorieCourante = "";
    let grilleCourante = null;

    meubles.forEach(meuble => {

        if (categorieCourante !== meuble.categorie) {

            categorieCourante = meuble.categorie;

            const section = document.createElement("section");
            section.className = "categorie";

            const titre = document.createElement("h2");
            titre.textContent = creerTitreCategorie(categorieCourante);

            grilleCourante = document.createElement("div");
            grilleCourante.className = "cards";

            section.appendChild(titre);
            section.appendChild(grilleCourante);

            catalogue.appendChild(section);
        }

        grilleCourante.insertAdjacentHTML(
            "beforeend",
            creerCarte(meuble)
        );

    });

}

function creerTitreCategorie(categorie) {

    const icones = {
        "Salon": "🛋️",
        "Chambre": "🛏️",
        "Cuisine": "🍽️",
        "Bureau": "💻",
        "Entrée": "🚪",
        "Salle à manger": "🍷"
    };

    return `${icones[categorie] ?? "📦"} ${categorie}`;
}

