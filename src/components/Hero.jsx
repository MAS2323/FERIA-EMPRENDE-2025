// src/components/Hero.jsx (updated: use <img> with object-cover for full image visibility in hero)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Added for routing to admin

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

function Hero() {
  const [heroImages, setHeroImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/hero-images`);
      setHeroImages(res.data);
    } catch (error) {
      console.error("Error fetching hero images:", error);
      // Fallback images
      setHeroImages([
        { url: "https://example.com/image1.jpg" },
        { url: "https://example.com/image2.jpg" },
        { url: "https://example.com/image3.jpg" },
      ]);
    }
  };

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % heroImages.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  const openPDF = (url) => {
    window.open(url, "_blank");
  };

  const currentImage = heroImages[currentImageIndex]?.url || "";

  return (
    <section className="relative bg-secondary text-white py-20 px-4 overflow-hidden">
      {/* Subtle Admin Button - Top-right corner, semi-transparent, small icon/text */}
      <Link
        to="/admin"
        className="absolute top-4 right-4 z-20 opacity-60 hover:opacity-100 transition-opacity duration-300 text-sm font-semibold flex items-center space-x-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 hover:border-white/40"
        title="Panel Admin"
      >
        <span>⚙️ Admin</span>
      </Link>

      {/* Hero Background Image with full cover visibility */}
      {currentImage && (
        <img
          src={currentImage}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative container mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-montserrat font-extrabold mb-4">
          FERIA EMPRENDE 2025
        </h1>
        <p className="text-xl md:text-2xl font-montserrat font-semibold mb-8">
          Educación Financiera y Digitalización para el Futuro
        </p>
        <p className="text-lg mb-6">Malabo, 5 al 7 de diciembre de 2025</p>
        <p className="text-lg mb-8">
          El encuentro anual que impulsa la innovación, la educación financiera
          y el crecimiento de los emprendedores, networking, aprendizaje de
          Guinea Ecuatorial.
        </p>
        <button
          onClick={async () => {
            const res = await axios.get(
              `${API_BASE}/documents?name=programa.pdf`
            );
            const pdfUrl = res.data[0]?.url;
            openPDF(pdfUrl || "https://example.com/programa.pdf");
          }}
          className="bg-primary hover:bg-teal text-white px-8 py-3 rounded-lg font-semibold text-lg"
        >
          Ver programa completo
        </button>
      </div>
    </section>
  );
}

export default Hero;
