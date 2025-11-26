import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [sponsors, setSponsors] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [newSponsor, setNewSponsor] = useState({ name: "", logo: null });
  const [newCollaborator, setNewCollaborator] = useState({
    name: "",
    logo: null,
  });
  const [newOrganizer, setNewOrganizer] = useState({ name: "", logo: null });
  const [activeTab, setActiveTab] = useState("sponsors");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sponRes, collRes, orgRes] = await Promise.all([
        axios.get("http://localhost:3000/sponsors"),
        axios.get("http://localhost:3000/collaborators"),
        axios.get("http://localhost:3000/organizers"),
      ]);
      setSponsors(sponRes.data);
      setCollaborators(collRes.data);
      setOrganizers(orgRes.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleFileChange = (e, setter) => {
    setter({ ...newSponsor, logo: e.target.files[0] }); // Ejemplo para sponsor, adapta
  };

  const createItem = async (endpoint, data, setter) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.logo) formData.append("logo", data.logo);

    try {
      await axios.post(`http://localhost:3000/${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setter({ name: "", logo: null });
      fetchData();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const deleteItem = async (endpoint, id) => {
    try {
      await axios.delete(`http://localhost:3000/${endpoint}/${id}`); // Agrega endpoint DELETE en backend si lo usas
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "sponsors":
        return (
          <div>
            <h2>Patrocinadores</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createItem("sponsors", newSponsor, setNewSponsor);
              }}
            >
              <input
                type="text"
                placeholder="Nombre"
                value={newSponsor.name}
                onChange={(e) =>
                  setNewSponsor({ ...newSponsor, name: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setNewSponsor)}
              />
              <button type="submit">Agregar</button>
            </form>
            <ul>
              {sponsors.map((s) => (
                <li key={s.id}>
                  {s.name}{" "}
                  <img
                    src={`http://localhost:3000${s.logo}`}
                    alt={s.name}
                    width="50"
                  />
                  <button onClick={() => deleteItem("sponsors", s.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "collaborators":
        // Similar para collaborators, usa setNewCollaborator y createItem("collaborators", ...)
        return (
          <div>Contenido para Colaboradores (adapta el código arriba)</div>
        );
      case "organizers":
        // Similar para organizers
        return (
          <div>Contenido para Organizadores (adapta el código arriba)</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1>Panel Admin - Feria Emprende 2025</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("sponsors")}>Patrocinadores</button>
        <button onClick={() => setActiveTab("collaborators")}>
          Colaboradores
        </button>
        <button onClick={() => setActiveTab("organizers")}>
          Organizadores
        </button>
      </div>
      {renderTab()}
    </div>
  );
}

export default Admin;
