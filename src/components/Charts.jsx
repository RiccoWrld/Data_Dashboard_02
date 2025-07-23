import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Legend,
} from "recharts";

const Charts = ({ pokemonList }) => {
  // Chart 1: Type distribution (count of each Pokémon type)
  const typeCounts = {};
  pokemonList.forEach((p) => {
    p.types.forEach((t) => {
      const typeName = t.type.name;
      typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
    });
  });
  const typeData = Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
  }));

  // Chart 2: Base experience vs height scatter plot
  const scatterData = pokemonList.map((p) => ({
    name: p.name,
    baseExp: p.base_experience,
    height: p.height,
  }));

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Pokémon Type Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={typeData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "2rem" }}>Base Experience vs Height</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="height" name="Height" unit="dm" />
          <YAxis type="number" dataKey="baseExp" name="Base Experience" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Pokémon" data={scatterData} fill="#82ca9d" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
