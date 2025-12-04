// src/components/PracticalInfo.jsx (updated: link to /programa-completo-file)
import React from "react";
import { Link } from "react-router-dom";

function PracticalInfo() {
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
          <Link
            to="/programa-completo-file"
            className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold inline-block hover:bg-teal transition-colors"
          >
            Ver programa completo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PracticalInfo;
