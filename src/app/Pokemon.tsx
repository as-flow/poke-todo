import { PokemonType } from "@/types";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import pokemonData from "../../pokemonData.json";

interface PokeBall {
  name: string;
  minExp: number;
  maxExp: number;
}

const BALLS: PokeBall[] = [
  { name: "Poke Ball", minExp: 0, maxExp: 60 },
  { name: "Great Ball", minExp: 61, maxExp: 80 },
  { name: "Ultra Ball", minExp: 81, maxExp: 180 },
  { name: "Master Ball", minExp: 181, maxExp: 10000 },
];

const STORAGE_KEY = "caught_pokemon";

const Pokemon: React.FC = () => {
  const [caughtPokemon, setCaughtPokemon] = useState<PokemonType[]>([]);

  // Load caught Pokémon from AsyncStorage
  useEffect(() => {
    const loadCaughtPokemon = async () => {
      try {
        const storedPokemon = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedPokemon) {
          setCaughtPokemon(JSON.parse(storedPokemon));
        }
      } catch (error) {
        console.error("Failed to load caught Pokémon:", error);
      }
    };

    loadCaughtPokemon();
  }, []);

  // Save caught Pokémon to AsyncStorage
  useEffect(() => {
    const saveCaughtPokemon = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(caughtPokemon));
      } catch (error) {
        console.error("Failed to save caught Pokémon:", error);
      }
    };

    if (caughtPokemon.length > 0) {
      saveCaughtPokemon();
    }
  }, [caughtPokemon]);

  const getRandomPokemon = (minExp: number, maxExp: number) => {
    const availablePokemon = pokemonData.filter(
      (p) => p.base_experience >= minExp && p.base_experience <= maxExp
    );

    if (availablePokemon.length > 0) {
      const randomPokemon = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
      setCaughtPokemon((prev) => [...prev, randomPokemon]);
    } else {
      alert("No Pokémon found in this range!");
    }
  };

  const releasePokemon = async (index: number) => {
    const updatedPokemonList = caughtPokemon.filter((_, i) => i !== index);
    setCaughtPokemon(updatedPokemonList);

    // Save the updated list immediately after deletion
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPokemonList));
    } catch (error) {
      console.error("Failed to update storage after releasing Pokémon:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catch a Pokémon!</Text>
      <View style={styles.buttonsContainer}>
        {BALLS.map((ball, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => getRandomPokemon(ball.minExp, ball.maxExp)}
          >
            <Text style={styles.buttonText}>{ball.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>Caught Pokémon:</Text>
      <FlatList
        data={caughtPokemon}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.pokemonItem}>
            <Image source={{ uri: item.sprite }} style={styles.pokemonImage} />
            <Text style={styles.pokemonName}>{item.name}</Text>
            <TouchableOpacity style={styles.releaseButton} onPress={() => releasePokemon(index)}>
              <Text style={styles.releaseButtonText}>Release</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 18, marginTop: 20, fontWeight: "bold" },
  buttonsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  button: { backgroundColor: "#2196F3", padding: 10, margin: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  pokemonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: { width: 50, height: 50 },
  pokemonName: { fontSize: 16, textTransform: "capitalize", marginRight: 10 },
  releaseButton: { backgroundColor: "#ff4444", padding: 8, borderRadius: 5 },
  releaseButtonText: { color: "#fff", fontWeight: "bold" },
});

export default Pokemon;