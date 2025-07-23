import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import SummaryStats from "./SummaryStats";

const DetailView = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sidebar state (shared with Dashboard)
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [pokemonList, setPokemonList] = useState([]);

  // Fetch all Pokémon to power sidebar filters and summary
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const json = await res.json();
        const detailedPromises = json.results.map(async (poke) => {
          const resDetail = await fetch(poke.url);
          return resDetail.json();
        });
        const detailedData = await Promise.all(detailedPromises);
        setPokemonList(detailedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  // Fetch detail for current Pokémon
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // Sidebar logic for types
  const allTypes = useMemo(() => {
    const typesSet = new Set();
    pokemonList.forEach((p) => {
      p.types.forEach((t) => typesSet.add(t.type.name));
    });
    return ["All", ...Array.from(typesSet).sort()];
  }, [pokemonList]);

  // Filtered Pokémon for summary & sidebar
  const filteredList = useMemo(() => {
    return pokemonList.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "All" || p.types.some((t) => t.type.name === typeFilter);
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, typeFilter]);

  // Summary for sidebar
  const summary = useMemo(() => {
    if (filteredList.length === 0) return null;
    const total = filteredList.length;
    const avgBaseExp =
      filteredList.reduce((sum, p) => sum + p.base_experience, 0) / total;
    const avgHeight =
      filteredList.reduce((sum, p) => sum + p.height, 0) / total;
    return {
      total,
      avgBaseExp: avgBaseExp.toFixed(2),
      avgHeight: avgHeight.toFixed(2),
    };
  }, [filteredList]);

  if (loading) return <p>Loading Pokémon details...</p>;
  if (!pokemon) return <p>Pokémon not found.</p>;

  return (
    <div
      style={{ maxWidth: 900, margin: "auto", fontFamily: "Arial, sans-serif" }}
    >
      <h2>
        Pokémon Detail:{" "}
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <Link to="/">← Back to Dashboard</Link>

      <div style={{ display: "flex", marginTop: "1rem", gap: "2rem" }}>
        {/* Main detail section */}
        <div
          style={{
            flex: 3,
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            background: "#fff",
          }}
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ width: "150px", height: "150px" }}
          />
          <p>
            <strong>ID:</strong> {pokemon.id}
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height} decimetres
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight} hectograms
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          {/* Additional details */}
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
          <p>
            <strong>Moves count:</strong> {pokemon.moves.length}
          </p>

          {/* Stats */}
          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar: Search, Filter, Summary */}
        <aside style={{ flex: 1, minWidth: "200px" }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter
            allTypes={allTypes}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          <SummaryStats summary={summary} />
        </aside>
      </div>
    </div>
  );
};

export default DetailView;
