import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/contact", formData);
      setStatus("¡Gracias! Te contactaremos pronto.");
      setFormData({ email: "", message: "" });
    } catch (error) {
      setStatus("Error al enviar. Intenta de nuevo.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-cyan">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-montserrat font-extrabold mb-4">
            FERIA EMPRENDE 2025
          </h1>
          <p className="text-xl md:text-2xl font-montserrat font-semibold mb-8">
            Educación Financiera y Digitalización para el Futuro
          </p>
          <p className="text-lg mb-6">Malabo, 5 al 7 de diciembre de 2025</p>
          <p className="text-lg mb-8">
            El encuentro anual que impulsa la innovación, la educación
            financiera y el crecimiento de los emprendedores, networking,
            aprendizaje de Guinea Ecuatorial.
          </p>
          <button className="bg-primary hover:bg-teal text-white px-8 py-3 rounded-lg font-semibold text-lg">
            Ver programa completo
          </button>
        </div>
      </section>

      {/* ¿Qué es la Feria? */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
            ¿Qué es la Feria Emprende?
          </h2>
          <p className="text-lg font-montserrat font-semibold text-gray-700 max-w-4xl mx-auto mb-6">
            La Feria Emprende es el mayor evento anual de emprendimiento,
            innovación y desarrollo empresarial de Guinea Ecuatorial. Reúne a
            jóvenes talentos, empresas, instituciones y profesionales en un
            espacio de inspiración, formación y colaboración para compartir
            ideas, crear alianzas y promover la educación financiera y digital
            como herramientas de progreso.
          </p>
          <p className="text-lg font-montserrat font-semibold text-gray-700 max-w-4xl mx-auto mb-6">
            Durante tres días, los visitantes podrán descubrir proyectos
            locales, asistir a talleres prácticos, participar en paneles con
            expertos y crear conexiones valiosas para el futuro.
          </p>
        </div>
      </section>

      {/* Cómo nace la Feria */}
      <section className="py-16 px-4 bg-accent/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
            Cómo nace la Feria
          </h2>
          <p className="text-lg font-montserrat font-semibold text-gray-700 max-w-4xl mx-auto mb-6">
            Nació en 2022 con el propósito de fomentar el espíritu emprendedor y
            ofrecer una plataforma donde las ideas se transformen en
            oportunidades reales. Desde entonces, con el apoyo de instituciones,
            empresas y jóvenes visionarios, la feria ha crecido año tras año
            reuniendo a decenas de proyectos, inversores y entidades
            comprometidas con el desarrollo sostenible del país.
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
                Su tercera edición promete ser la más grande y formativa hasta
                la fecha, con más de 50 voluntarios, 30 emprendedores apoyando
                la organización.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zonas de la feria */}
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

      {/* Programa, Talleres, Concurso */}
      <section className="py-16 px-4 bg-secondary text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-montserrat font-extrabold mb-8 text-center">
            Programa de los tres días
          </h2>
          <p className="text-lg font-semibold mb-8 text-center">
            Talleres y paneles destacados • Concurso al Mejor Stand 2025
          </p>
          <p className="text-lg font-semibold max-w-4xl mx-auto mb-8">
            Durante los tres días, un jurado evaluará creatividad visual,
            presentación, innovación del producto, impacto de los stands y
            experiencia para el visitante. El ganador recibirá un reconocimiento
            especial y beneficios para su marca.
          </p>
        </div>
      </section>

      {/* Patrocinadores y Colaboradores */}
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
              <ul className="font-semibold text-gray-700">
                <li>• Afrimall</li>
                <li>• IMPYDE</li>
                <li>• Sol Media</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-secondary mb-4">
                Colaboradores institucionales:
              </h3>
              <ul className="font-semibold text-gray-700">
                <li>• Office Tech</li>
                <li>• Crece con Mike</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers y Participantes */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
            Organizadores
          </h2>
          <p className="text-lg font-semibold text-gray-700 mb-8 text-center">
            Feriantes y participantes: Más de 20 emprendedores locales
            presentarán sus proyectos innovadores en sectores como:
          </p>
          <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-lg font-semibold text-gray-700">
            <li>• Tecnología y servicios digitales</li>
            <li>• Moda y artesanía</li>
            <li>• Alimentación y bienestar</li>
            <li>• Educación y desarrollo personal</li>
          </ul>
        </div>
      </section>

      {/* Información práctica */}
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
            <a
              href="/dossier.pdf"
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold"
            >
              Descarga el dossier PDF aquí
            </a>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto (integra con backend) */}
      <section className="py-16 px-4 bg-secondary text-white">
        <div className="container mx-auto max-w-md">
          <h2 className="text-4xl font-montserrat font-extrabold mb-8 text-center">
            ¡Únete a nosotros!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Mensaje (opcional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg h-24"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-teal p-3 rounded-lg font-semibold"
            >
              Enviar
            </button>
          </form>
          {status && <p className="text-center mt-4 font-semibold">{status}</p>}
        </div>
      </section>

      {/* Cierre */}
      <footer className="py-8 px-4 bg-accent text-center text-white font-semibold space-y-4">
        <p>
          Sé parte del futuro del emprendimiento en Guinea Ecuatorial. Conecta,
          aprende y crece junto a la comunidad que está transformando el país.
        </p>
        <p>&copy; Powered by Tecnologías Más</p>
      </footer>
    </div>
  );
}

export default App;
