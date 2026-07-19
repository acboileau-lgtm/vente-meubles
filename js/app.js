async function demarrerApplication() {

    const meubles = await chargerMeubles();

    afficherMeubles(meubles);

}

demarrerApplication();

function afficherMeubles(meubles) {

    const cards = document.getElementById("cards");

    cards.innerHTML = "";

    meubles.forEach(meuble => {

        cards.insertAdjacentHTML(
            "beforeend",
            creerCarte(meuble)
        );

    });

}

