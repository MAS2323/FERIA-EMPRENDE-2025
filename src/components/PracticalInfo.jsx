// src/components/PracticalInfo.jsx (fixed: fallback for process.env if not defined)
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

function PracticalInfo() {
  const [dossierUrl, setDossierUrl] = useState("");

  useEffect(() => {
    fetchDossier();
  }, []);

  const fetchDossier = async () => {
    try {
      const res = await axios.get(`${API_BASE}/documents?name=dossier.pdf`);
      setDossierUrl(res.data[0]?.url || "");
    } catch (error) {
      console.error("Error fetching dossier:", error);
    }
  };

  const downloadPDF = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "dossier.pdf";
    link.click();
  };

  return (
    <section className="py-16 px-4 bg-teal/10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          Información práctica
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto text-lg font-semibold text-gray-700">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-primary">Fechas</h3>
            <p>5 al 7 de diciembre de 2025</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-primary">Lugar</h3>
            <p>Afrimall</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-primary">Horario</h3>
            <p>9:00H – 18:00H</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-primary">Contacto</h3>
            <p>feriaemprende2025@outlook.es</p>
            <p>@feriaemprendegq</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => downloadPDF(dossierUrl)}
            className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold"
            disabled={!dossierUrl}
          >
            {dossierUrl ? "Descarga el dossier PDF aquí" : "Cargando..."}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PracticalInfo;
