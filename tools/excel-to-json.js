const XLSX = require("xlsx");
const fs = require("fs");


const workbook = XLSX.readFile("./docs/Box GardeMeuble.xlsx");

const worksheet = workbook.Sheets["Meubles"];
// ou : workbook.Sheets[workbook.SheetNames[0]]

const meubles = XLSX.utils.sheet_to_json(worksheet, {
    raw: false
});

console.log(meubles);

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
            ".jpeg"
        );

    }

    // Construction du nouvel objet
    return {

        id: meuble.Ref,
        categorie: meuble.Categorie,
        nom: meuble.Nom,
        etat: meuble.Etat,

        dimensions: {
            longueur: meuble.Long,
            largeur: meuble.Larg,
            hauteur: meuble.Haut
        },

        prix: {
            neuf: Math.round(meuble["Prix neuf"]),
            vente: Math.round(meuble["Prix de vente"])
        },

        dateAchat: meuble["Date d'achat"],

        couleur: meuble.Couleur,
        materiaux: meuble["Matière"],
        description: meuble.Description,

        photos

    };

});

//console.log(meublesTransformes);

fs.writeFileSync(
    "./data/meubles.json",
    JSON.stringify(meublesTransformes, null, 2)
);

console.log("✅ data/meubles.json généré avec succès.");