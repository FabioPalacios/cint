import { useState } from "react";

export default function Login({ onLoginSuccess, onNavigateToRegister, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess({ email });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] font-sans text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center px-4 py-8 md:flex-row md:gap-10">
        <div className="hidden md:flex md:w-5/12 items-center justify-center">
          <div className="relative flex h-[calc(100vh-4rem)] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-[40px] bg-[#12422C] p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
            <div className="absolute top-10 left-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full border border-white/15" />
            <img
              src="/Vector_Logo_right_half.svg"
              alt="CINT logo"
              className="relative z-10 max-h-[88vh] w-full max-w-[380px] object-contain"
            />
          </div>
        </div>

        <div className="w-full md:w-7/12 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.25)] sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
                <span className="text-[#12422C]">Bienvenido de nuevo</span>
              </h1>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#D8B061]" />
              <p className="mt-4 text-sm text-slate-600 max-w-md mx-auto">
                Inicia sesión para continuar con tu experiencia CINT.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="********"
                    className="w-full rounded-[22px] border-none bg-transparent py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <button type="button" onClick={onForgotPassword} className="text-[#12422C] hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#12422C] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(18,66,44,0.24)] transition hover:bg-[#0f3a27]"
              >
                Iniciar Sesión
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              <span>O continúa con</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.5 12.278c0-.735-.066-1.44-.187-2.12H12v4.02h5.985c-.26 1.4-1.05 2.587-2.237 3.387v2.81h3.618c2.12-1.95 3.34-4.82 3.34-8.1Z" fill="#4285F4" />
                <path d="M12 22c2.95 0 5.426-.975 7.234-2.64l-3.616-2.81c-1.01.68-2.317 1.085-3.618 1.085-2.78 0-5.14-1.88-5.976-4.4H2.682v2.764C4.46 19.96 7.92 22 12 22Z" fill="#34A853" />
                <path d="M6.024 13.034a6.605 6.605 0 0 1 0-4.07V6.2H2.683A10.998 10.998 0 0 0 1 12c0 1.77.42 3.44 1.183 4.9l3.84-2.866Z" fill="#FBBC05" />
                <path d="M12 4.5c1.62 0 3.08.56 4.23 1.66l3.166-3.166C17.415 1.14 14.945 0 12 0A10.998 10.998 0 0 0 2.683 6.2l3.341 2.764C6.86 6.38 9.22 4.5 12 4.5Z" fill="#EA4335" />
              </svg>
              Continuar con Google
            </button>

            <div className="mt-6 text-center text-sm text-slate-600">
              ¿Aún no tienes cuenta?{' '}
              <button onClick={onNavigateToRegister} className="font-semibold text-[#12422C] hover:underline">
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
