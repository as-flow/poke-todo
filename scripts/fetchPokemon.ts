import { Pokemon } from "@/types";
import axios from "axios";
import fs from "fs";

const fetchAndProcessPokemon = async () => {
  try {
    console.log("Fetching Pokémon list...");
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");

    const filteredPokemon: Pokemon[] = [];

    for (const pokemon of data.results) {
      const pokeData = await axios.get(pokemon.url);
      const speciesData = await axios.get(pokeData.data.species.url);

      const baseExp: number = pokeData.data.base_experience;
      const hasEvolutions: boolean = speciesData.data.evolves_from_species !== null;

      if (!hasEvolutions) {
        filteredPokemon.push({
          name: pokeData.data.name,
          sprite: pokeData.data.sprites.front_default,
          base_experience: baseExp,
        });
      }
    }

    console.log(`Filtered Pokémon count: ${filteredPokemon.length}`);
    
    // Save to JSON file
    fs.writeFileSync("pokemonData.json", JSON.stringify(filteredPokemon, null, 2));
    console.log("Pokemon data saved to pokemonData.json");
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};

fetchAndProcessPokemon();