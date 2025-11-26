import React from "react";

function HowItBorn() {
  return (
    <section className="py-16 px-4 bg-accent/10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          Cómo nace la Feria
        </h2>
        <p className="text-lg font-montserrat font-semibold text-gray-700 max-w-4xl mx-auto mb-6">
          Nació en 2022 con el propósito de fomentar el espíritu emprendedor y
          ofrecer una plataforma donde las ideas se transformen en oportunidades
          reales. Desde entonces, con el apoyo de instituciones, empresas y
          jóvenes visionarios, la feria ha crecido año tras año reuniendo a
          decenas de proyectos, inversores y entidades comprometidas con el
          desarrollo sostenible del país.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-primary/20 p-6 rounded-lg">
            <h3 className="text-2xl font-extrabold text-secondary">2024</h3>
            <p className="font-semibold">
              Reunió a más de 23 emprendedores, 4 grandes empresas y 200
              visitantes por día.
            </p>
          </div>
          <div className="bg-teal/20 p-6 rounded-lg">
            <h3 className="text-2xl font-extrabold text-secondary">2025</h3>
            <p className="font-semibold">
              Su tercera edición promete ser la más grande y formativa hasta la
              fecha, con más de 50 voluntarios, 30 emprendedores apoyando la
              organización.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItBorn;
