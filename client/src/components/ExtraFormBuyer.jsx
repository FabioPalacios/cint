import { useState } from "react";

export default function ExtraFormBuyer({ onSubmit, onBack, initialValues = {} }) {
  const [formData, setFormData] = useState({
    departamento: initialValues.departamento || "",
    municipio: initialValues.municipio || "",
    direccion: initialValues.direccion || "",
    aceptaTerminos: initialValues.aceptaTerminos || false,
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfileImage(file.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.({
      ...formData,
      fotoPerfil: profileImage || "",
      tipoRol: 1,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] px-5 py-8 text-[#1f1f1f] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-3 text-[1.7rem] font-medium text-[#1a5235] transition hover:opacity-80"
        >
          <span className="text-3xl leading-none">←</span>
          <span>Volver</span>
        </button>

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-[3.2rem] font-black leading-none tracking-[-0.06em] text-[#111111]">
              Completa tu perfil
            </h1>
            <p className="mt-4 max-w-[620px] text-[1.15rem] leading-8 text-[#3b3b3b]">
              Cuentanos un poco más para que los compradores conozcan un poco más de ti.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 max-w-[760px]">
              <label className="mb-5 block">
                <span className="mb-2 block text-[1.05rem] font-medium text-[#1c1c1c]">Departamento</span>
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  className="h-[54px] w-full rounded-xl border border-[#d9d2c8] bg-white px-4 text-[1.05rem] outline-none transition focus:border-[#1a5235] focus:ring-2 focus:ring-[#1a5235]/15"
                />
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block text-[1.05rem] font-medium text-[#1c1c1c]">Municipio</span>
                <input
                  type="text"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  required
                  className="h-[54px] w-full rounded-xl border border-[#d9d2c8] bg-white px-4 text-[1.05rem] outline-none transition focus:border-[#1a5235] focus:ring-2 focus:ring-[#1a5235]/15"
                />
              </label>

              <label className="mb-6 block">
                <span className="mb-2 block text-[1.05rem] font-medium text-[#1c1c1c]">Dirección (Opcional)</span>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="h-[54px] w-full rounded-xl border border-[#d9d2c8] bg-white px-4 text-[1.05rem] outline-none transition focus:border-[#1a5235] focus:ring-2 focus:ring-[#1a5235]/15"
                />
              </label>

              <div className="mb-7 rounded-[18px] border border-dashed border-[#b8b3aa] bg-[#f6f4f1] p-4">
                <label className="flex cursor-pointer items-center gap-4 rounded-[14px] border border-[#d8d0c5] bg-white px-3 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f3ec] text-2xl text-[#1a5235]">
                    👤
                  </div>
                  <div className="min-w-0">
                    <div className="text-[1rem] font-semibold text-[#1c1c1c]">
                      {profileImage ? profileImage : "Agregar una foto de perfil"}
                    </div>
                    <div className="text-[0.82rem] text-[#656565]">JPG, PNG. Máx. 5MB</div>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <label className="mb-8 flex items-center gap-3 text-[0.98rem] font-medium text-[#2d2d2d]">
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  required
                  className="h-5 w-5 rounded border-[#1a5235] text-[#1a5235] focus:ring-[#1a5235]"
                />
                Acepto los Términos y Condiciones y la Política de privacidad de CINT.
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1a5235] px-8 py-4 text-[1.2rem] font-bold text-white shadow-lg shadow-[#1a5235]/20 transition hover:bg-[#143f2a]"
                >
                  Crear Cuenta
                  <span className="text-2xl leading-none">→</span>
                </button>
              </div>
            </form>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px]">
              <div className="mb-5 flex justify-end">
                <div className="flex items-center gap-3 rounded-[18px] border border-[#e1d4b8] bg-[#f2e8d8] px-4 py-3 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e3efe5] text-2xl">🧑</div>
                  <div className="text-[1.05rem] font-bold text-[#1b1b1b] leading-tight">
                    Tipo de cuenta
                    <div className="text-[1.05rem] font-bold text-[#1b1b1b]">Comprador</div>
                  </div>
                </div>
              </div>

              <div className="flex h-[380px] items-center justify-center overflow-hidden rounded-[30px] bg-[#dfeef1] p-4 shadow-inner">
                <img
                  src="/comprador.svg"
                  alt="Ilustración comprador"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
