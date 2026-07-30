import { useState } from "react";

export default function ProducerDashboard({ onLogout }) {
  const [inventory, setInventory] = useState([
    { id: 101, name: "Frijol Rojo Criollo", category: "Granos", price: 32, unit: "Libra", stock: 500, status: "Activo" },
    { id: 102, name: "Maíz Blanco Seco", category: "Granos", price: 18, unit: "Libra", stock: 1200, status: "Activo" },
    { id: 103, name: "Café Oro Lavado", category: "Café", price: 3200, unit: "Quintal", stock: 15, status: "Poco Stock" },
    { id: 104, name: "Cacao Fermentado", category: "Granos", price: 120, unit: "Libra", stock: 0, status: "Agotado" },
  ]);

  const metrics = {
    totalSales: "C$ 14,500",
    activeOrders: 5,
    strikes: 0,
  };

  return (
    <div className="min-h-screen bg-[#f4f4f0] font-sans flex flex-col text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-[#12422C] text-[#D8B061] font-extrabold px-3 py-1.5 rounded-lg text-xl tracking-wider">
              CINT
            </div>
            <span className="hidden sm:inline-block text-xs bg-[#f4fbf7] text-[#12422C] px-2.5 py-1 rounded-md font-bold border border-[#12422C]/20">
              Modo Productor
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative p-2 text-slate-600 hover:text-[#12422C] transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {metrics.activeOrders > 0 && (
                <span className="absolute top-1 right-1 block w-2.5 h-2.5 bg-[#D8B061] rounded-full ring-2 ring-white"></span>
              )}
            </button>
            
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">Hola, Jordan</p>
              <button onClick={onLogout} className="text-xs text-red-600 font-semibold hover:underline">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">Panel de Control</h1>
          <p className="text-sm text-slate-600">Gestiona tu inventario, revisa tus ventas y mantén tu reputación en verde.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ventas del Mes</p>
              <p className="text-2xl font-extrabold text-slate-950">{metrics.totalSales}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pedidos Activos</p>
              <p className="text-2xl font-extrabold text-slate-950">{metrics.activeOrders}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${metrics.strikes === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Strikes / Penalizaciones</p>
              <p className="text-2xl font-extrabold text-slate-950">{metrics.strikes} <span className="text-sm font-normal text-slate-400">/ 3</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-950">Mi Inventario</h2>
            <button className="bg-[#12422C] hover:bg-[#0d3120] text-white text-sm font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Nuevo Producto
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Producto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Precio</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Disponible</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-bold text-slate-950">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-950 font-medium">C$ {item.price}</div>
                      <div className="text-xs text-slate-500">por {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-950 font-medium">
                      {item.stock} {item.unit}s
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Poco Stock' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#12422C] hover:text-[#0d3120] mr-4">Editar</button>
                      <button className="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
            <div className="text-sm text-slate-500">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">4</span> de <span className="font-medium">4</span> productos
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Anterior</button>
              <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Siguiente</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
