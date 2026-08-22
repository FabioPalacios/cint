import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

const transition = { duration: 1, ease: "easeInOut" };

export default function Auth({
  onLoginSuccess,
  onRegisterSuccess,
  onNavigateToRegister,
  onNavigateToLogin,
  onForgotPassword,
}) {
  const [isLogin, setIsLogin] = useState(true);

  const showRegister = () => {
    setIsLogin(false);
    onNavigateToRegister?.();
  };

  const showLogin = () => {
    setIsLogin(true);
    onNavigateToLogin?.();
  };

  return (
    <motion.main
      layout
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white text-[#292929] md:block"
      transition={transition}
    >
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.aside
            key="green-panel"
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -1000 }}
            transition={transition}
            className="flex min-h-36 items-center justify-center overflow-hidden bg-[#1a5235] md:absolute md:inset-y-0 md:left-0 md:block md:min-h-screen md:w-1/2"
          >
            <img
              src="/Vector_Logo_right_half.svg"
              alt="CINT logo"
              className="h-72 w-full object-contain md:h-[92vh] md:min-w-[520px] md:-translate-x-[29%]"
            />
          </motion.aside>
        ) : (
          <motion.aside
            key="blue-panel"
            initial={{ opacity: 1, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 1000 }}
            transition={transition}
            className="flex min-h-36 items-center justify-center overflow-hidden bg-[#204475] md:absolute md:inset-y-0 md:right-0 md:block md:min-h-screen md:w-1/2"
          >
            <img
              src="/logo_naranja_left_half.svg"
              alt="CINT logo"
              className="h-72 w-full object-contain md:h-[94vh] md:min-w-[520px] md:translate-x-[20%]"
            />
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.section
        layout
        animate={{ left: isLogin ? "50%" : "0%" }}
        transition={transition}
        className="flex items-center justify-center overflow-y-auto px-6 py-10 md:absolute md:inset-y-0 md:min-h-screen md:w-1/2 md:px-[clamp(32px,8vw,130px)]"
      >
        <div className="w-full max-w-[496px]">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
              >
                <div className="mb-9 text-center">
                  <h1
                    className="text-4xl font-extrabold text-black"
                    style={{ color: "#000000" }}
                  >
                    Bienvenido de nuevo
                  </h1>
                  <span className="mx-auto my-3 block h-1 w-20 rounded bg-[#ccad53]" />
                  <p className="mx-auto max-w-xs text-sm font-bold">
                    Inicia sesión para continuar con tu experiencia CINT.
                  </p>
                </div>
                <Login onLoginSuccess={onLoginSuccess} onForgotPassword={onForgotPassword} />
                <div className="my-6 flex items-center gap-4 text-[10px] font-bold tracking-widest text-[#1a5235]">
                  <span className="h-0.5 flex-1 bg-[#ccad53]" />
                  <b>O continúa con</b>
                  <span className="h-0.5 flex-1 bg-[#ccad53]" />
                </div>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#d8d8d8] bg-white text-base hover:bg-[#fafafa]"
                >
                  <img src="/google_icon.svg" height="24" width="24" alt="Google" />
                  Continuar con Google
                </button>
                <p className="mt-4 text-center text-sm font-bold text-[#1a5235]">
                  ¿Aún no tienes cuenta?{" "}
                  <button type="button" onClick={showRegister} className="text-[#ccad53]">
                    Regístrate
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
              >
                <div className="mb-5 text-center">
                  <h1
                    className="text-4xl font-extrabold text-black"
                    style={{ color: "#000000" }}
                  >
                    Crear una cuenta
                  </h1>
                  <span className="mx-auto my-2 block h-1 w-20 rounded bg-[#ccad53]" />
                  <p className="mx-auto max-w-sm text-sm font-bold">
                    Únete a la red nacional de productores y consumidores de Nicaragua.
                  </p>
                </div>
                <Register onRegisterSuccess={onRegisterSuccess} />
                <p className="mt-5 text-center text-sm font-bold text-[#155637]">
                  ¿Ya tienes una cuenta?{" "}
                  <button type="button" onClick={showLogin} className="text-[#ccad53]">
                    Inicia Sesión
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </motion.main>
  );
}