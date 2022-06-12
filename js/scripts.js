let pokemonRepository = (function () {
    // Pokemon repository as an immediately invoked function expression

    // **Data**
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // **Functions**
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log(Object.keys(pokemon));
            alert('This is not an Object.');
        }
    }

    function loadList() {
        return fetch(apiURL)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        details: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch((error) => {
                return error.message;
            });
    }

    function loadDetails(item) {
        let url = item.details;
        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((details) => {
                item.imageURL = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch((e) => {
                return console.log(e.message);
            });
    }

    function find(query) {
        let nameList = [];

        pokemonList.forEach(function (pkmn) {
            nameList.push(pkmn.name);
        });

        let matches = nameList.filter(function checkName(name) {
            return name.toLocaleLowerCase() === query.toLocaleLowerCase();
        });

        if (matches.length) {
            alert(`${query} found.\n`);
        } else {
            alert(`${query} not found.\nPlease search again.`);
        }
    }

    function addListItem(pokemon) {
        function showDetails(pokemon) {
            loadDetails(pokemon).then(() => console.log(pokemon));
        }
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        button.classList.add('poke-button');

        button.addEventListener('click', showDetails.bind(null, pokemon));
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    // **Keys**
    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        find: find,
        addListItem: addListItem,
    };
})();

pokemonRepository.getAll().forEach((pokemon) => {
    // Print the pokemon details to DOM
    pokemonRepository.addListItem(pokemon);
});

let searchPokedex = (function (query) {
    // IIFE that searches the pokedex using the input from the user

    // **Functions**
    function search() {
        query = document.getElementsByClassName('pokedex__search-field')[0].value;
        pokemonRepository.find(query);
    }

    // **Keys**
    return {
        search: search,
    };
})();

let searchBtn = document.getElementsByClassName('pokedex__search-button')[0]; // Event listener will search the pokedex
searchBtn.addEventListener('click', searchPokedex.search);

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach((item) => pokemonRepository.addListItem(item));
});
