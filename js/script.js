const navList = document.querySelector(".nav-list"); // Obtén el elemento ul

const tiposPokemon = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dark",
  "Dragon",
  "Steel",
  "Fairy"
];

// Crea y agrega los botones al encabezado
tiposPokemon.map((tipo) => {
  const boton = document.createElement("button");
  boton.classList.add("btn", "btn-header", tipo.toLowerCase());
  boton.id = tipo.toLowerCase();
  boton.textContent = tipo;
  
  const listItem = document.createElement("li");
  listItem.classList.add("nav-item");
  listItem.appendChild(boton);
  
  navList.appendChild(listItem);
});

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn");
const URL = "https://pokeapi.co/api/v2/pokemon/";

// Función para cargar todos los Pokémon
async function cargarTodosLosPokemon() {
  listaPokemon.innerHTML = ""; // Limpia la lista de Pokémon

  for (let i = 1; i <= 1017; i++) {
    const response = await fetch(`${URL}${i}`);
    if (response.ok) {
      const data = await response.json();
      mostrarPokemon(data);
    }
  }
}

// Función para mostrar un Pokémon
function mostrarPokemon(poke) {
  const tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
  const pokeId = poke.id.toString().padStart(3, "0");

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
      <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
      </div>
      <div class="pokemon-tipos">
        ${tipos}
      </div>
      <div class="pokemon-stats">
        <p class="stat">${poke.height}m</p>
        <p class="stat">${poke.weight}kg</p>
      </div>
    </div>
  `;
  listaPokemon.append(div);
}

// Agregar eventos a los botones
botonesHeader.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    cargarPokemonPorTipo(botonId);
  });
});

// Agrega el evento al botón "Ver todos"
const verTodosBtn = document.querySelector("#ver-todos");
verTodosBtn.addEventListener("click", () => {
  cargarTodosLosPokemon();
});

// Función para cargar Pokémon por tipo
async function cargarPokemonPorTipo(tipo) {
  listaPokemon.innerHTML = ""; // Limpia la lista de Pokémon

  for (let i = 1; i <= 1017; i++) {
    const response = await fetch(`${URL}${i}`);
    if (response.ok) {
      const data = await response.json();
      const tipos = data.types.map((type) => type.type.name);
      if (tipos.includes(tipo)) {
        mostrarPokemon(data);
      }
    }
  }
}

// Cargar todos los Pokémon al cargar la página
cargarTodosLosPokemon();

