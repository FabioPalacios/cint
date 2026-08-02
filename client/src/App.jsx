import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import RoleSelection from "./components/RoleSelection";
import BuyerDashboard from "./components/BuyerDashboard";
import ProducerDashboard from "./components/ProducerDashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);

  const MOCK_CREDENTIALS = {
    email: "jordan@cint.com",
    password: "123",
  };

  const handleLoginSuccess = async (credentials) => {
    console.log("Login attempt:", credentials);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const data = await response.json();
      console.log("Login response:", data);
      if (response.ok && data.success) {
        setUser({ email: data.user.email, tipoRol: data.user.tipoRol });
        setCurrentScreen("roleSelection");
      } else {
        console.error("Login failed:", data.message || data);
        alert(data.message || "Error de login");
      }
    } catch (error) {
      console.error("Login request error:", error);
      alert("No se pudo conectar con el servidor de autenticación.");
    }
  };

  const handleRegisterSuccess = async (userData) => {
    console.log("Register attempt:", userData);
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          tipoRol: 0
        })
      });
      const data = await response.json();
      console.log("Register response:", data);
      if (response.ok && data.success) {
        setUser({ email: userData.email, name: userData.fullName });
        setCurrentScreen("roleSelection");
      } else {
        console.error("Register failed:", data.message || data);
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

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("login");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {currentScreen === "login" && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onNavigateToRegister={() => setCurrentScreen("register")}
          onForgotPassword={() => alert("Flujo de recuperación de contraseña en construcción")}
        />
      )}

      {currentScreen === "register" && (
        <Register 
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={() => setCurrentScreen("login")} 
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