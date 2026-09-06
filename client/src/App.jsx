import { useState } from "react";
import Auth from "./components/Auth";
import RoleSelection from "./components/RoleSelection";
import BuyerDashboard from "./components/BuyerDashboard";
import ProducerDashboard from "./components/ProducerDashboard";
import ExtraFormBuyer from "./components/ExtraFormBuyer";
import ExtraFormProducer from "./components/ExtraFormProducer";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [registrationDraft, setRegistrationDraft] = useState(null);

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
        setUser({ email: data.user.email, tipoRol: data.user.tipoRol, id: data.user.id });
        if (data.user.tipoRol === 2) {
          setCurrentScreen("producerDashboard");
        } else if (data.user.tipoRol === 1) {
          setCurrentScreen("buyerDashboard");
        } else {
          setCurrentScreen("roleSelection");
        }
        return;
      }

      alert(data.message || "Error de login");
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
          fullName: String(userData.fullName || "").trim(),
          email: String(userData.email).trim().toLowerCase(),
          password: userData.password,
          phone: String(userData.phone || "").trim(),
          tipoRol: 0
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setRegistrationDraft({
          fullName: String(userData.fullName || "").trim(),
          email: String(userData.email).trim().toLowerCase(),
          phone: String(userData.phone || "").trim(),
          password: userData.password
        });
        setCurrentScreen("roleSelection");
        return;
      }

      alert(data.message || "Error en el registro");
    } catch (error) {
      console.error("Register request error:", error);
      alert("No se pudo conectar con el servidor de autenticación.");
    }
  };

  const completeProfile = async (payload) => {
    try {
      const response = await fetch("http://localhost:3001/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...registrationDraft,
          ...payload,
          tipoRol: payload.tipoRol,
          email: registrationDraft?.email
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          tipoRol: data.user.tipoRol,
          name: registrationDraft?.fullName
        });

        if (data.user.tipoRol === 1) {
          setCurrentScreen("buyerDashboard");
        } else if (data.user.tipoRol === 2) {
          setCurrentScreen("producerDashboard");
        } else {
          setCurrentScreen("roleSelection");
        }
        return true;
      }

      alert(data.message || "No se pudo completar el perfil");
      return false;
    } catch (error) {
      console.error("Profile completion error:", error);
      alert("No se pudo completar el perfil del usuario.");
      return false;
    }
  };

  const handleRoleSelect = (roleId) => {
    if (roleId === 1) {
      setCurrentScreen("extraFormBuyer");
    } else if (roleId === 2) {
      setCurrentScreen("extraFormProducer");
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
      setRegistrationDraft(null);
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
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}

      {currentScreen === "extraFormBuyer" && (
        <ExtraFormBuyer
          onBack={() => setCurrentScreen("roleSelection")}
          onSubmit={async (payload) => {
            await completeProfile({ ...payload, tipoRol: 1 });
          }}
        />
      )}

      {currentScreen === "extraFormProducer" && (
        <ExtraFormProducer
          onBack={() => setCurrentScreen("roleSelection")}
          onSubmit={async (payload) => {
            await completeProfile({ ...payload, tipoRol: 2 });
          }}
        />
      )}

      {currentScreen === "buyerDashboard" && (
        <BuyerDashboard onLogout={handleLogout} />
      )}

      {currentScreen === "producerDashboard" && (
        <ProducerDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}