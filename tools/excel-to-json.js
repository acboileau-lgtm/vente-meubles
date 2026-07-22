const XLSX = require("xlsx");
const fs = require("fs");


//const workbook = XLSX.readFile("./docs/Box GardeMeuble.xlsx");
const workbook = XLSX.readFile("./docs/Box GardeMeuble.xlsx", {
    cellDates: true
});

const worksheet = workbook.Sheets["Meubles"];
// ou : workbook.Sheets[workbook.SheetNames[0]]

const meubles = XLSX.utils.sheet_to_json(worksheet);
;

const meublesFiltres = meubles.filter((meuble) => {
    return meuble.Ref;
});

const meublesTransformes = meublesFiltres.map((meuble) => {

    // Création du tableau des photos
    const photos = [];

    // Génération automatique des noms des photos
    for (let i = 0; i < meuble["Nb Photos"]; i++) {

        photos.push(
            meuble.Ref +
            "-" +
            (i + 1).toString().padStart(2, "0") +
            ".jpg"
        );

    }


    // Construction du nouvel objet
    return {

        id: meuble.Ref,
        categorie: meuble.Categorie,
        nom: meuble.Nom,
        etat: meuble.Etat,
        statut: meuble.Statut,

        dimensions: {
            longueur: meuble.Long,
            largeur: meuble.Larg,
            hauteur: meuble.Haut
        },

        prix: {
            neuf: Math.round(meuble["Prix neuf"]),
            vente: Math.round(meuble["Prix de vente"])
        },

        dateAchat: formatDate(meuble["Date d'achat"]),
   
        couleur: meuble.Couleur,
        materiaux: meuble["Matière"],
        description: meuble.Description,

        photos

    };

});



fs.writeFileSync(
    "./data/meubles.json",
    JSON.stringify(meublesTransformes, null, 2)
);

console.log("✅ data/meubles.json généré avec succès.");

function formatDate(date) {
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");

    return `${annee}-${mois}-${jour}`;
}