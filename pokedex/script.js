const main = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    const response = await (await fetch(url, options())).json();
    searchPokemon(response.results);
    console.log(response.results);
}

const searchPokemon = async (data) => {
    const main = document.querySelector('#main');
    const listPokemon = [];

    for (const pokemon of data) {
        const response = await (await fetch(pokemon.url, options())).json();
        listPokemon.push(await templateCard(response));
    }

   main.innerHTML = listPokemon.join('');
}

const attributes = int => int/10;

const templateCard = async (pokemon) => {
    return `
        <div class="card">
                <h1 class="title">${pokemon.name}</h1>
                <img class="pokemon" src="${pokemon.sprites.other.dream_world.front_default}" alt="">
                <div class="indice">
                    <div>
                        <p>${attributes(pokemon.height)}m</p>
                        <span class="sub-title">Height</span>
                    </div>
                    <div class="type">
                        ${templateChips(pokemon.types).join('')}
                        
                    </div>
                    <div>
                        <p>${attributes(pokemon.weight)}Kg</p>
                        <span class="sub-title">Weight</span>
                    </div>
                </div>
                <div class="stats">
                    <div class="stat">
                        <span>Hp</span>
                        <div class="bar">
                            <div class="percentage" style="width:${pokemon.stats[0].base_stat}%"></div>
                        </div>
                    </div>
                    <div class="stat">
                        <span>Attack</span>
                        <div class="bar">
                            <div class="percentage" style="width:${pokemon.stats[1].base_stat}%"></div>
                        </div>
                    </div>
                    <div class="stat">
                        <span>Deffense</span>
                        <div class="bar">
                            <div class="percentage" style="width:${pokemon.stats[2].base_stat}%"></div>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function templateChips(types) {
    const listTypes = [];
    for(const type of types) {
        let name = type.type.name;
        listTypes.push(
            `
                <span class="chip ${name}">${name}</span>
            `
        );
    }
    return listTypes;
}

function options () {
    return {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
}

main();