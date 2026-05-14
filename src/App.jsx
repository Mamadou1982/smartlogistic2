import { motion } from 'framer-motion'
import { useSmartCI } from './hooks/useSmartCI'
import { COMMUNES, MENUS, ORDER_STATUSES, STATS, ANALYTICS_DATA, PAYMENTS_DATA } from './data/constants'

export default function SmartCIApp() {
  const s = useSmartCI()

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  if (!s.isLogged) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md rounded-[30px] p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-500">SmartCI</h1>
            <p className="text-slate-500 mt-2">Plateforme logistique intelligente</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                value={s.email}
                onChange={e => s.setEmail(e.target.value)}
                className="w-full border rounded-2xl px-4 py-4"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Mot de passe</label>
              <input
                type="password"
                value={s.password}
                onChange={e => s.setPassword(e.target.value)}
                className="w-full border rounded-2xl px-4 py-4"
              />
            </div>
            <button
              onClick={() => s.setIsLogged(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg"
            >
              Connexion
            </button>
          </div>
          <div className="mt-8 bg-slate-100 rounded-2xl p-4 text-sm text-slate-600">
            <p className="font-bold mb-2">Compte démo</p>
            <p>Email : admin@smartci.ci</p>
            <p>Mot de passe : Admin@2026</p>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── MAIN APP ──────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen flex ${s.bgMain} transition-all duration-300`}>

      {/* ── SIDEBAR ── */}
      <aside className="w-72 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white p-6 flex flex-col justify-between shadow-2xl border-r border-white/10">
        <div>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-2xl shadow-lg">
                📦
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">SmartLogistic</h1>
                <p className="text-blue-200 text-sm">ERP Livraison Premium</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Logistics Platform</p>
          </div>

          <nav className="space-y-3">
            {MENUS.map(item => (
              <button
                key={item}
                onClick={() => s.setPage(item)}
                className={`w-full text-left rounded-2xl px-5 py-4 transition-all flex items-center justify-between font-medium ${
                  s.page === item ? 'bg-green-500 text-white' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-black">
          <h3 className="font-bold text-xl mb-3">Zone de livraison</h3>
          <select
            value={s.selectedCommune}
            onChange={e => s.setSelectedCommune(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            {COMMUNES.map(c => <option key={c}>{c}</option>)}
          </select>
          <p className="mt-3 text-sm">
            Zone active : <span className="font-bold text-blue-600 ml-2">{s.selectedCommune}</span>
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => s.setDarkMode(!s.darkMode)}
            className="w-full bg-green-500 py-3 rounded-2xl font-bold"
          >
            {s.darkMode ? 'Mode Clair' : 'Mode Sombre'}
          </button>
          <div className="bg-slate-900 p-4 rounded-2xl">
            <p className="text-sm text-slate-400">Connecté en tant que</p>
            <h2 className="font-bold mt-1">Administrateur</h2>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 p-8 overflow-auto bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_25%)]">

        {/* Header */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-[32px] px-8 py-6 flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">{s.page}</h1>
            <p className="opacity-70 mt-2">Plateforme intelligente de gestion logistique</p>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Rechercher une commande, un client..."
              className="px-6 py-4 rounded-2xl border border-slate-200 bg-white text-black w-80 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            <button
              onClick={() => s.setNotifications(0)}
              className="relative bg-white text-black px-5 py-3 rounded-2xl font-semibold"
            >
              🔔
              {s.notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {s.notifications}
                </span>
              )}
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
              SmartCI AI
            </button>
            <button
              onClick={() => s.setShowPaymentModal(true)}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
            >
              Mobile Money
            </button>
          </div>
        </div>

        {/* ── DASHBOARD ── */}
        {s.page === 'Dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {STATS.map(stat => (
                <div key={stat.title} className={`${s.cardBg} rounded-[32px] p-7 shadow-xl border border-white/40 transition-all hover:scale-[1.03] hover:-translate-y-1`}>
                  <p className="opacity-70 mb-3">{stat.title}</p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className={`${s.cardBg} col-span-2 rounded-3xl p-6 shadow-sm`}>
                <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
                  <h2 className="text-2xl font-bold">Gestion des commandes</h2>
                  <button onClick={() => s.setShowAddOrder(true)} className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold transition-all">
                    + Nouvelle commande
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-5 border"><p className="text-slate-500">Total commandes</p><h3 className="text-3xl font-bold mt-2">24</h3></div>
                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200"><p className="text-green-600">Livrees</p><h3 className="text-3xl font-bold mt-2 text-green-600">15</h3></div>
                  <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200"><p className="text-orange-600">En livraison</p><h3 className="text-3xl font-bold mt-2 text-orange-600">7</h3></div>
                  <div className="bg-red-50 rounded-2xl p-5 border border-red-200"><p className="text-red-600">Annulees</p><h3 className="text-3xl font-bold mt-2 text-red-600">2</h3></div>
                </div>

                <div className="overflow-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr className="text-left opacity-70 border-b">
                        <th className="p-5">Commande</th><th className="p-5">Client</th>
                        <th className="p-5">Statut</th><th className="p-5">Montant</th><th className="p-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.filteredOrders.map(order => (
                        <tr key={order.id} className="border-b last:border-none">
                          <td className="p-5 font-bold text-blue-600">{order.id}</td>
                          <td className="p-5">
                            <p className="font-semibold">{order.client}</p>
                            <p className="text-sm text-slate-500 mt-1">{order.phone}</p>
                          </td>
                          <td className="p-5">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${s.getStatusColor(order.status)}`}>{order.status}</span>
                          </td>
                          <td className="p-5 font-bold text-green-600">{order.total}</td>
                          <td className="p-5">
                            <button
                              onClick={() => s.openOrderDetails(order)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-lg"
                            >
                              Voir details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 text-white rounded-[36px] p-8 shadow-2xl border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-6">Suivi GPS</h2>
                <div className="bg-white/10 backdrop-blur-xl rounded-[32px] h-72 border border-white/10 flex items-center justify-center text-center">
                  <div><div className="text-7xl mb-3">🛰️</div><p>Carte GPS Interactive</p></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── COMMANDES ── */}
        {s.page === 'Commandes' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">Gestion complète des commandes</h2>
              <div className="flex gap-4">
                <select value={s.selectedCommune} onChange={e => s.setSelectedCommune(e.target.value)} className="border rounded-2xl px-4 py-3">
                  {COMMUNES.map(c => <option key={c}>{c}</option>)}
                </select>
                <button onClick={() => s.setShowAddOrder(true)} className="bg-green-500 text-white px-6 py-3 rounded-2xl">Nouvelle commande</button>
              </div>
            </div>
            <div className="space-y-5">
              {s.filteredOrders.map((order, index) => (
                <div key={index} className="border rounded-3xl p-6 grid xl:grid-cols-5 gap-6 items-center hover:shadow-lg transition-all">
                  <div>
                    <h3 className="font-bold text-2xl">{order.id}</h3>
                    <p className="font-semibold mt-2">{order.client}</p>
                    <p className="text-sm opacity-70 mt-1">📞 {order.phone}</p>
                  </div>
                  <div>
                    <p className="font-bold">Zone</p>
                    <p>{order.commune}</p>
                    <p className="text-sm text-blue-500 mt-1">{order.quartier}</p>
                  </div>
                  <div>
                    <p className="font-bold">Produits</p>
                    <p className="text-sm mt-2 opacity-80">{order.produits}</p>
                  </div>
                  <div>
                    <p className="font-bold mb-2">Statut</p>
                    <select
                      value={order.status}
                      onChange={e => s.updateOrderStatus(s.orders.indexOf(order), e.target.value)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border-0 ${s.getStatusColor(order.status)}`}
                    >
                      {ORDER_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                    <p className="text-sm mt-3 opacity-70">🚚 {order.livreur}</p>
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-green-500">{order.total}</p>
                    <p className="text-sm opacity-70 mt-2">💳 {order.paiement}</p>
                    <p className="text-sm opacity-60 mt-1">📅 {order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STOCKS ── */}
        {s.page === 'Stocks' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Gestion du stock</h2>
              <div className="bg-green-500 text-white px-5 py-3 rounded-2xl font-bold">Stock synchronise</div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left opacity-70">
                  <th className="pb-4">Produit</th><th className="pb-4">Stock</th>
                  <th className="pb-4">Prix</th><th className="pb-4">Etat</th>
                </tr>
              </thead>
              <tbody>
                {s.products.map((p, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-5 font-bold">{p.name}</td>
                    <td>{p.stock}</td>
                    <td>{p.price}</td>
                    <td>
                      <span className={`px-4 py-2 rounded-full text-white ${p.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`}>
                        {p.stock < 10 ? 'Stock faible' : 'Disponible'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── PRODUITS ── */}
        {s.page === 'Produits' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Gestion des produits</h2>
              <button onClick={() => s.setShowAddProduct(true)} className="bg-blue-500 text-white px-6 py-3 rounded-2xl">Ajouter produit</button>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {s.products.map((p, i) => (
                <div key={i} className="border rounded-3xl p-6">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <p className="mt-2 opacity-70">Stock : {p.stock}</p>
                  <p className="mt-2 font-bold text-green-500">{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LIVREURS ── */}
        {s.page === 'Livreurs' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Gestion des livreurs</h2>
              <button onClick={() => s.setShowAddDriver(true)} className="bg-green-500 text-white px-6 py-3 rounded-2xl">Ajouter livreur</button>
            </div>
            <div className="space-y-5">
              {s.filteredDrivers.map((driver, index) => (
                <div key={index} className="border rounded-2xl p-5 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{driver.firstName} {driver.lastName}</h3>
                    <p>{driver.zone}</p>
                    <p className="text-sm mt-1 opacity-70">📞 {driver.phone}</p>
                    <p className="text-sm text-green-500 mt-1">Zone active compatible</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => s.toggleDriverStatus(s.drivers.indexOf(driver))}
                      className={`px-5 py-3 rounded-xl text-white ${driver.status === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'}`}
                    >
                      {driver.status}
                    </button>
                    <button onClick={() => s.deleteDriver(s.drivers.indexOf(driver))} className="bg-red-500 text-white px-5 py-3 rounded-xl">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PAIEMENTS ── */}
        {s.page === 'Paiements' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <h2 className="text-3xl font-bold mb-8">Paiements Mobile Money</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {PAYMENTS_DATA.map((p, i) => (
                <div key={i} className="border rounded-3xl p-6">
                  <div className="text-5xl mb-4">💳</div>
                  <h3 className="text-2xl font-bold">{p.method}</h3>
                  <p className="mt-2">{p.amount}</p>
                  <div className="mt-4 bg-green-500 text-white inline-block px-4 py-2 rounded-xl">{p.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STATISTIQUES ── */}
        {s.page === 'Statistiques' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">Statistiques & Analytics</h2>
              <select value={s.analyticsPeriod} onChange={e => s.setAnalyticsPeriod(e.target.value)} className="border rounded-2xl px-5 py-3">
                <option value="semaine">Cette semaine</option>
                <option value="mois">Ce mois</option>
                <option value="annee">Cette année</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
              <div className="bg-green-500 text-white rounded-3xl p-6"><h3 className="text-lg font-semibold">Ventes</h3><p className="text-3xl font-bold mt-4">{ANALYTICS_DATA[s.analyticsPeriod].ventes}</p></div>
              <div className="bg-blue-500 text-white rounded-3xl p-6"><h3 className="text-lg font-semibold">Commandes</h3><p className="text-3xl font-bold mt-4">{ANALYTICS_DATA[s.analyticsPeriod].commandes}</p></div>
              <div className="bg-orange-500 text-white rounded-3xl p-6"><h3 className="text-lg font-semibold">Retours</h3><p className="text-3xl font-bold mt-4">{ANALYTICS_DATA[s.analyticsPeriod].retours}</p></div>
              <div className="bg-red-500 text-white rounded-3xl p-6"><h3 className="text-lg font-semibold">Pertes</h3><p className="text-3xl font-bold mt-4">{ANALYTICS_DATA[s.analyticsPeriod].pertes}</p></div>
              <div className="bg-slate-900 text-white rounded-3xl p-6"><h3 className="text-lg font-semibold">Benefices</h3><p className="text-3xl font-bold mt-4">{ANALYTICS_DATA[s.analyticsPeriod].benefices}</p></div>
            </div>
            <div className="grid xl:grid-cols-2 gap-6">
              <div className="border rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Performance commerciale</h3>
                <div className="space-y-5">
                  {[['Taux de livraison','96%','green'],['Satisfaction clients','98%','blue'],['Taux de retour','4%','orange']].map(([label, val, color]) => (
                    <div key={label}>
                      <div className="flex justify-between mb-2"><span>{label}</span><span className="font-bold">{val}</span></div>
                      <div className="bg-slate-200 h-4 rounded-full overflow-hidden">
                        <div className={`bg-${color}-500 h-full`} style={{ width: val }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Resume financier</h3>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between border-b pb-3"><span>Chiffre affaires</span><span className="font-bold text-green-500">{ANALYTICS_DATA[s.analyticsPeriod].ventes}</span></div>
                  <div className="flex justify-between border-b pb-3"><span>Pertes logistiques</span><span className="font-bold text-red-500">{ANALYTICS_DATA[s.analyticsPeriod].pertes}</span></div>
                  <div className="flex justify-between border-b pb-3"><span>Retours commandes</span><span className="font-bold text-orange-500">{ANALYTICS_DATA[s.analyticsPeriod].retours}</span></div>
                  <div className="flex justify-between pt-3 text-2xl font-bold"><span>Benefice net</span><span className="text-blue-500">{ANALYTICS_DATA[s.analyticsPeriod].benefices}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SUPPORT ── */}
        {s.page === 'Support' && (
          <div className={`${s.cardBg} rounded-3xl p-8 shadow-sm`}>
            <h2 className="text-3xl font-bold mb-8">Centre de support</h2>
            <div className="space-y-6">
              <div className="border rounded-2xl p-6"><h3 className="font-bold text-xl">Support Technique</h3><p className="mt-2 opacity-70">Assistance système et maintenance.</p></div>
              <div className="border rounded-2xl p-6"><h3 className="font-bold text-xl">Support Livraison</h3><p className="mt-2 opacity-70">Gestion des incidents de livraison.</p></div>
            </div>
          </div>
        )}

        {/* ── ORDER DETAILS MODAL ── */}
        {s.showOrderDetails && s.selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-auto">
            <div className="bg-white w-full max-w-6xl rounded-[35px] overflow-hidden shadow-2xl">
              <div className="p-8 border-b bg-slate-50 flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900">Details de la commande</h2>
                  <p className="text-blue-600 font-bold text-2xl mt-3">{s.selectedOrder.id}</p>
                </div>
                <button onClick={() => s.setShowOrderDetails(false)} className="text-4xl text-slate-500 hover:text-black">✕</button>
              </div>
              <div className="p-8 grid xl:grid-cols-4 gap-6 bg-white">
                <div className="border rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-5 text-blue-600">Informations client</h3>
                  <div className="space-y-4">
                    <p><span className="font-bold">Client :</span> {s.selectedOrder.client}</p>
                    <p><span className="font-bold">Telephone :</span> {s.selectedOrder.phone}</p>
                    <p><span className="font-bold">Commune :</span> {s.selectedOrder.commune}</p>
                    <p><span className="font-bold">Quartier :</span> {s.selectedOrder.quartier}</p>
                  </div>
                </div>
                <div className="border rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-5 text-purple-600">Informations commande</h3>
                  <div className="space-y-4">
                    <p><span className="font-bold">Produits :</span> {s.selectedOrder.produits}</p>
                    <p><span className="font-bold">Paiement :</span> {s.selectedOrder.paiement}</p>
                    <p><span className="font-bold">Montant :</span> {s.selectedOrder.total}</p>
                    <p><span className="font-bold">Date :</span> {s.selectedOrder.date}</p>
                  </div>
                </div>
                <div className="border rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-5 text-orange-600">Livreur assigne</h3>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-5xl mb-4">👨🏾</div>
                    <p className="font-bold text-xl">{s.selectedOrder.livreur}</p>
                    <div className="mt-4 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">{s.selectedOrder.status}</div>
                  </div>
                </div>
                <div className="border rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-5 text-green-600">Timeline livraison</h3>
                  <div className="space-y-5">
                    {[['bg-orange-500','Preparation','Commande preparee'],['bg-blue-500','Assignee','Livreur assigne'],['bg-yellow-500','En livraison','Livraison en cours']].map(([color, label, sub]) => (
                      <div key={label} className="flex gap-3">
                        <div className={`w-4 h-4 rounded-full ${color} mt-1`}></div>
                        <div><p className="font-bold">{label}</p><p className="text-sm text-slate-500">{sub}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 border-t bg-slate-50 flex flex-wrap gap-4 justify-between">
                <div className="flex gap-4 flex-wrap">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold">Imprimer facture</button>
                  <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold">Voir PDF</button>
                </div>
                <button onClick={() => s.setShowOrderDetails(false)} className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold">Fermer</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PAYMENT MODAL ── */}
        {s.showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white text-black w-full max-w-md rounded-[30px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Paiement Mobile Money</h2>
                <button onClick={s.closePaymentSystem} className="text-2xl">✕</button>
              </div>
              {!s.paymentSuccess ? (
                <div className="space-y-4">
                  {[['Orange Money','bg-orange-500'],['MTN Money','bg-yellow-500'],['Wave','bg-blue-500'],['Moov Money','bg-green-600']].map(([method, cls]) => (
                    <button key={method} onClick={() => s.processPayment(method)} className={`w-full ${cls} hover:scale-[1.02] transition-all text-white py-4 rounded-2xl font-bold`}>
                      {method}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-7xl mb-5">✅</div>
                  <h3 className="text-3xl font-bold text-green-600 mb-3">Paiement Reussi</h3>
                  <p className="text-lg mb-2">Methode utilisee :</p>
                  <div className="bg-slate-100 rounded-2xl px-5 py-4 inline-block font-bold text-xl">{s.selectedPayment}</div>
                  <button onClick={s.closePaymentSystem} className="mt-8 w-full bg-green-500 text-white py-4 rounded-2xl font-bold">Terminer</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ADD ORDER MODAL ── */}
        {s.showAddOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-auto">
            <div className="bg-white text-black w-full max-w-2xl rounded-[30px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-4xl font-bold">Nouvelle commande</h2>
                  <p className="text-slate-500 mt-2">Creer une commande professionnelle</p>
                </div>
                <button onClick={() => s.setShowAddOrder(false)} className="text-3xl">✕</button>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input value={s.newOrderClient} onChange={e => s.setNewOrderClient(e.target.value)} placeholder="Nom du client" className="border rounded-2xl px-5 py-4" />
                <input value={s.newOrderPhone} onChange={e => s.setNewOrderPhone(e.target.value)} placeholder="Telephone du client" className="border rounded-2xl px-5 py-4" />
                <select value={s.selectedCommune} onChange={e => s.setSelectedCommune(e.target.value)} className="border rounded-2xl px-5 py-4">
                  {COMMUNES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input value={s.newOrderQuartier} onChange={e => s.setNewOrderQuartier(e.target.value)} placeholder="Quartier" className="border rounded-2xl px-5 py-4" />
                <textarea value={s.newOrderProducts} onChange={e => s.setNewOrderProducts(e.target.value)} placeholder="Produits commandes" className="border rounded-2xl px-5 py-4 md:col-span-2 min-h-[120px]" />
                <input value={s.newOrderAmount} onChange={e => s.setNewOrderAmount(e.target.value)} placeholder="Montant total" className="border rounded-2xl px-5 py-4" />
                <select value={s.newOrderPayment} onChange={e => s.setNewOrderPayment(e.target.value)} className="border rounded-2xl px-5 py-4">
                  <option>Orange Money</option><option>MTN Money</option><option>Wave</option><option>Moov Money</option><option>Paiement livraison</option>
                </select>
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-5">
                <div className="bg-slate-100 rounded-2xl p-5">
                  <h3 className="font-bold text-lg mb-3">Attribution automatique</h3>
                  <p>Zone active : <span className="font-bold text-blue-500 ml-2">{s.selectedCommune}</span></p>
                  <p className="mt-2 text-sm opacity-70">Le système assigne automatiquement un livreur disponible.</p>
                </div>
                <div className="flex items-end">
                  <button onClick={s.addOrder} className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl text-xl font-bold">Enregistrer la commande</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ADD DRIVER MODAL ── */}
        {s.showAddDriver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white text-black w-full max-w-lg rounded-[30px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Ajouter un livreur</h2>
                <button onClick={() => s.setShowAddDriver(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-5">
                <input value={s.newDriverFirstName} onChange={e => s.setNewDriverFirstName(e.target.value)} placeholder="Prenom du livreur" className="w-full border rounded-2xl px-4 py-4" />
                <input value={s.newDriverLastName} onChange={e => s.setNewDriverLastName(e.target.value)} placeholder="Nom du livreur" className="w-full border rounded-2xl px-4 py-4" />
                <input value={s.newDriverPhone} onChange={e => s.setNewDriverPhone(e.target.value)} placeholder="Numero de telephone" className="w-full border rounded-2xl px-4 py-4" />
                <select value={s.newDriverZone} onChange={e => s.setNewDriverZone(e.target.value)} className="w-full border rounded-2xl px-4 py-4">
                  {COMMUNES.map(c => <option key={c}>{c}</option>)}
                </select>
                <button onClick={s.addDriver} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold">Enregistrer le livreur</button>
              </div>
            </div>
          </div>
        )}

        {/* ── ADD PRODUCT MODAL ── */}
        {s.showAddProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white text-black w-full max-w-lg rounded-[30px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Ajouter un produit</h2>
                <button onClick={() => s.setShowAddProduct(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-5">
                <input value={s.newProductName} onChange={e => s.setNewProductName(e.target.value)} placeholder="Nom du produit" className="w-full border rounded-2xl px-4 py-4" />
                <input value={s.newProductStock} onChange={e => s.setNewProductStock(e.target.value)} placeholder="Stock" className="w-full border rounded-2xl px-4 py-4" />
                <input value={s.newProductPrice} onChange={e => s.setNewProductPrice(e.target.value)} placeholder="Prix" className="w-full border rounded-2xl px-4 py-4" />
                <button onClick={s.addProduct} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold">Enregistrer le produit</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
