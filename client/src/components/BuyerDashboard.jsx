import { useMemo, useState } from "react";

const navItems = [
  { label: "Inicio", icon: "home", active: true },
  { label: "Explorar", icon: "search" },
  { label: "Canasta básica", icon: "basket" },
  { label: "Mapa de precios", icon: "map" },
  { label: "Mis pedidos", icon: "orders" },
  { label: "Favoritos", icon: "star" },
  { label: "Mensajes", icon: "chat" },
  { label: "Notificaciones", icon: "bell" },
  { label: "Perfil", icon: "user" },
];

const categoryItems = [
  { label: "Granos", icon: "🌾" },
  { label: "Café", icon: "☕" },
  { label: "Lácteos", icon: "🥛" },
  { label: "Frutas", icon: "🍌" },
  { label: "Artesanías", icon: "🎨" },
  { label: "Otros", icon: "🧺" },
];

const marketPrices = [
  { id: 1, name: "Café oro", price: "C$ 95.00", unit: "/ lb", trend: "▲ 2.4%", trendLabel: "desde ayer", source: "Matagalpa", time: "Hoy, 8:30 a. m.", icon: "☕" },
  { id: 2, name: "Plátanos", price: "C$ 45.00", unit: "/ lb", trend: "▲ 1.7%", trendLabel: "desde ayer", source: "Estelí", time: "Hoy, 6:10 a. m.", icon: "🍌" },
  { id: 3, name: "Leche", price: "C$ 42.00", unit: "/ lt", trend: "▼ 3.8%", trendLabel: "hoy", source: "Ticuantepe", time: "Ayer, 2:10 p. m.", icon: "🥛" },
];

const mockProducts = [
  { id: 1, name: "Frijol Rojo Criollo", producer: "Cooperativa San José", location: "Matagalpa", category: "Granos", price: 32, unit: "Libra", image: "🌾" },
  { id: 2, name: "Tomate Chiltoma Nataly", producer: "Finca El Chaparral", location: "Jinotega", category: "Otros", price: 450, unit: "Caja", image: "🍅" },
  { id: 3, name: "Maíz Blanco Seco", producer: "Agrícola del Norte", location: "Estelí", category: "Granos", price: 18, unit: "Libra", image: "🌽" },
  { id: 4, name: "Queso Seco Tradicional", producer: "Lácteos El Ganadero", location: "Chontales", category: "Lácteos", price: 85, unit: "Libra", image: "🧀" },
  { id: 5, name: "Plátano Verde Grande", producer: "Hacienda La Esperanza", location: "Rivas", category: "Frutas", price: 5, unit: "Unidad", image: "🍌" },
  { id: 6, name: "Café Oro Lavado", producer: "Finca Las Nubes", location: "Matagalpa", category: "Café", price: 3200, unit: "Quintal", image: "☕" },
];

const producerCards = [
  { id: 1, name: "Finca La Esperanza", type: "Frutas" },
  { id: 2, name: "Lácteos del Norte", type: "Lácteos" },
  { id: 3, name: "Cooperativa El Sur", type: "Granos" },
];

