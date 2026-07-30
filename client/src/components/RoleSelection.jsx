import { useState } from "react";

export default function RoleSelection({ onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="w-full rounded-[32px] bg-white shadow-[0_35px_80px_-35px_rgba(15,23,42,0.25)] border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-0">
            <div className="p-10 sm:p-14">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#f4fbf7] px-4 py-2 text-sm font-bold text-[#12422C] mb-6 shadow-sm">
                <span>¡Bienvenido!</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
                Elige tu perfil de <span className="text-[#12422C]">usuario</span>
              </h1>
              <div className="h-1.5 w-24 rounded-full bg-[#D8B061] mb-6" />
              <p className="max-w-2xl text-base text-slate-600 leading-7">
                Selecciona si quieres operar como productor o comprador. Así adaptamos la experiencia de CINT con la mejor interfaz para tu rol.
              </p>
            </div>

            <div className="p-10 sm:p-14 bg-[#eff9f1] flex items-center justify-center">
              <div className="grid gap-6 w-full">
                <div
                  onClick={() => setSelectedRole(1)}
                  className={`relative rounded-[28px] border-2 p-7 text-center transition-all duration-300 cursor-pointer shadow-sm ${
                    selectedRole === 1
                      ? "border-[#12422C] bg-[#f4fbf7] ring-4 ring-[#12422C]/10 shadow-xl"
                      : "border-slate-200 bg-white hover:border-[#12422C]/50"
                  }`}>
                  {selectedRole === 1 && (
                    <div className="absolute top-5 right-5 text-[#12422C]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-[#12422C]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21v-8m0 0a4 4 0 014-4h.5M12 13a4 4 0 00-4-4h-.5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-950 mb-2">Soy Productor</h2>
                  <p className="text-sm text-slate-600 leading-6">
                    Publica tus cosechas, gestiona stock y conecta con compradores de forma directa y transparente.
                  </p>
                </div>

                <div
                  onClick={() => setSelectedRole(2)}
                  className={`relative rounded-[28px] border-2 p-7 text-center transition-all duration-300 cursor-pointer shadow-sm ${
                    selectedRole === 2
                      ? "border-[#1E3A5F] bg-[#f4f8fb] ring-4 ring-[#1E3A5F]/10 shadow-xl"
                      : "border-slate-200 bg-white hover:border-[#1E3A5F]/50"
                  }`}>
                  {selectedRole === 2 && (
                    <div className="absolute top-5 right-5 text-[#1E3A5F]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-[#1E3A5F]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-950 mb-2">Soy Comprador</h2>
                  <p className="text-sm text-slate-600 leading-6">
                    Descubre productos frescos, compara precios justos y compra directamente a productores locales.
                  </p>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!selectedRole}
                  className={`w-full rounded-full py-4 mt-4 font-semibold transition ${
                    selectedRole
                      ? "bg-[#12422C] text-white hover:bg-[#0d3120] shadow-lg"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}>
                  {selectedRole ? "Continuar a mi panel" : "Selecciona un perfil para continuar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
