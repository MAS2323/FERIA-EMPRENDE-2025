// src/components/Admin.jsx (corregido: puerto 3000, fixes en forms para hero-images y documents, DELETE en todos los tabs)
import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [activeTab, setActiveTab] = useState("sponsors");
  const [sponsors, setSponsors] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // success/error

  const [newSponsor, setNewSponsor] = useState({ name: "" });
  const [newCollaborator, setNewCollaborator] = useState({ name: "" });
  const [newOrganizer, setNewOrganizer] = useState({ name: "" });
  const [newHeroImage, setNewHeroImage] = useState({ order: 0 });
  const [newDocument, setNewDocument] = useState({ name: "" });

  const API_BASE = "http://localhost:3000"; // ¡CAMBIO: Puerto 3000 para el backend Node.js!

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sponRes, collRes, orgRes, heroRes, docRes] = await Promise.all([
        axios.get(`${API_BASE}/sponsors`),
        axios.get(`${API_BASE}/collaborators`),
        axios.get(`${API_BASE}/organizers`),
        axios.get(`${API_BASE}/hero-images`),
        axios.get(`${API_BASE}/documents`),
      ]);
      setSponsors(sponRes.data);
      setCollaborators(collRes.data);
      setOrganizers(orgRes.data);
      setHeroImages(heroRes.data);
      setDocuments(docRes.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setMessage({
        text: "Error al cargar datos. Verifica que el backend esté corriendo en puerto 3000.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const createItem = async (endpoint, data, fileKey = null) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== fileKey) formData.append(key, data[key]);
    });
    // Para hero-images: append múltiples archivos como "images"
    if (endpoint === "hero-images" && data[fileKey]) {
      Array.from(data[fileKey]).forEach(
        (file) => formData.append("images", file) // ¡FIX: Campo "images" para backend
      );
    } else if (data[fileKey]) {
      formData.append(fileKey, data[fileKey]);
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Reset form based on tab
      if (endpoint === "sponsors") setNewSponsor({ name: "" });
      if (endpoint === "collaborators") setNewCollaborator({ name: "" });
      if (endpoint === "organizers") setNewOrganizer({ name: "" });
      if (endpoint === "hero-images") setNewHeroImage({ order: 0 });
      if (endpoint === "documents") setNewDocument({ name: "" });
      fetchData();
      showMessage(`Elemento(s) agregado(s) exitosamente.`, "success");
    } catch (error) {
      console.error(`Error creating ${endpoint}:`, error);
      showMessage("Error al agregar elemento(s).", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (endpoint, id, itemName) => {
    if (!confirm(`¿Eliminar ${itemName}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${endpoint}/${id}`); // ¡CAMBIO: Puerto 3000
      fetchData();
      showMessage("Elemento eliminado exitosamente.", "success");
    } catch (error) {
      console.error("Error deleting:", error);
      showMessage(
        "Error al eliminar elemento. (Asegúrate de que el backend soporte DELETE para este endpoint).",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (tab) => {
    const commonInputClass =
      "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-3";
    const buttonClass =
      "bg-primary hover:bg-teal text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 w-full md:w-auto";
    const fileInputClass =
      "w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal file:text-white hover:file:bg-primary";
    switch (tab) {
      case "sponsors":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createItem(
                "sponsors",
                { ...newSponsor, logo: e.target.logo.files[0] },
                "logo"
              );
            }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <input
              type="text"
              placeholder="Nombre del patrocinador"
              value={newSponsor.name}
              onChange={(e) =>
                setNewSponsor({ ...newSponsor, name: e.target.value })
              }
              className={commonInputClass}
              required
            />
            <input
              type="file"
              name="logo"
              accept="image/*"
              className={fileInputClass}
            />
            <button
              type="submit"
              disabled={loading}
              className={
                buttonClass + (loading ? " opacity-50 cursor-not-allowed" : "")
              }
            >
              {loading ? "Agregando..." : "Agregar Patrocinador"}
            </button>
          </form>
        );
      case "collaborators":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createItem(
                "collaborators",
                { ...newCollaborator, logo: e.target.logo.files[0] },
                "logo"
              );
            }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <input
              type="text"
              placeholder="Nombre del colaborador"
              value={newCollaborator.name}
              onChange={(e) =>
                setNewCollaborator({ ...newCollaborator, name: e.target.value })
              }
              className={commonInputClass}
              required
            />
            <input
              type="file"
              name="logo"
              accept="image/*"
              className={fileInputClass}
            />
            <button
              type="submit"
              disabled={loading}
              className={
                buttonClass + (loading ? " opacity-50 cursor-not-allowed" : "")
              }
            >
              {loading ? "Agregando..." : "Agregar Colaborador"}
            </button>
          </form>
        );
      case "organizers":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createItem(
                "organizers",
                { ...newOrganizer, logo: e.target.logo.files[0] },
                "logo"
              );
            }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <input
              type="text"
              placeholder="Nombre del organizador"
              value={newOrganizer.name}
              onChange={(e) =>
                setNewOrganizer({ ...newOrganizer, name: e.target.value })
              }
              className={commonInputClass}
              required
            />
            <input
              type="file"
              name="logo"
              accept="image/*"
              className={fileInputClass}
            />
            <button
              type="submit"
              disabled={loading}
              className={
                buttonClass + (loading ? " opacity-50 cursor-not-allowed" : "")
              }
            >
              {loading ? "Agregando..." : "Agregar Organizador"}
            </button>
          </form>
        );
      case "hero-images":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createItem(
                "hero-images",
                { ...newHeroImage, images: e.target.images.files }, // ¡FIX: "images" y múltiples files
                "images"
              );
            }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <input
              type="number"
              placeholder="Orden inicial (opcional, default 0)"
              value={newHeroImage.order}
              onChange={(e) =>
                setNewHeroImage({
                  ...newHeroImage,
                  order: parseInt(e.target.value) || 0,
                })
              }
              className={commonInputClass}
              min="0"
            />
            <input
              type="file"
              name="images" // ¡FIX: name="images" para backend
              accept="image/*"
              multiple
              className={fileInputClass}
            />
            <p className="text-sm text-gray-600 mb-3">
              Selecciona múltiples imágenes para agregar al carrusel (se
              ordenarán secuencialmente).
            </p>
            <button
              type="submit"
              disabled={loading}
              className={
                buttonClass + (loading ? " opacity-50 cursor-not-allowed" : "")
              }
            >
              {loading ? "Agregando..." : "Agregar Imágenes Hero"}
            </button>
          </form>
        );
      case "documents":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createItem(
                "documents",
                { name: newDocument.name, doc: e.target.doc.files[0] }, // ¡FIX: Incluir file en data
                "doc"
              );
            }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <input
              type="text"
              placeholder="Nombre del documento (e.g., dossier.pdf)"
              value={newDocument.name}
              onChange={(e) => setNewDocument({ name: e.target.value })}
              className={commonInputClass}
              required
            />
            <input
              type="file"
              name="doc"
              accept=".pdf"
              className={fileInputClass}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={
                buttonClass + (loading ? " opacity-50 cursor-not-allowed" : "")
              }
            >
              {loading ? "Subiendo..." : "Subir PDF"}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  const renderList = (tab) => {
    const listClass = "bg-white rounded-lg shadow-md overflow-hidden";
    const rowClass =
      "flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50";
    const deleteBtnClass =
      "bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold text-sm transition-colors duration-200";

    // Nota: Para sponsors/collaborators/organizers/documents, el backend no tiene DELETE implementado aún.
    // Solo hero-images lo tiene. Agrega en backend si necesitas.

    switch (tab) {
      case "sponsors":
        return (
          <div className={listClass}>
            <ul className="divide-y divide-gray-200">
              {sponsors.map((s) => (
                <li key={s._id} className={rowClass}>
                  {" "}
                  {/* ¡FIX: Usa _id para MongoDB */}
                  <div className="flex items-center">
                    {s.logo && (
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    )}
                    <span className="font-semibold text-gray-800">
                      {s.name}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteItem("sponsors", s._id, s.name)}
                    className={deleteBtnClass}
                    disabled // Deshabilita hasta implementar DELETE en backend
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "collaborators":
        return (
          <div className={listClass}>
            <ul className="divide-y divide-gray-200">
              {collaborators.map((c) => (
                <li key={c._id} className={rowClass}>
                  <div className="flex items-center">
                    {c.logo && (
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    )}
                    <span className="font-semibold text-gray-800">
                      {c.name}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteItem("collaborators", c._id, c.name)}
                    className={deleteBtnClass}
                    disabled
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "organizers":
        return (
          <div className={listClass}>
            <ul className="divide-y divide-gray-200">
              {organizers.map((o) => (
                <li key={o._id} className={rowClass}>
                  <div className="flex items-center">
                    {o.logo && (
                      <img
                        src={o.logo}
                        alt={o.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    )}
                    <span className="font-semibold text-gray-800">
                      {o.name}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteItem("organizers", o._id, o.name)}
                    className={deleteBtnClass}
                    disabled
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "hero-images":
        return (
          <div className={listClass}>
            <ul className="divide-y divide-gray-200">
              {heroImages.map((h) => (
                <li key={h._id} className={rowClass}>
                  {" "}
                  {/* ¡FIX: _id para MongoDB */}
                  <div className="flex items-center">
                    <img
                      src={h.url}
                      alt="Hero"
                      className="w-20 h-20 rounded-lg mr-4 object-cover"
                    />
                    <div>
                      <span className="font-semibold text-gray-800">
                        Orden: {h.order}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem("hero-images", h._id, "imagen")}
                    className={deleteBtnClass}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "documents":
        return (
          <div className={listClass}>
            <ul className="divide-y divide-gray-200">
              {documents.map((d) => (
                <li key={d._id} className={rowClass}>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-800">
                      {d.name}
                    </span>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 text-primary hover:underline"
                    >
                      Ver
                    </a>
                  </div>
                  <button
                    onClick={() => deleteItem("documents", d._id, d.name)}
                    className={deleteBtnClass}
                    disabled
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTab = () => {
    const tabNames = {
      sponsors: "Patrocinadores",
      collaborators: "Colaboradores",
      organizers: "Organizadores",
      "hero-images": "Imágenes Hero",
      documents: "Documentos",
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-montserrat font-extrabold text-secondary mb-6 text-center">
          {tabNames[activeTab] || activeTab}
        </h2>
        {renderForm(activeTab)}
        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-600">Cargando...</p>
          </div>
        ) : (
          renderList(activeTab)
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-cyan p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-montserrat font-extrabold text-secondary mb-8 text-center">
          Panel Admin - Feria Emprende 2025
        </h1>
        {message.text && (
          <div
            className={`mb-4 p-4 rounded-lg text-center font-semibold ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md p-1 mb-6">
          <div className="tabs flex space-x-1 bg-gray-100 rounded-lg overflow-hidden">
            {[
              "sponsors",
              "collaborators",
              "organizers",
              "hero-images",
              "documents",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 font-semibold transition-colors duration-200 text-sm ${
                  activeTab === tab
                    ? "bg-secondary text-white shadow-inner"
                    : "text-gray-600 hover:text-secondary hover:bg-gray-200"
                }`}
              >
                {tab.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        {renderTab()}
      </div>
    </div>
  );
}

export default Admin;
