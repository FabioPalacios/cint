import { useState } from "react";

export default function Register({ onRegisterSuccess, onNavigateToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (onRegisterSuccess) {
      onRegisterSuccess({ fullName, email, password });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] font-sans text-slate-900">
      <div className="flex min-h-screen w-full flex-col items-stretch md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
          <div className="w-full max-w-xl rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.25)] sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
                Crea tu <span className="text-[#12422C]">cuenta</span>
              </h1>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#D8B061]" />
              <p className="mt-4 text-sm text-slate-600 max-w-md mx-auto">
                Únete a la red de comercio justo y directo CINT.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-xs font-semibold mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Nombre Completo</label>
                <div className="relative rounded-[22px] border border-slate-300 bg-slate-50 focus-within:border-[#12422C] focus-within:ring-2 focus-within:ring-[#12422C]/20 transition">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Jordan Pérez"
                    className="w-full rounded-[22px] border-none bg-transparent py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Correo Electrónico</label>
                <div className="relative rounded-[22px] border border-slate-300 bg-slate-50 focus-within:border-[#12422C] focus-within:ring-2 focus-within:ring-[#12422C]/20 transition">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ejemplo@correo.com"
                    className="w-full rounded-[22px] border-none bg-transparent py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Contraseña</label>
                <div className="relative rounded-[22px] border border-slate-300 bg-slate-50 focus-within:border-[#12422C] focus-within:ring-2 focus-within:ring-[#12422C]/20 transition">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full rounded-[22px] border-none bg-transparent py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Confirmar Contraseña</label>
                <div className="relative rounded-[22px] border border-slate-300 bg-slate-50 focus-within:border-[#12422C] focus-within:ring-2 focus-within:ring-[#12422C]/20 transition">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full rounded-[22px] border-none bg-transparent py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#12422C] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(18,66,44,0.24)] transition hover:bg-[#0f3a27]"
              >
                Registrarse
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
              ¿Ya tienes una cuenta?{' '}
              <button onClick={onNavigateToLogin} className="font-semibold text-[#12422C] hover:underline">
                Inicia sesión aquí
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden bg-[#12422C] p-6 sm:p-10">
          <div className="relative h-full w-full max-w-[600px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_28%)]" />
            <div className="absolute top-10 right-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <img
              src="/Vector_Logo_left_half.svg"
              alt="CINT logo"
              className="relative z-10 mx-auto h-full w-full max-w-[560px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}