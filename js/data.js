let meubles = [];

async function chargerMeubles() {

    const reponse = await fetch("data/meubles.json");

    if (!reponse.ok) {
        throw new Error("Impossible de charger les meubles.");
    }

    meubles = await reponse.json();

    return meubles;

}

function trouverMeuble(reference) {

    return meubles.find(
        meuble => meuble.id === reference
    );

}