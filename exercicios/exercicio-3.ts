const axios = require("axios");
const { AxiosError } = require("axios").create();

interface CharacterResult {
  name: string;
  gender: string;
  image: string;
  species: string;
}

interface CharacterResponse {
  results: CharacterResult[];
}

interface Character {
  nome: string;
  genero: "Homem" | "Mulher";
  avatar: string;
  especie: string;
}

async function getRickAndMortyCharacters(): Promise<Character[]> {
  const names: string[] = [
    "Rick Sanchez",
    "Morty Smith",
    "Summer Smith",
    "Beth Smith",
    "Jerry Smith",
  ];
  try {
    const responses = await Promise.all(
      names.map((name: string) =>
        axios
          .get(
            `https://rickandmortyapi.com/api/character?name=${name}`
          )
          .then((res: { data: { results: CharacterResult[] } }) => res.data.results)
      )
    );
    
    const characters = responses
      .flat()
      .map((character: CharacterResult) => ({
        nome: character.name,
        genero: character.gender === "Male" ? "Homem" : "Mulher",
        avatar: character.image,
        especie: character.species,
      }));
    return Promise.resolve(characters as Character[])
  } catch (error: typeof AxiosError) {
    console.error(error);
    return [] as Character[];
  }
}

module.exports = getRickAndMortyCharacters;
