/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-console */

const pokemonRepository = (function () {
  // Pokemon repository as an immediately invoked function expression

  // **Data**
  const pokemonList = [];
  const apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // **Functions**
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object'
            && Object.keys(pokemon)[0] === 'name'
            && Object.keys(pokemon)[1] === 'details'
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log(Object.keys(pokemon));
      alert('This is not an Object.');
    }
  }

  function loadList() {
    return fetch(apiURL)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            details: item.url,
          };
          add(pokemon);
        });
      })
      .catch((error) => error.message);
  }

  function loadDetails(item) {
    const url = item.details;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch((e) => console.log(e.message));
  }

  function find(query) {
    const nameList = [];

    pokemonList.forEach((pkmn) => {
      nameList.push(pkmn.name);
    });

    const matches = nameList.filter(
      (name) => name.toLocaleLowerCase() === query.toLocaleLowerCase(),
    );

    if (matches.length) {
      alert(`${query} found.\n`);
    } else {
      alert(`${query} not found.\nPlease search again.`);
    }
  }

  function hideModal() {
    const modalBody = document.querySelector('.modal-body');

    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
      console.log('removed');
    }
  }

  function hydrateModal(name, height, types, imgURL) {
    const modal = $('.modal');
    modal.on('hide.bs.modal', (e) => { hideModal(); });

    const modalBody = document.querySelector('.modal-body');
    const pokemonData = document.createElement('div');
    pokemonData.classList.add('pokemon-data');
    modalBody.appendChild(pokemonData);

    const nameLabel = document.createElement('h1');
    nameLabel.classList.add('name-label');

    const heightLabel = document.createElement('h2');
    heightLabel.classList.add('height-label');

    const spriteIcon = document.createElement('img');
    spriteIcon.classList.add('sprite-icon');
    spriteIcon.src = imgURL;

    const backgroundSpriteIcon = document.createElement('img');
    backgroundSpriteIcon.classList.add('sprite-icon__background');
    backgroundSpriteIcon.src = imgURL;

    nameLabel.innerText = name;
    heightLabel.innerText = `Height: ${height}`;

    const typesContainer = document.createElement('div');
    typesContainer.classList.add('types-container');

    for (let i = 0; i < types.length; i++) {
      const typeLabel = document.createElement('h3');
      typeLabel.classList.add('type-label');
      typeLabel.classList.add(`--${types[i].type.name}-type`);
      typeLabel.innerText = types[i].type.name;
      typesContainer.appendChild(typeLabel);
    }

    pokemonData.appendChild(nameLabel);
    pokemonData.appendChild(spriteIcon);
    pokemonData.appendChild(heightLabel);
    pokemonData.appendChild(typesContainer);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      hydrateModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageURL);
    });
  }

  function addListItem(pokemon) {
    const pokeList = document.querySelector('.pokemon-list');
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = pokemon.name;

    button.classList.add('poke-button');
    button.classList.add('btn');
    button.classList.add('list-group-item');
    button.classList.add('list-group-item-action');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#poke-modal');

    button.addEventListener('click', showDetails.bind(null, pokemon));
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
  }

  // **Keys**
  return {
    getAll,
    add,
    loadList,
    loadDetails,
    find,
    addListItem,
  };
}());

pokemonRepository.getAll().forEach((pokemon) => {
  // Print the pokemon details to DOM
  pokemonRepository.addListItem(pokemon);
});

const searchPokedex = (function () {
  // IIFE that searches the pokedex using the input from the user

  // **Functions**
  function search() {
    const query = document.getElementsByClassName('pokedex__search-field')[0].value;
    pokemonRepository.find(query);
  }

  // **Keys**
  return {
    search,
  };
}());

const searchBtn = document.getElementsByClassName('pokedex__search-button')[0]; // Event listener will search the pokedex
searchBtn.addEventListener('click', searchPokedex.search);

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((item) => pokemonRepository.addListItem(item));
});
