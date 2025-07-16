import { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import SummaryStats from "./SummaryStats";
import DataList from "./DataList";

const Dashboard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const json = await res.json();

        const detailedPromises = json.results.map(async (pokemon) => {
          const resDetail = await fetch(pokemon.url);
          return resDetail.json();
        });

        const detailedData = await Promise.all(detailedPromises);
        setPokemonList(detailedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const allTypes = useMemo(() => {
    const typesSet = new Set();
    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach((t) => typesSet.add(t.type.name));
    });
    return ["All", ...Array.from(typesSet).sort()];
  }, [pokemonList]);

  const filteredList = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "All" ||
        pokemon.types.some((t) => t.type.name === typeFilter);

      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, typeFilter]);

  const summary = useMemo(() => {
    if (filteredList.length === 0) return null;

    const total = filteredList.length;
    const avgBaseExp =
      filteredList.reduce((sum, p) => sum + p.base_experience, 0) / total;
    const avgHeight = filteredList.reduce((sum, p) => sum + p.height, 0) / total;

    return {
      total,
      avgBaseExp: avgBaseExp.toFixed(2),
      avgHeight: avgHeight.toFixed(2),
    };
  }, [filteredList]);

  if (loading) return <p>Loading Pokémon data...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>🦖 Pokémon Dashboard</h2>

      <SummaryStats summary={summary} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Filter
        allTypes={allTypes}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <DataList pokemonList={filteredList} />
    </div>
  );
};

export default Dashboard;
