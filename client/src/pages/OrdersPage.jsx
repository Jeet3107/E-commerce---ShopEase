import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import StatusBadge from '../components/ui/StatusBadge'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders/my')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card p-6 animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )

  if (orders.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
      <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
      <Link to="/products" className="btn-primary">Shop Now</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order._id} to={`/orders/${order._id}`} className="card p-5 block hover:shadow-md transition-shadow">
            <div className="flex flex-wrap justify-between gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Order ID</p>
                <p className="font-mono text-sm font-medium text-gray-900">{order._id.slice(-10).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total</p>
                <p className="text-sm font-bold text-gray-900">₹{order.totalPrice.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <StatusBadge status={order.status} />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {order.items.map((item) => (
                <img key={item._id} src={item.image} alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/48x48?text=P' }} />
              ))}
              <div className="flex items-center text-sm text-gray-500 ml-1">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
