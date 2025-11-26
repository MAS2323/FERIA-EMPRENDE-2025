import React from "react";

function Zones() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          Zonas de la feria
        </h2>
        <p className="text-center mb-12 font-semibold">
          Explora las diferentes áreas que componen la experiencia Emprende
          2025:
        </p>
        <ul className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-lg font-semibold text-gray-700">
          <li className="bg-cyan/20 p-4 rounded-lg">Zona feriantes</li>
          <li className="bg-cyan/20 p-4 rounded-lg">Zona educativa</li>
          <li className="bg-cyan/20 p-4 rounded-lg">Zona infantil</li>
          <li className="bg-cyan/20 p-4 rounded-lg">Zona digital</li>
          <li className="bg-cyan/20 p-4 rounded-lg">
            Zona escenario y paneles
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Zones;
