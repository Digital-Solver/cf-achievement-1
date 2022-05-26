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

for (i = 0; i < pokemonList.length; i++) {
    document.write(
        `<p>${pokemonList[i].name}'s height is ${pokemonList[i].height}m. `
    );
    if (pokemonList[i].height >= 2) {
        document.write("<b>Wow, that's big! </b>");
    }
    document.write('</p>');
}
