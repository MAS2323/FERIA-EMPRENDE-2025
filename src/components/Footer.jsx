// src/components/Footer.jsx (updated: using react-icons for all social media, added WhatsApp Business)
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-8 px-4 bg-accent text-center text-white font-semibold space-y-4">
      <p>
        Sé parte del futuro del emprendimiento en Guinea Ecuatorial. Conecta,
        aprende y crece junto a la comunidad que está transformando el país.
      </p>
      <div className="flex justify-center space-x-6 mb-4">
        {/* Social Media Icons with react-icons */}
        <a
          href="https://facebook.com/feriaemprende2025" // Reemplaza con tu URL real
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-2xl hover:text-primary transition-colors duration-300"
        >
          <FaFacebook />
        </a>
        <a
          href="https://x.com/feriaemprende2025" // Reemplaza con tu URL real (X/Twitter)
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="text-2xl hover:text-primary transition-colors duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/feriaemprende2025" // Reemplaza con tu URL real
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-2xl hover:text-primary transition-colors duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com/company/feriaemprende2025" // Reemplaza con tu URL real
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-2xl hover:text-primary transition-colors duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://wa.me/240123456789" // Reemplaza con tu número de WhatsApp Business (formato internacional, e.g., 240 para Guinea Ecuatorial)
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Business"
          className="text-2xl hover:text-primary transition-colors duration-300"
        >
          <FaWhatsapp />
        </a>
      </div>
      <p>&copy; Powered by Tecnologías Más</p>
    </footer>
  );
}

export default Footer;
