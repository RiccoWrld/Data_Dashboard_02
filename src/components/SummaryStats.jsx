const SummaryStats = ({ summary }) => {
  if (!summary) return null;

  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f9f9f9",
      }}
    >
      <p>
        <strong>Total Pokémon:</strong> {summary.total}
      </p>
      <p>
        <strong>Average Base Experience:</strong> {summary.avgBaseExp}
      </p>
      <p>
        <strong>Average Height (decimetres):</strong> {summary.avgHeight}
      </p>
    </div>
  );
};

export default SummaryStats;
