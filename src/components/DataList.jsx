
const DataList = ({ pokemonList }) => {
  if (pokemonList.length === 0) return <p>No Pokémon found.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {pokemonList.map((pokemon) => (
        <li
          key={pokemon.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            background: "#fff",
          }}
        >
          <a
            href={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flex: 1,
            }}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: "50px", height: "50px", marginRight: "1rem" }}
            />
            <div>
              <strong>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </strong>{" "}
              (ID: {pokemon.id})
              <br />
              Base experience: {pokemon.base_experience}
              <br />
              Height: {pokemon.height} decimetres
              <br />
              Types:{" "}
              {pokemon.types
                .map(
                  (t) =>
                    t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                )
                .join(", ")}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DataList;
