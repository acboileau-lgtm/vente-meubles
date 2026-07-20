async function demarrerApplication() {
//on charge le fichier meubles.json ;
//on récupère tous les meubles ;
//on appelle afficherMeubles(meubles).
    const meubles = await chargerMeubles();

    afficherMeubles(meubles);

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

