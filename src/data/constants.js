export const COMMUNES = [
  'Abobo','Adjame','Anyama','Attecoube','Bingerville','Cocody','Koumassi',
  'Marcory','Plateau','Port-Bouet','Songon','Treichville','Yopougon','Alepe',
  'Azaguie','Bonoua','Dabou','Grand-Bassam','Jacqueville','Sikensi','Tiassale',
  'Toumodi','Yamoussoukro','Bouake','San Pedro','Korhogo','Daloa','Man',
  'Gagnoa','Abengourou','Bondoukou','Odienne','Soubre','Agboville','Aboisso',
  'Issia','Ferkessedougou','Seguela','Mankono','Bouna','Touba','Duekoue',
  'Sassandra','Tabou','Divo','Lakota','Oume','Guiglo','Toulepleu','Zuenoula',
  'Boundiali','Katiola','Sinfra','Vavoua','Meagui','Tanda','Daoukro','Arrah','MBahiakro',
]

export const MENUS = [
  'Dashboard','Commandes','Produits','Stocks','Livreurs','Paiements','Statistiques','Support',
]

export const ORDER_STATUSES = [
  'Preparation','Assignee','En livraison','Livree','Retournee','Annulee',
]

export const INITIAL_ORDERS = [
  {
    id: '#CMD1250', client: 'Grace Assi', phone: '+225 07 11 22 33 44',
    commune: 'Cocody', quartier: 'Riviera 2', produits: 'Riz 25kg x2, Huile 5L x1',
    livreur: 'Adjoua Kone', paiement: 'Orange Money', status: 'En livraison',
    total: '13 000 FCFA', date: '13 Mai 2026',
  },
  {
    id: '#CMD1249', client: 'Kouadio Yao', phone: '+225 05 44 55 66 77',
    commune: 'Yopougon', quartier: 'Niangon', produits: 'Sucre 1kg x10',
    livreur: 'Bakary Traore', paiement: 'Wave', status: 'Preparation',
    total: '9 500 FCFA', date: '12 Mai 2026',
  },
  {
    id: '#CMD1248', client: 'Traore Ibrahim', phone: '+225 01 88 77 66 55',
    commune: 'Marcory', quartier: 'Zone 4', produits: 'Huile 5L x3',
    livreur: 'Moussa Diallo', paiement: 'MTN Money', status: 'Livree',
    total: '15 000 FCFA', date: '11 Mai 2026',
  },
]

export const INITIAL_DRIVERS = [
  { firstName: 'Adjoua', lastName: 'Kone', phone: '+225 07 08 09 10 11', zone: 'Cocody', status: 'Disponible' },
  { firstName: 'Bakary', lastName: 'Traore', phone: '+225 05 04 03 02 01', zone: 'Yopougon', status: 'En mission' },
  { firstName: 'Moussa', lastName: 'Diallo', phone: '+225 01 02 03 04 05', zone: 'Marcory', status: 'Disponible' },
]

export const INITIAL_PRODUCTS = [
  { name: 'Riz 25kg', stock: 22, price: '18 000 FCFA' },
  { name: 'Huile 5L', stock: 9, price: '6 500 FCFA' },
  { name: 'Sucre 1kg', stock: 42, price: '800 FCFA' },
]

export const INITIAL_ACTIVITIES = [
  'Nouvelle commande cree',
  'Livreur assigné automatiquement',
  'Paiement Mobile Money valide',
  'Stock synchronise',
]

export const ANALYTICS_DATA = {
  semaine: { ventes: '3 250 000 FCFA', commandes: 326, retours: 12, pertes: '120 000 FCFA', benefices: '1 850 000 FCFA' },
  mois:    { ventes: '12 850 000 FCFA', commandes: 1248, retours: 38, pertes: '430 000 FCFA', benefices: '6 200 000 FCFA' },
  annee:   { ventes: '152 000 000 FCFA', commandes: 15420, retours: 412, pertes: '3 500 000 FCFA', benefices: '74 000 000 FCFA' },
}

export const STATS = [
  { title: 'Commandes', value: '1 248' },
  { title: 'Livraisons', value: '326' },
  { title: 'Clients', value: '2 456' },
  { title: 'Revenus', value: '12 850 000 FCFA' },
]

export const PAYMENTS_DATA = [
  { method: 'Orange Money', amount: '25 000 FCFA', status: 'Validé' },
  { method: 'Wave', amount: '13 500 FCFA', status: 'En attente' },
]
