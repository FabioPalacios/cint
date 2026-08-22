
import { useState } from "react";

export default function Login({ onLoginSuccess, onForgotPassword }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		onLoginSuccess?.({ email, password });
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="email">
				Correo Electrónico
				<input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Ejemplo@correo.com" className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#1a5235] focus:ring-2 focus:ring-[#1a5235]/15" />
			</label>
			<label className="flex flex-col items-start gap-2 text-left text-sm font-semibold text-[#292929]" htmlFor="password">
				Contraseña
				<input id="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" className="h-11 w-full rounded-lg border border-[#d5d5d5] bg-white px-3 font-normal outline-none focus:border-[#1a5235] focus:ring-2 focus:ring-[#1a5235]/15" />
			</label>
			<button type="button" onClick={onForgotPassword} className="self-end text-xs font-bold text-[#1a5235]">¿Olvidaste tu contraseña?</button>
			<button type="submit" className="mx-auto mt-1 h-11 w-full max-w-60 rounded-full bg-[#1a5235] text-base text-white transition hover:bg-[#0f452c]"><span aria-hidden="true">➜</span> Iniciar Sesión</button>
		</form>
	);
}