function Icon({ name }) {
  const common = "h-5 w-5 stroke-current";

  const icons = {
    home: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 5 5" strokeLinecap="round" />
      </svg>
    ),
    basket: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M3 7h18l-1.6 10.8A2 2 0 0 1 17.4 19H6.6a2 2 0 0 1-2-1.2L3 7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7V5.8A4 4 0 0 1 12 2a4 4 0 0 1 4 3.8V7" strokeLinecap="round" />
      </svg>
    ),
    map: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 4v14M15 6v14" strokeLinecap="round" />
      </svg>
    ),
    orders: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9A2.5 2.5 0 0 1 16.5 19h-9A2.5 2.5 0 0 1 5 16.5v-9Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h8" strokeLinecap="round" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 0l-5.6 3.2 1.1-6.2L3 9.6l6.2-.9L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M5 18.5V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H9l-4 2.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20a2 2 0 0 0 4 0" strokeLinecap="round" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 19.5A8 8 0 0 1 12 15a8 8 0 0 1 8 4.5" strokeLinecap="round" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className={common}>
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      </svg>
    ),
    chevron: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className="h-4 w-4 stroke-current">
        <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className="h-4 w-4 stroke-current">
        <path d="M3 7h18l-1.6 10.8A2 2 0 0 1 17.4 19H6.6a2 2 0 0 1-2-1.2L3 7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7V5.8A4 4 0 0 1 12 2a4 4 0 0 1 4 3.8V7" strokeLinecap="round" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className="h-3.5 w-3.5 stroke-current">
        <path d="M12 21s6-5.5 6-11A6 6 0 1 0 6 10c0 5.5 6 11 6 11Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className="h-4 w-4 stroke-current">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function BuyerDashboard({ onLogout }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    return mockProducts.filter((product) => {
      const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
      const matchesSearch =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.producer.toLowerCase().includes(normalized) ||
        product.location.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryOptions = ["Todos", ...categoryItems.map((item) => item.label)];

  return (
    <div className="min-h-screen bg-[#f2f0eb] text-[#1f1f1f]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 border-r border-[#e9e3d9] bg-[#f8f6f1] px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a5235] text-lg font-black text-[#d9b879]">C</div>
            <div className="text-lg font-bold text-[#1c1c1c]">CINT</div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-semibold transition ${
                  item.active
                    ? "bg-[#efe7dc] text-[#1d1d1d] shadow-sm"
                    : "text-[#1f1f1f] hover:bg-[#efeae1]"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center text-current">
                  <Icon name={item.icon} />
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-[#eadfcf] bg-[#f4efe7] p-3 text-sm text-[#3e3e3e]">
            <p className="font-semibold">Canasta recomendada</p>
            <p className="mt-1 text-xs text-[#625b52]">Ahorra de forma inteligente con productos locales.</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-[#e9e3d9] bg-[#f7f5f2] px-5 py-4 sm:px-7">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2d8c7] bg-white lg:hidden">
                  <Icon name="menu" />
                </button>
                <div className="flex items-center gap-2 text-[14px] font-medium text-[#303030]">
                  <span>Managua, Nicaragua</span>
                  <Icon name="chevron" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e2d8c7] bg-white text-[#222]">
                  <Icon name="bell" />
                  <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#d65252] ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-3 rounded-full border border-[#e2d8c7] bg-white px-2 py-1.5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dfeae3] text-sm font-bold text-[#1a5235]">FP</div>
                  <span className="hidden text-sm font-semibold text-[#1f1f1f] sm:inline">Fabio palacios</span>
                  <Icon name="chevron" />
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1200px] px-5 py-7 sm:px-7">
            <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-4xl font-black tracking-[-0.06em] text-[#1a1a1a]">¡Hola, Fabio!</p>
                <p className="mt-1 text-[15px] text-[#555]">¿Qué estás buscando hoy?</p>
              </div>

              <div className="flex w-full max-w-[500px] items-center gap-3 rounded-full border border-[#e1d9ce] bg-[#ece7df] px-3 py-2 shadow-sm">
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f1ec] text-[#4b4b4b]">
                  <Icon name="menu" />
                </button>
                <input
                  aria-label="Buscar productos"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Busca productos, productores o categorías..."
                  className="w-full bg-transparent text-[14px] text-[#1f1f1f] placeholder:text-[#757575] focus:outline-none"
                />
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a5235] text-white shadow-sm">
                  <Icon name="search" />
                </button>
              </div>

              <div className="flex w-full max-w-[280px] items-center gap-3 rounded-[24px] border border-[#dce8df] bg-[#e5f4e8] px-3 py-3 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#dfeecf] text-4xl shadow-inner">🧺</div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold leading-tight text-[#1a5235]">Crear tu canasta básica y compra precisamente</p>
                </div>
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a5235] text-white shadow-sm">
                  <Icon name="plus" />
                </button>
              </div>
            </div>

            <div className="mb-7 flex flex-wrap gap-3">
              {categoryItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveCategory(item.label)}
                  className={`flex min-w-[120px] flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-center text-[14px] font-bold transition ${
                    activeCategory === item.label
                      ? "border-[#e0d4b8] bg-[#f3ead4] text-[#222] shadow-sm"
                      : "border-[#e7e0d6] bg-[#f5f2ee] text-[#3d3d3d] hover:bg-[#f0e8dc]"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <section className="mb-10">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[28px] font-black tracking-[-0.05em] text-[#1d1d1d]">Precios del mercado</p>
                  <p className="mt-1 text-[15px] text-[#696961]">Precios reportados recientemente por la comunidad.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {marketPrices.map((item) => (
                  <article key={item.id} className="rounded-[22px] border border-[#e8e1d6] bg-[#f5f2ee] p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e9d3] text-2xl">{item.icon}</div>
                        <div>
                          <p className="text-[17px] font-bold text-[#1d1d1d]">{item.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-extrabold text-[#1a5235]">{item.price}<span className="text-sm font-medium text-[#5d5d5d]">{item.unit}</span></p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-[#1a5235]">{item.trend}</span>
                      <span className="text-[#6b6b6b]">{item.trendLabel}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[13px] text-[#666]">
                      <span>{item.source}</span>
                      <span>{item.time}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4">
                <p className="text-[28px] font-black tracking-[-0.05em] text-[#1d1d1d]">Productores cerca de ti</p>
                <p className="mt-1 text-[15px] text-[#696961]">Conoce productores verificados cerca de tu zona.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {producerCards.map((producer) => (
                  <article key={producer.id} className="rounded-[22px] border border-[#e2ddd4] bg-[#f5f2ee] p-5 shadow-sm">
                    <div className="h-28 rounded-[18px] bg-gradient-to-br from-[#d9d9d9] to-[#efefef]" />
                    <div className="mt-4">
                      <p className="text-[18px] font-bold text-[#1d1d1d]">{producer.name}</p>
                      <p className="mt-1 text-[14px] text-[#666]">{producer.type}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <div className="mb-4">
                <p className="text-[28px] font-black tracking-[-0.05em] text-[#1d1d1d]">Productos recomendados</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-[24px] border border-[#e8e1d6] bg-[#f9f7f4] shadow-sm transition hover:shadow-md">
                    <div className="flex h-40 items-center justify-center bg-[#f0ece6] text-6xl">{product.image}</div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#ebf1ea] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1a5235]">{product.category}</span>
                        <span className="text-[11px] text-[#666]">{product.location}</span>
                      </div>

                      <h3 className="text-[18px] font-bold text-[#1d1d1d]">{product.name}</h3>
                      <p className="mt-1 text-[13px] text-[#666]">{product.producer}</p>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-[24px] font-black text-[#1a5235]">C$ {product.price}</p>
                          <p className="text-[12px] text-[#666]">/ {product.unit}</p>
                        </div>
                        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a5235] text-white shadow-sm">
                          <Icon name="cart" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="rounded-[22px] border border-dashed border-[#d5cdbc] bg-[#f7f3ee] p-10 text-center">
                  <p className="text-[16px] font-semibold text-[#444]">No encontramos productos para tu búsqueda.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("Todos");
                      setSearchQuery("");
                    }}
                    className="mt-4 rounded-full bg-[#1a5235] px-5 py-2 text-sm font-semibold text-white"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
