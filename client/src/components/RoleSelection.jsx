import { useState } from "react";

export default function RoleSelection({ onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] font-sans text-[#12231d]">
      <div className="mx-auto max-w-[1280px] px-6 py-8 sm:px-10 lg:px-12">
        <button className="mb-8 flex items-center gap-3 text-[2.2rem] font-medium text-[#1f2b29] transition hover:opacity-80">
          <span className="text-4xl leading-none">←</span>
          <span>Volver</span>
        </button>

        <div className="mx-auto max-w-[980px] text-center">
          
          <h1 className="text-4xl font-extrabold text-black" style={{ color: "#000000" }}>
            ¿Qué tipo de cuenta deseas crear?
          </h1>
          <p className="mt-4 text-[1.1rem] font-medium text-[#2f3a36] sm:text-[1.35rem]">
            Únete a la red nacional de productores y consumidores de Nicaragua.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div
              onClick={() => setSelectedRole(1)}
              className={`relative min-h-[440px] cursor-pointer rounded-[32px] border-[3px] p-6 text-center transition-all duration-200 ${
                selectedRole === 1
                  ? "border-[#1d5a44] bg-[#edf7f0] shadow-[0_0_0_6px_rgba(29,90,68,0.08)]"
                  : "border-[#dfe6df] bg-[#f7f3f0] hover:border-[#7aa58d]"
              }`}
            >
              {selectedRole === 1 && (
                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#1d5a44] shadow-md">
                  <svg viewBox="0 0 20 20" className="h-6 w-6 text-white" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 11.586l6.793-6.793a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <div className="mb-4 flex h-[220px] items-center justify-center overflow-hidden rounded-[24px] bg-[#f1e5e0]">
                <img src="/comprador.svg" alt="Comprador" className="h-full w-full object-contain" />
              </div>

              <div className="mt-3 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[2px] border-[#3b6b55] bg-[#e9f3ec] text-[#1d5a44] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                  </svg>
                </div>
              </div>

              <h2 className="mt-5 text-[2rem] font-bold tracking-[-0.04em] text-[#1b1b1b]">Comprador</h2>
              <p className="mx-auto mt-3 max-w-[280px] text-[1.08rem] leading-[1.5] text-[#34453f]">
                Únete a la red nacional de productores y consumidores de Nicaragua.
              </p>
            </div>

            <div
              onClick={() => setSelectedRole(2)}
              className={`relative min-h-[440px] cursor-pointer rounded-[32px] border-[3px] p-6 text-center transition-all duration-200 ${
                selectedRole === 2
                  ? "border-[#1d5a44] bg-[#ecf5f2] shadow-[0_0_0_6px_rgba(29,90,68,0.08)]"
                  : "border-[#e8dfe0] bg-[#f5f0f3] hover:border-[#7aa58d]"
              }`}
            >
              {selectedRole === 2 && (
                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#1d5a44] shadow-md">
                  <svg viewBox="0 0 20 20" className="h-6 w-6 text-white" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 11.586l6.793-6.793a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <div className="mb-4 flex h-[220px] items-center justify-center overflow-hidden rounded-[24px] bg-[#e7f1ea]">
                <img src="/productor.svg" alt="Productor" className="h-full w-full object-contain" />
              </div>

              <div className="mt-3 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[2px] border-[#3b6b55] bg-[#edf8f1] text-[#1d5a44] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 19c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
              </div>

              <h2 className="mt-5 text-[2rem] font-bold tracking-[-0.04em] text-[#1b1b1b]">Productor</h2>
              <p className="mx-auto mt-3 max-w-[280px] text-[1.08rem] leading-[1.5] text-[#34453f]">
                Produzco y ofrezco mis productos. Quiero llegar a más clientes y hacer crecer mi negocio.
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`mt-10 inline-flex items-center justify-center gap-3 rounded-full px-16 py-4 text-[2.2rem] font-bold transition-all duration-200 ${
              selectedRole
                ? "bg-[#1d5a44] text-white shadow-lg shadow-[#1d5a44]/20 hover:bg-[#184d3b]"
                : "cursor-not-allowed bg-[#dfe4df] text-[#7a807d]"
            }`}
          >
            <span>Continuar</span>
            <span className="text-3xl leading-none">→</span>
          </button>

          <p className="mt-8 text-[1.2rem] font-medium text-[#1f2b29]">
            ¿Ya tienes cuenta? <button className="font-bold text-[#1d5a44] underline-offset-4 hover:underline">Inicia Sesión</button>
          </p>
        </div>
      </div>
    </div>
  );
}
