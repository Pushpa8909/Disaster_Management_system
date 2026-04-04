import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import "./App.css";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: ""
  });

  const fetchIncidents = () => {
    axios
      .get("http://localhost:5000/api/incidents")
      .then((res) => setIncidents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (role) {
      fetchIncidents();
    }
  }, [role]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/incidents", formData)
      .then(() => {
        fetchIncidents();
        setFormData({ type: "", description: "", location: "" });
      });
  };

  const handleResolve = (id) => {
    axios
      .put(`http://localhost:5000/api/incidents/${id}`, {
        status: "Resolved"
      })
      .then(() => fetchIncidents());
  };

  // Admin hide (soft delete)
  const handleAdminHide = (id) => {
    axios
      .put(`http://localhost:5000/api/incidents/hide/${id}`)
      .then(() => fetchIncidents());
  };

  const total = incidents.length;
  const pending = incidents.filter(i => i.status !== "Resolved").length;
  const resolved = incidents.filter(i => i.status === "Resolved").length;

  return (
    <>
      {!role ? (
        <Login setRole={setRole} />
      ) : (
        <div className="container">
          <header className="header">
            <h1>Disaster Management System</h1>
            <button className="logout-btn" onClick={() => setRole(null)}>
              Logout
            </button>
          </header>

          {/* ADMIN DASHBOARD */}
          {role === "admin" && (
            <div className="dashboard">
              <div className="card total">
                <h3>Total</h3>
                <p>{total}</p>
              </div>
              <div className="card pending">
                <h3>Pending</h3>
                <p>{pending}</p>
              </div>
              <div className="card resolved">
                <h3>Resolved</h3>
                <p>{resolved}</p>
              </div>
            </div>
          )}

          {/* USER FORM */}
          {role === "user" && (
            <div className="form-card">
              <h2>Add Incident</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="type"
                  placeholder="Disaster Type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Add Incident</button>
              </form>
            </div>
          )}

          {/* INCIDENT LIST */}
          <div className="incident-list">
            <h2>All Incidents</h2>

            {incidents
              .filter((incident) => {
                // Admin should not see hidden ones
                if (role === "admin" && incident.adminHidden) return false;
                return true;
              })
              .map((incident) => (
                <div key={incident._id} className="incident-card">
                  <h3>{incident.type}</h3>
                  <p>{incident.description}</p>
                  <p><strong>Location:</strong> {incident.location}</p>

                  <p>
                    <strong>Status:</strong>
                    <span
                      className={
                        incident.status === "Resolved"
                          ? "status resolved"
                          : "status pending"
                      }
                    >
                      {incident.status}
                    </span>
                  </p>

                  {/* ADMIN: Resolve */}
                  {role === "admin" && incident.status !== "Resolved" && (
                    <button
                      className="resolve-btn"
                      onClick={() => handleResolve(incident._id)}
                    >
                      Mark as Resolved
                    </button>
                  )}

                  {/* ADMIN: Hide after resolved */}
                  {role === "admin" &&
                    incident.status === "Resolved" &&
                    !incident.adminHidden && (
                      <button
                        className="delete-btn"
                        onClick={() => handleAdminHide(incident._id)}
                      >
                        Remove from Dashboard
                      </button>
                  )}

                  {/* USER: Notification */}
                  {role === "user" &&
                    incident.status === "Resolved" && (
                      <p style={{ color: "green", fontWeight: "bold" }}>
                        ✅ This incident has been resolved by Admin.
                      </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;