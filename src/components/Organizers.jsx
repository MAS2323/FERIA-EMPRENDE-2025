// src/components/Organizers.jsx (fixed: fallback for process.env if not defined)
import React, { useState, useEffect } from "react";
import axios from "axios";

// Fallback if process.env not available (e.g., custom build without CRA env support)
const getApiBase = () => {
  if (typeof process !== "undefined" && process.env) {
    return (
      process.env.REACT_APP_API_BASE ||
      "https://feria-emprende-2025-backend.onrender.com"
    );
  }
  return "https://feria-emprende-2025-backend.onrender.com"; // Hard fallback for browser-only environments
};

const API_BASE = getApiBase();

function Organizers() {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/organizers`);
      setOrganizers(res.data);
    } catch (error) {
      console.error("Error fetching organizers:", error);
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          Organizadores
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-8 text-center">
          Conoce a las marcas detrás de la tercera edición de la feria emprende:
        </p>
        <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-lg font-semibold text-gray-700">
          {organizers.map((org) => (
            <li
              key={org._id}
              className="flex items-center bg-cyan/20 p-4 rounded-lg"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="w-8 h-8 mr-2 rounded"
              />
              • {org.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Organizers;
