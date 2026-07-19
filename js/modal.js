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

function afficherGaleriePhotos(meuble) {

    const galerie = document.getElementById("modal-thumbnails");
    galerie.innerHTML = "";
    
    meuble.photos.forEach(photo => {
        const miniature = document.createElement("img");
        const image = document.getElementById("modal-image");
        miniature.src = `photos/${photo}`;
        miniature.alt = `Photo du meuble ${meuble.nom}`;
        miniature.classList.add("modal-thumbnail");
            if (photo === meuble.photos[0]) {
            miniature.classList.add("active");
            }
        miniature.dataset.photo = photo;        
        miniature.addEventListener("click", function () {

        const miniatures = document.querySelectorAll(".modal-thumbnail");
        miniatures.forEach(function (miniature) {
            miniature.classList.remove("active");
        });
        miniature.classList.add("active");
        image.src = `photos/${photo}`;
        miniature.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });
    }); 
        galerie.appendChild(miniature);

        
    })
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
    afficherGaleriePhotos(meuble);

    ouvrirModal();

});