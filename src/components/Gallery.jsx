// src/components/Gallery.jsx (updated: added stopPropagation to modal buttons for proper image navigation)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // For back navigation

// Fallback if process.env not available
const getApiBase = () => {
  if (typeof process !== "undefined" && process.env) {
    return (
      process.env.REACT_APP_API_BASE ||
      "https://feria-emprende-2025-backend.onrender.com"
    );
  }
  return "https://feria-emprende-2025-backend.onrender.com";
};

const API_BASE = getApiBase();

function Gallery() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/hero-images`); // No change: Keep fetching from /hero-images
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      // Fallback
      setImages([
        { url: "https://example.com/image1.jpg" },
        { url: "https://example.com/image2.jpg" },
        { url: "https://example.com/image3.jpg" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation(); // Prevent modal close on button click
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation(); // Prevent modal close on button click
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-white">Cargando galería...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary text-white py-8 px-4">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 mb-8 text-lg hover:text-primary transition-colors"
      >
        ← Volver al Inicio
      </Link>

      <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold text-center mb-8">
        Galería de Imágenes - Feria Emprende 2025
      </h1>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => openModal(index)}
          >
            <img
              src={image.url}
              alt={`Imagen ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full text-2xl"
          >
            ←
          </button>
          <img
            src={images[currentIndex]?.url}
            alt={`Imagen ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full text-2xl"
          >
            →
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal close on close button click
              closeModal();
            }}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          >
            ×
          </button>
          {/* Indicador de posición */}
          <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm opacity-75">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default Gallery;
