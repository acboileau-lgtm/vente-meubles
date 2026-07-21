function creerCarte(meuble) {

    return `
        <article class="card" data-reference="${meuble.id}">

            <img
                src="photos/${meuble.photos[0]}"
                alt="${meuble.nom}"
            >

            <div class="card-content">

                <span class="badge ${meuble.statut.toLowerCase()}">
                    ${meuble.statut}
                </span>

                <h3>${meuble.nom}</h3>

                <div class="prix">

                    <span class="ancien">
                        ${meuble.prix.neuf} €
                    </span>

                    <span class="nouveau">
                        ${meuble.prix.vente} €
                    </span>

                </div>

                <a href="#" class="card-link">
                    Découvrir →
                </a>

            </div>

        </article>
    `;

}