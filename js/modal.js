function afficherMeubleDansModal(meuble) {

    const image = document.getElementById("modal-image");
    const titre = document.getElementById("modal-title");
    const etat = document.getElementById("modal-state");
    const prix = document.getElementById("modal-price");

    const dimensions = document.getElementById("modal-dimensions");
    const couleur = document.getElementById("modal-color");
    const matiere = document.getElementById("modal-material");
    const disponible = document.getElementById("modal-availability");

    const description = document.getElementById("modal-description");



    image.src = `photos/${meuble.photos[0]}`;
    image.alt = meuble.nom;

    titre.textContent = meuble.nom;
    etat.textContent = meuble.etat;
    prix.textContent = `${meuble.prixVente} €`;
    dimensions.textContent =
        `${meuble.dimensions.largeur} × ${meuble.dimensions.profondeur} × ${meuble.dimensions.hauteur} cm`;
    couleur.textContent = meuble.couleur;
    matiere.textContent = meuble.matiere;
    disponible.textContent =
        meuble.disponible
            ? "Disponible"
            : "Vendu";
    description.textContent = meuble.description;



}

function ouvrirModal() {
    console.log("Ouverture de la fenêtre");
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
}

function fermerModal() {

    console.log("Je ferme la fenêtre");

    const modal = document.getElementById("modal");

    modal.classList.add("hidden");

}

document
    .querySelector(".close-button")
    .addEventListener("click", fermerModal);

document.addEventListener("click", function (event) {

    if (!event.target.classList.contains("card-link")) {
        return;
    }

    event.preventDefault();

    const carte = event.target.closest(".card");
    const reference = carte.dataset.reference;

    const meuble = trouverMeuble(reference);

    if (!meuble) {
        console.error("Meuble introuvable :", reference);
        return;
    }

    afficherMeubleDansModal(meuble);

    ouvrirModal();

});