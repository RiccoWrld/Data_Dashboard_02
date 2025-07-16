
const Filter = ({ allTypes, typeFilter, setTypeFilter }) => {
  return (
    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      style={{
        width: "100%",
        padding: "8px",
        marginBottom: "1rem",
        fontSize: "1rem",
        boxSizing: "border-box",
      }}
    >
      {allTypes.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default Filter;
