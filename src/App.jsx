// src/App.jsx (solo routers)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Gallery from "./components/Gallery";
import ProgramaCompletoFile from "./components/ProgramaCompletoFile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary to-cyan">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route
            path="/programa-completo-file"
            element={<ProgramaCompletoFile />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
