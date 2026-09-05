import { useState } from "react";
import Auth from "./components/Auth";
import RoleSelection from "./components/RoleSelection";
import BuyerDashboard from "./components/BuyerDashboard";
import ProducerDashboard from "./components/ProducerDashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUser({ email: data.user.email, tipoRol: data.user.tipoRol });
        setCurrentScreen("roleSelection");
      } else {
        alert(data.message || "Error de login");
      }
    } catch (error) {
      console.error("Login request error:", error);
      alert("No se pudo conectar con el servidor de autenticación.");
    }
  };

  const handleRegisterSuccess = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: String(userData.email).trim().toLowerCase(),
          password: userData.password,
          tipoRol: 0
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUser({ email: String(userData.email).trim().toLowerCase(), name: userData.fullName });
        setCurrentScreen("roleSelection");
      } else {
        alert(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Register request error:", error);
      alert("No se pudo conectar con el servidor de autenticación.");
    }
  };

  const handleRoleSelect = (roleId) => {
    if (roleId === 1) {
      setCurrentScreen("producerDashboard");
    } else if (roleId === 2) {
      setCurrentScreen("buyerDashboard");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setCurrentScreen("login");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {(currentScreen === "login" || currentScreen === "register") && (
        <Auth
          onLoginSuccess={handleLoginSuccess} 
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToRegister={() => setCurrentScreen("register")}
          onNavigateToLogin={() => setCurrentScreen("login")}
          onForgotPassword={() => alert("Flujo de recuperación de contraseña en construcción")}
        />
      )}

      {currentScreen === "roleSelection" && (
        <RoleSelection 
          onRoleSelect={handleRoleSelect} 
        />
      )}

      {currentScreen === "buyerDashboard" && (
        <BuyerDashboard 
          onLogout={handleLogout} 
        />
      )}

      {currentScreen === "producerDashboard" && (
        <ProducerDashboard 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}