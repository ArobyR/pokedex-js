const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener('click', getPokemon,);
const pokemonInput = document.getElementById("pokemon-input");
const pokemonImg = document.getElementById("poke-img");
const pokemonCard = document.getElementById("card");
pokemonCard.classList.add("invisible");
const cardError = document.getElementById("card-error");
cardError.classList.add("invisible");

async function getPokemon() {
    let pokemonInputValue = pokemonInput.value;
    if (!isCorrectValue(pokemonInputValue)) {
        showValue(false);
        return;
    }
    showValue(true);
    let request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInputValue}`);
    if (request.ok) {
        let responseInJson = await request.json();
        showPokemon(responseInJson); 
    }
    else {
        showError();
    }
}

function isCorrectValue(pokemonInputValue) {
    if (pokemonInputValue.length >= 1 && pokemonInputValue.length < 30) return true;
    else {
        return false;
    }
}

function showValue(confirm) {
    if (confirm) pokemonInput.style.border = '2px solid #000';
    else {
        pokemonInput.style.border = '2px solid #f00';
    }
}

function showPokemon(pokemon) {
    pokemonCard.classList.remove("invisible");
    cardError.classList.add("invisible");
    pokemonImg.setAttribute('src', pokemon.sprites.front_default);
    document.getElementById("name").textContent = pokemon.name;
    document.getElementById("content-id").textContent = pokemon.id;
    let pokemonHeight = pokemon.height / 10;
    document.getElementById("content-height").textContent = pokemonHeight + ' m'; 
    let pokemonWeight = pokemon.weight / 10;
    document.getElementById("content-weight").textContent = pokemonWeight + ' Kg';
    let types = pokemon.types;
    let type_name = types.map(function(poke) {
        return poke.type.name;
    });
    let typeInStr = type_name.toString();
    document.getElementById('content-type').textContent = typeInStr.replace(',' , ' ');
}

function showError() {
    if(cardError.className == "invisible") {
        cardError.classList.remove("invisible");
        pokemonCard.classList.add("invisible");
        cardError.style.width = "80%";
        cardError.style.maxWidth = "500px";
        cardError.style.height = "200px";
        cardError.style.paddingTop = "40px";
        cardError.style.backgroundColor = "#fff";
    }
}