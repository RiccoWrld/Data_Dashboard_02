const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "100%",
        padding: "8px",
        marginBottom: "1rem",
        fontSize: "1rem",
        boxSizing: "border-box",
      }}
    />
  );
};

export default SearchBar;
