# Mon aide-mémoire (de vieille développeuse 😂)

> Créé pendant le développement du projet "Vente de meubles".
>
> Ce document contient uniquement les notions que j'ai rencontrées
> et comprises pendant le projet.
>
> Ce n'est pas un cours de JavaScript.
> C'est MON aide-mémoire.


## Objet

Un objet est un conteneur qui regroupe plusieurs informations
(propriétés) et parfois des fonctions (méthodes).

Exemple :

const workbook = XLSX.readFile(...);

Le point permet d'accéder à une propriété.

workbook.SheetNames

↓

Dans l'objet workbook,
je veux la propriété SheetNames.

## sheet_to_json()

Définition

Convertit une feuille Excel (worksheet) en un tableau d'objets JavaScript.

Exemple

const meubles = XLSX.utils.sheet_to_json(worksheet);

Chaque ligne Excel devient un objet.

Chaque colonne devient une propriété.

Exemple

Excel :

Ref	Nom	Prix
001	Canapé	630

↓

JavaScript :

{
    Ref: "001",
    Nom: "Canapé",
    "Prix de vente": 630
}

💡 À retenir

sheet_to_json() ne crée pas encore un fichier JSON. Il crée un objet JavaScript que l'on pourra ensuite modifier, filtrer et enregistrer au format JSON.

## map()

Définition

map() parcourt tous les éléments d'un tableau et construit un nouveau tableau.

Exemple

const nombres = [1, 2, 3];

const doubles = nombres.map((nombre) => {
    return nombre * 2;
});

Résultat :

[2, 4, 6]

💡 À retenir

map() ne modifie pas le tableau d'origine.
Il crée un nouveau tableau.
Chaque élément est transformé selon les règles que tu écris.

## undefined

Définition

undefined signifie :

« Cette propriété n'existe pas ou n'a pas de valeur. »

Exemple :

const meuble = {
    Nom: "Canapé"
};

console.log(meuble.Ref);

Résultat :

undefined

💡 À retenir

Si tu vois undefined, demande-toi toujours :

Est-ce que la propriété existe ?
Est-ce que son nom est correctement écrit ?
Est-ce que la donnée est bien présente ?

## filter()

Définition

filter() parcourt un tableau et conserve uniquement les éléments qui respectent une condition.

Exemple

const meublesFiltres = meubles.filter((meuble) => {
    return meuble.Ref;
});

Ici :

si meuble.Ref existe → le meuble est conservé ;
sinon → il est supprimé.

💡 À retenir

filter() ne modifie pas le tableau d'origine.
Il crée un nouveau tableau.
Il est souvent utilisé avant map() pour ne transformer que les éléments utiles.

## for

Structure d'une boucle :

for (initialisation ; condition ; évolution) {

}

Exemple :

for (let i = 1; i <= 5; i++) {
    console.log(i);
}

Affiche :

1
2
3
4
5

💡 À retenir

Une boucle for sert à répéter une action un certain nombre de fois.

## push()

Définition

Ajoute un élément à la fin d'un tableau.

Exemple

const photos = [];

photos.push("001-01.jpeg");
photos.push("001-02.jpeg");

Résultat :

[
   "001-01.jpeg",
   "001-02.jpeg"
]

💡 À retenir

push() ajoute un élément à la fin du tableau.
Le tableau est modifié directement.

## toString()

Transforme une valeur en texte.

Exemple :

123

↓

"123"

## padStart()

Complète un texte au début.

Exemple :

"7".padStart(2, "0")

↓

"07"
"15".padStart(2, "0")

↓

"15"

## const avec un tableau
const photos = [];

Cela ne signifie pas que le tableau est immuable.

Cela signifie que la variable photos pointera toujours vers le même tableau.

✔️ Autorisé :

photos.push("001-01.jpeg");

❌ Interdit :

photos = [];

💡 À retenir

const empêche de réaffecter la variable, pas de modifier le contenu d'un objet ou d'un tableau.

## Écriture abrégée des propriétés

Quand une variable porte le même nom que la propriété de l'objet, on peut écrire :

const photos = [];

return {
    photos
};

Au lieu de :

return {
    photos: photos
};

💡 À retenir

Cette écriture est un raccourci. Les deux versions produisent exactement le même résultat.

## Format ISO des dates

Stocker les dates sous la forme :

AAAA-MM-JJ

Exemple :

"dateAchat": "2026-02-01"

💡 À retenir

Les données sont stockées dans un format standard. C'est l'interface du site qui choisit comment les afficher.
## fs

Définition

Le module File System de Node.js.

Il permet de manipuler les fichiers et dossiers.

Exemple :

const fs = require("fs");

💡 À retenir

Contrairement à xlsx, il n'est pas nécessaire de l'installer avec npm.

## JSON.stringify()

Définition

Transforme un objet JavaScript en texte JSON.

Exemple :

JSON.stringify(objet)

Pour un JSON bien présenté :

JSON.stringify(objet, null, 2)

Le 2 indique le nombre d'espaces utilisés pour l'indentation.

💡 À retenir

JSON.stringify(objet) → JSON compact.
JSON.stringify(objet, null, 2) → JSON lisible.



