// src/App.jsx (solo routers)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary to-cyan">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
