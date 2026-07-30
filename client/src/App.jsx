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

  const handleLoginSuccess = (credentials) => {
    if (credentials.email === MOCK_CREDENTIALS.email || credentials.email !== "") {
      setUser({ email: credentials.email });
      setCurrentScreen("roleSelection");
    } else {
      alert("Credenciales incorrectas. Usa jordan@cint.com");
    }
  };

  const handleRegisterSuccess = (userData) => {
    setUser({ email: userData.email, name: userData.fullName });
    setCurrentScreen("roleSelection");
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