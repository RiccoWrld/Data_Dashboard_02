import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DetailView from "./components/DetailView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pokemon/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
