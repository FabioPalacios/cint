import { useState } from "react";

export default function Register({ onRegisterSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      setError("La contraseña debe tener 8+ caracteres, mayúsculas, minúsculas, números y un símbolo.");
      return;
    }
    onRegisterSuccess?.({ fullName, email: email.trim(), password, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && <div className="border-l-4 border-[#b94120] bg-[#fff1ed] p-2 text-xs font-bold text-[#a3381c]">{error}</div>}
      <label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="full-name">Nombre completo<input id="full-name" type="text" required value={fullName} onChange={(event) => setFullName(event.target.value)} className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#204475] focus:ring-2 focus:ring-[#204475]/15" /></label>
      <label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="register-email">Correo Electrónico<input id="register-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Ejemplo@correo.com" className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#204475] focus:ring-2 focus:ring-[#204475]/15" /></label>
      <label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="register-password">Contraseña<input id="register-password" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#204475] focus:ring-2 focus:ring-[#204475]/15" /></label>
      <label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="confirm-password">Confirmar contraseña<input id="confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="********" className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#204475] focus:ring-2 focus:ring-[#204475]/15" /></label>
      <label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="phone">Número telefónico<input id="phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+505 ********" className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#204475] focus:ring-2 focus:ring-[#204475]/15" /></label>
      <button type="submit" className="mx-auto mt-1 h-11 w-full max-w-60 rounded-full bg-[#204475] text-base text-white transition hover:bg-[#18385f]">Continuar</button>
    </form>
  );
}
