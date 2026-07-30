import { useState } from "react";

export default function BuyerDashboard({ onLogout }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const mockProducts = [
    { id: 1, name: "Frijol Rojo Criollo", producer: "Cooperativa San José", location: "Matagalpa", category: "Granos", price: 32, unit: "Libra", stock: 500 },
    { id: 2, name: "Tomate Chiltoma Nataly", producer: "Finca El Chaparral", location: "Jinotega", category: "Vegetales", price: 450, unit: "Caja", stock: 25 },
    { id: 3, name: "Maíz Blanco Seco", producer: "Agrícola del Norte", location: "Estelí", category: "Granos", price: 18, unit: "Libra", stock: 1200 },
    { id: 4, name: "Queso Seco Tradicional", producer: "Lácteos El Ganadero", location: "Chontales", category: "Lácteos", price: 85, unit: "Libra", stock: 40 },
    { id: 5, name: "Plátano Verde Grande", producer: "Hacienda La Esperanza", location: "Rivas", category: "Frutas", price: 5, unit: "Unidad", stock: 300 },
    { id: 6, name: "Café Oro Lavado", producer: "Finca Las Nubes", location: "Matagalpa", category: "Café", price: 3200, unit: "Quintal", stock: 15 },
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "Granos", "Vegetales", "Lácteos", "Frutas", "Café"];

  return (
    <div className="min-h-screen bg-[#f4f4f0] font-sans flex flex-col text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-[#12422C] text-[#D8B061] font-extrabold px-3 py-1.5 rounded-lg text-xl tracking-wider">
              CINT
            </div>
            <span className="hidden sm:inline-block text-xs bg-[#f4fbf7] text-[#12422C] px-2.5 py-1 rounded-md font-bold border border-[#12422C]/20">
              Modo Comprador
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar productos o productores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent transition bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <button className="relative p-2 text-slate-600 hover:text-[#1E3A5F] transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                0
              </span>
            </button>
            
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-slate-900">Hola, Jordan</p>
              <button onClick={onLogout} className="text-xs text-red-600 font-semibold hover:underline">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-[#1E3A5F] rounded-3xl p-8 sm:p-10 text-white mb-8 shadow-md overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Productos frescos, trato directo</h1>
            <p className="text-sm sm:text-base max-w-2xl text-slate-200 leading-7">
              Explora el catálogo de productores locales. Encuentra calidad, precios justos y apoya la economía rural sin intermediarios.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#12422C]/40 to-transparent" />
        </div>

        <div className="md:hidden mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] bg-slate-50"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeCategory === cat
                  ? "bg-[#12422C] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="h-40 bg-slate-100 flex items-center justify-center relative">
                  <span className="text-slate-400 text-xs font-medium">Imagen del producto</span>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#12422C] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {p.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-950 text-lg leading-tight">{p.name}</h3>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {p.producer} · {p.location}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <div className="flex items-baseline justify-between gap-3 mb-3">
                      <span className="text-2xl font-extrabold text-[#12422C]">C$ {p.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/ {p.unit}</span>
                    </div>
                    <button className="w-full bg-white border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-bold py-3 rounded-2xl text-sm transition-colors flex justify-center items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium">No se encontraron productos para tu búsqueda.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}}
              className="mt-4 text-[#1E3A5F] font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
