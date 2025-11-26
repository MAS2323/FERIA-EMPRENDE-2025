// src/components/Sponsors.jsx (fixed: fallback for process.env if not defined)
import React, { useState, useEffect } from "react";
import axios from "axios";

// Fallback if process.env not available (e.g., custom build without CRA env support)
const getApiBase = () => {
  if (typeof process !== "undefined" && process.env) {
    return process.env.REACT_APP_API_BASE || "http://localhost:3000";
  }
  return "http://localhost:3000"; // Hard fallback for browser-only environments
};

const API_BASE = getApiBase();

function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sponRes, collRes] = await Promise.all([
        axios.get(`${API_BASE}/sponsors`),
        axios.get(`${API_BASE}/collaborators`),
      ]);
      setSponsors(sponRes.data);
      setCollaborators(collRes.data);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
  };

  return (
    <section className="py-16 px-4 bg-accent/10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          Patrocinadores y colaboradores
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-extrabold text-secondary mb-4">
              Patrocinadores oficiales:
            </h3>
            <ul className="font-semibold text-gray-700 space-y-2">
              {sponsors.map((spon) => (
                <li key={spon._id} className="flex items-center">
                  <img
                    src={spon.logo}
                    alt={spon.name}
                    className="w-8 h-8 mr-2 rounded"
                  />
                  • {spon.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-secondary mb-4">
              Colaboradores institucionales:
            </h3>
            <ul className="font-semibold text-gray-700 space-y-2">
              {collaborators.map((coll) => (
                <li key={coll._id} className="flex items-center">
                  <img
                    src={coll.logo}
                    alt={coll.name}
                    className="w-8 h-8 mr-2 rounded"
                  />
                  • {coll.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
