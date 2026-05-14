import { useState } from 'react'
import {
  INITIAL_ORDERS, INITIAL_DRIVERS, INITIAL_PRODUCTS, INITIAL_ACTIVITIES,
} from '../data/constants'

export function useSmartCI() {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const [isLogged, setIsLogged]   = useState(false)
  const [email, setEmail]         = useState('admin@smartci.ci')
  const [password, setPassword]   = useState('Admin@2026')

  // ── UI ───────────────────────────────────────────────────────────────────
  const [page, setPage]                       = useState('Dashboard')
  const [darkMode, setDarkMode]               = useState(false)
  const [notifications, setNotifications]     = useState(3)
  const [selectedCommune, setSelectedCommune] = useState('Cocody')
  const [analyticsPeriod, setAnalyticsPeriod] = useState('mois')

  // ── Modals ───────────────────────────────────────────────────────────────
  const [showAddOrder, setShowAddOrder]       = useState(false)
  const [showAddDriver, setShowAddDriver]     = useState(false)
  const [showAddProduct, setShowAddProduct]   = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrder, setSelectedOrder]     = useState(null)
  const [paymentSuccess, setPaymentSuccess]   = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('')

  // ── Data ─────────────────────────────────────────────────────────────────
  const [orders, setOrders]       = useState(INITIAL_ORDERS)
  const [drivers, setDrivers]     = useState(INITIAL_DRIVERS)
  const [products, setProducts]   = useState(INITIAL_PRODUCTS)
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES)

  // ── New Order Form ────────────────────────────────────────────────────────
  const [newOrderClient, setNewOrderClient]   = useState('')
  const [newOrderPhone, setNewOrderPhone]     = useState('')
  const [newOrderQuartier, setNewOrderQuartier] = useState('')
  const [newOrderProducts, setNewOrderProducts] = useState('')
  const [newOrderAmount, setNewOrderAmount]   = useState('')
  const [newOrderPayment, setNewOrderPayment] = useState('Orange Money')

  // ── New Driver Form ───────────────────────────────────────────────────────
  const [newDriverFirstName, setNewDriverFirstName] = useState('')
  const [newDriverLastName, setNewDriverLastName]   = useState('')
  const [newDriverPhone, setNewDriverPhone]         = useState('')
  const [newDriverZone, setNewDriverZone]           = useState('Cocody')

  // ── New Product Form ──────────────────────────────────────────────────────
  const [newProductName, setNewProductName]   = useState('')
  const [newProductStock, setNewProductStock] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')

  // ── Computed ─────────────────────────────────────────────────────────────
  const filteredOrders  = orders.filter(o => o.commune === selectedCommune)
  const filteredDrivers = drivers.filter(d => d.zone === selectedCommune)

  const bgMain = darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
  const cardBg = darkMode ? 'bg-slate-900' : 'bg-white'

  // ── Helpers ───────────────────────────────────────────────────────────────
  const addActivity = msg => setActivities(prev => [msg, ...prev])

  const getStatusColor = status => {
    switch (status) {
      case 'Preparation':  return 'bg-orange-100 text-orange-600'
      case 'Assignee':     return 'bg-blue-100 text-blue-600'
      case 'En livraison': return 'bg-yellow-100 text-yellow-700'
      case 'Livree':       return 'bg-green-100 text-green-600'
      case 'Retournee':    return 'bg-purple-100 text-purple-600'
      case 'Annulee':      return 'bg-red-100 text-red-600'
      default:             return 'bg-slate-100 text-slate-600'
    }
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  const addOrder = () => {
    if (!newOrderClient || !newOrderPhone || !newOrderQuartier || !newOrderProducts || !newOrderAmount) return
    const availableDriver = drivers.find(d => d.zone === selectedCommune && d.status === 'Disponible')
    const order = {
      id: `#CMD${Math.floor(Math.random() * 9000)}`,
      client: newOrderClient, phone: newOrderPhone, quartier: newOrderQuartier,
      produits: newOrderProducts, paiement: newOrderPayment, commune: selectedCommune,
      livreur: availableDriver ? `${availableDriver.firstName} ${availableDriver.lastName}` : 'Non assigne',
      status: 'Preparation', total: `${newOrderAmount} FCFA`, date: "Aujourd'hui",
    }
    setOrders(prev => [order, ...prev])
    setNotifications(prev => prev + 1)
    addActivity(`Nouvelle commande ${order.id} cree pour ${order.client}`)
    setNewOrderClient(''); setNewOrderPhone(''); setNewOrderQuartier('')
    setNewOrderProducts(''); setNewOrderAmount('')
    setShowAddOrder(false)
  }

  const addProduct = () => {
    if (!newProductName || !newProductStock || !newProductPrice) return
    const product = { name: newProductName, stock: Number(newProductStock), price: newProductPrice }
    setProducts(prev => [product, ...prev])
    addActivity(`Produit ${product.name} ajoute au stock`)
    setNewProductName(''); setNewProductStock(''); setNewProductPrice('')
    setShowAddProduct(false)
  }

  const addDriver = () => {
    if (!newDriverFirstName || !newDriverLastName || !newDriverPhone) return
    const driver = { firstName: newDriverFirstName, lastName: newDriverLastName, phone: newDriverPhone, zone: newDriverZone, status: 'Disponible' }
    setDrivers(prev => [driver, ...prev])
    addActivity(`Nouveau livreur ${driver.firstName} ${driver.lastName} ajoute`)
    setNewDriverFirstName(''); setNewDriverLastName(''); setNewDriverPhone('')
    setShowAddDriver(false)
  }

  const toggleDriverStatus = index => {
    const updated = [...drivers]
    updated[index] = { ...updated[index], status: updated[index].status === 'Disponible' ? 'En mission' : 'Disponible' }
    setDrivers(updated)
  }

  const deleteDriver = index => setDrivers(prev => prev.filter((_, i) => i !== index))

  const updateOrderStatus = (index, newStatus) => {
    const updated = [...orders]
    updated[index] = { ...updated[index], status: newStatus }
    setOrders(updated)
    addActivity(`Commande ${updated[index].id} passee au statut ${newStatus}`)
  }

  const processPayment = method => {
    setSelectedPayment(method)
    setTimeout(() => {
      setPaymentSuccess(true)
      addActivity(`Paiement ${method} valide avec succes`)
    }, 1200)
  }

  const closePaymentSystem = () => {
    setShowPaymentModal(false)
    setPaymentSuccess(false)
    setSelectedPayment('')
  }

  const openOrderDetails = order => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  return {
    // auth
    isLogged, setIsLogged, email, setEmail, password, setPassword,
    // ui
    page, setPage, darkMode, setDarkMode, notifications, setNotifications,
    selectedCommune, setSelectedCommune, analyticsPeriod, setAnalyticsPeriod,
    bgMain, cardBg, getStatusColor,
    // modals
    showAddOrder, setShowAddOrder, showAddDriver, setShowAddDriver,
    showAddProduct, setShowAddProduct, showPaymentModal, setShowPaymentModal,
    showOrderDetails, setShowOrderDetails, selectedOrder, openOrderDetails,
    paymentSuccess, selectedPayment,
    // data
    orders, drivers, products, activities, filteredOrders, filteredDrivers,
    // new order form
    newOrderClient, setNewOrderClient, newOrderPhone, setNewOrderPhone,
    newOrderQuartier, setNewOrderQuartier, newOrderProducts, setNewOrderProducts,
    newOrderAmount, setNewOrderAmount, newOrderPayment, setNewOrderPayment,
    // new driver form
    newDriverFirstName, setNewDriverFirstName, newDriverLastName, setNewDriverLastName,
    newDriverPhone, setNewDriverPhone, newDriverZone, setNewDriverZone,
    // new product form
    newProductName, setNewProductName, newProductStock, setNewProductStock,
    newProductPrice, setNewProductPrice,
    // actions
    addOrder, addProduct, addDriver, toggleDriverStatus, deleteDriver,
    updateOrderStatus, processPayment, closePaymentSystem,
  }
}
