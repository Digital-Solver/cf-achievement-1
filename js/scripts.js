// Pokemon repository as an immediately invoked function expression
let pokemonRepository = (function () {
    // Pokemon list
    let pokemonList = [
        { id: 1, name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 0.7 },
        { id: 2, name: 'Ivysaur', type: ['Grass', 'Poison'], height: 1.0 },
        { id: 3, name: 'Venusaur', type: ['Grass', 'Poison'], height: 2.0 },

        { id: 4, name: 'Charmander', type: ['Fire'], height: 0.6 },
        { id: 5, name: 'Charmeleon', type: ['Fire'], height: 1.1 },
        { id: 6, name: 'Charizard', type: ['Fire', 'Flying'], height: 1.7 },

        { id: 7, name: 'Squirtle', type: ['Water'], height: 0.5 },
        { id: 8, name: 'Wartortle', type: ['Water'], height: 1.0 },
        { id: 9, name: 'Blastoise', type: ['Water'], height: 1.6 },
    ];

    //Functions
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            if (
                Object.keys(pokemon)[0] === 'id' &&
                Object.keys(pokemon)[1] === 'name' &&
                Object.keys(pokemon)[2] === 'type' &&
                Object.keys(pokemon)[3] === 'height'
            ) {
                pokemonList.push(pokemon);
            } else {
                alert(
                    `Pokemon object must follow this format:\n
                    id,name,type,height\n
                    Your object has the following format:\n
                    ${Object.keys(pokemon)}`
                );
            }
        } else {
            console.log(Object.keys(pokemon));
            alert('This is not an Object.');
        }
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

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('poke-button');
        button.addEventListener('click', showDetails.bind(null, pokemon));
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    // Keys
    return {
        add: add,
        getAll: getAll,
        find: find,
        addListItem: addListItem,
    };
})();

pokemonRepository.add({ id: 99, name: 'Mew', type: ['Psychic'], height: 0.2 });

// Loop that prints the pokemon details to the DOM

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

// IIFE that searches the pokedex using the input from the user
let searchPokedex = (function (query) {
    //Functions
    function search() {
        query = document.getElementsByClassName('pokedex__search-field')[0].value;
        pokemonRepository.find(query);
    }

    // Keys
    return {
        search: search,
    };
})();

// Add event listener to the search button to execute the searchPokedex function
searchBtn = document.getElementsByClassName('pokedex__search-button')[0];
searchBtn.addEventListener('click', searchPokedex.search);
