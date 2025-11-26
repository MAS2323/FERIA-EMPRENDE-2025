import React from "react";

function WhatIs() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          ¿Qué es la Feria Emprende?
        </h2>
        <p className="text-lg font-montserrat font-semibold text-gray-700 max-w-4xl mx-auto mb-6">
          La Feria Emprende es el mayor evento anual de emprendimiento,
          innovación y desarrollo empresarial de Guinea Ecuatorial. Reúne a
          jóvenes talentos, empresas, instituciones y profesionales en un
          espacio de inspiración, formación y colaboración para compartir ideas,
          crear alianzas y promover la educación financiera y digital como
          herramientas de progreso.
        </p>
        <p className="text-lg font-montserrat font-semibold text-gray-700 max-w-4xl mx-auto mb-6">
          Durante tres días, los visitantes podrán descubrir proyectos locales,
          asistir a talleres prácticos, participar en paneles con expertos y
          crear conexiones valiosas para el futuro.
        </p>
      </div>
    </section>
  );
}

export default WhatIs;
