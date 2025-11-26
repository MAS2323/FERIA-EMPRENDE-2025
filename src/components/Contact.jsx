// src/components/Contact.jsx (fixed: fallback for process.env if not defined)
import React, { useState } from "react";
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

function Contact() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      setStatus("Por favor, ingresa un email válido.");
      return;
    }
    setIsLoading(true);
    setStatus("");
    try {
      await axios.post(`${API_BASE}/contact`, formData);
      setStatus("¡Gracias! Te contactaremos pronto.");
      setFormData({ email: "", message: "" });
    } catch (error) {
      setStatus("Error al enviar. Intenta de nuevo.");
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
            disabled={isLoading}
            className="w-full bg-primary hover:bg-teal p-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>
        {status && <p className="text-center mt-4 font-semibold">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;
