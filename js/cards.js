function creerCarte(meuble) {

    return `
        <article class="card" data-reference="${meuble.reference}">

            <img
                src="photos/${meuble.photoPrincipale}"
                alt="${meuble.nom}"
            >

            <div class="card-content">

                <span class="badge">
                    ⭐ ${meuble.etat}
                </span>

                <h3>${meuble.nom}</h3>

                <div class="prix">

                    <span class="ancien">
                        ${meuble.prixNeuf} €
                    </span>

                    <span class="nouveau">
                        ${meuble.prixVente} €
                    </span>

                </div>

                <a href="#" class="card-link">
                    Découvrir →
                </a>

            </div>

        </article>
    `;

}