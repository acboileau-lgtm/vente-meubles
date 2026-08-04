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

    const interet = document.getElementById("modal-interest");


    image.src = `photos/${meuble.photos[0]}`;

    image.alt = meuble.nom;

    titre.textContent = meuble.nom;
    etat.textContent = meuble.etat;
    prix.textContent = `${meuble.prix.vente} €`;
    dimensions.textContent =
        `${meuble.dimensions.largeur} × ${meuble.dimensions.longueur} × ${meuble.dimensions.hauteur} cm`;
    couleur.textContent = meuble.couleur;
    matiere.textContent = meuble.materiaux;
    disponible.textContent = meuble.statut;
    description.textContent = meuble.description;

// 📊 GoatCounter : ouverture d'une fiche meuble
    if (window.goatcounter) {
        goatcounter.count({
            path: `/meuble/${meuble.id}`,
            title: meuble.nom,
            event: true
        });
    }


    if (meuble.statut === "Disponible") {

        interet.innerHTML = `
            <button class="interest-button">
                📩 Contacter le vendeur
            </button>
        `;

    }
    else if (meuble.statut === "Réservé") {

        interet.innerHTML = `
            <button class="interest-button reserved">
                ⏳ Je souhaite être recontacté(e)
            </button>
        `;

    }
    else {

        interet.innerHTML = `
            <button class="interest-button sold" disabled>
                ✔ Ce meuble a été vendu
            </button>
        `;

    }

    const bouton = interet.querySelector(".interest-button");

    if (bouton && !bouton.disabled) {
        bouton.addEventListener("click", () => {

        // 📊 GoatCounter : clic sur le bouton
        if (window.goatcounter) {
            goatcounter.count({
                path: `/contact/${meuble.id}`,
                title: meuble.nom,
                event: true
            });
        }

        contacterVendeur(meuble);
        fermerModal();
    });
    }
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
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
}

function fermerModal() {


    const modal = document.getElementById("modal");

    modal.classList.add("hidden");

}

document
    .querySelector(".close-button")
    .addEventListener("click", fermerModal);

document.addEventListener("click", function (event) {

   const carte = event.target.closest(".card");

    if (!carte) {
        return;
    }

    event.preventDefault(); 

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

function contacterVendeur(meuble) {
    const destinataire = "bacmarket59@proton.me";
    const sujet = `Demande de renseignements -  ${meuble.nom}`;
    const corps =
`Bonjour,

Demande de renseignements concernant le meuble :
${meuble.nom}
Prix : ${meuble.prix.vente} €
Référence : ${meuble.id}

Ce meuble est-il toujours disponible ?

Pouvez-vous SVP me recontacter pour avoir plus d'informations et éventuellement convenir d'un rendez-vous   ?

Merci d'avance.
Cordialement,

Voici mes coordonnées :
Nom : 
Téléphone : 

Merci.`;
    const mailto =
        `mailto:${destinataire}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    window.location.href = mailto;
}

