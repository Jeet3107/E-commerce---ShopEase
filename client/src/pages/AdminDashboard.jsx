import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pRes, oRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders'),
      ])
      setProducts(pRes.data)
      setOrders(oRes.data)
      const totalRevenue = oRes.data.reduce((sum, o) => sum + o.totalPrice, 0)
      setStats({
        totalProducts: pRes.data.length,
        totalOrders: oRes.data.length,
        totalRevenue,
        pendingOrders: oRes.data.filter((o) => o.status === 'pending').length,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status })
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status } : o))
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert('Failed to delete product')
    }
  }

  const TABS = ['overview', 'products', 'orders']
  const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <span className="badge bg-green-100 text-green-800 px-3 py-1">Admin</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* OVERVIEW TAB */}
          {tab === 'overview' && stats && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, color: 'text-green-600', icon: '💰' },
                  { label: 'Total Orders', value: stats.totalOrders, color: 'text-blue-600', icon: '📦' },
                  { label: 'Products', value: stats.totalProducts, color: 'text-purple-600', icon: '🛍️' },
                  { label: 'Pending Orders', value: stats.pendingOrders, color: 'text-orange-600', icon: '⏳' },
                ].map((s) => (
                  <div key={s.label} className="card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{s.icon}</span>
                    </div>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="card p-5">
                <h2 className="font-bold text-gray-900 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o._id} className="hover:bg-gray-50">
                          <td className="py-3 font-mono text-xs text-gray-600">{o._id.slice(-8).toUpperCase()}</td>
                          <td className="py-3 text-gray-700">{o.user?.name || 'N/A'}</td>
                          <td className="py-3 font-semibold">₹{o.totalPrice.toLocaleString('en-IN')}</td>
                          <td className="py-3">
                            <span className={`badge ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                          </td>
                          <td className="py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {tab === 'products' && (
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Products ({products.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 bg-gray-50">
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">Category</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/40x40?text=P' }} />
                            <span className="font-medium text-gray-900 truncate max-w-[180px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{p.category}</td>
                        <td className="px-4 py-3 font-semibold">₹{p.price.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${p.stock > 10 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {tab === 'orders' && (
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">All Orders ({orders.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 bg-gray-50">
                      <th className="px-4 py-3 font-medium">Order ID</th>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Items</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((o) => (
                      <tr key={o._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{o._id.slice(-8).toUpperCase()}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{o.user?.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{o.user?.email}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{o.items.length} item{o.items.length > 1 ? 's' : ''}</td>
                        <td className="px-4 py-3 font-semibold">₹{o.totalPrice.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <select
                            value={o.status}
                            onChange={(e) => updateStatus(o._id, e.target.value)}
                            className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 ${STATUS_COLORS[o.status]}`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
