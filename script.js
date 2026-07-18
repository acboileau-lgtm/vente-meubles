async function chargerMeubles() {

    const reponse = await fetch("data/meubles.json");
    const meubles = await reponse.json();

    const cards = document.getElementById("cards");

    meubles.forEach(meuble => {

        cards.innerHTML += `

        <article class="card">

            <img src="photos/${meuble.photo}" alt="${meuble.nom}">

            <div class="card-content">

                <h3>${meuble.nom}</h3>

                <p class="etat">
                    ⭐ ${meuble.etat}
                </p>

                <div class="prix">

                    <span class="ancien">
                        ${meuble.prixNeuf} €
                    </span>

                    <span class="nouveau">
                        ${meuble.prixVente} €
                    </span>

                </div>

                <button>

                    Découvrir ce meuble

                </button>

            </div>

        </article>

        `;

    });

}

chargerMeubles();