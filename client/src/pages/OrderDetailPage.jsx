import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import StatusBadge from '../components/ui/StatusBadge'

const STEPS = ['pending', 'processing', 'shipped', 'delivered']

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .catch(() => navigate('/orders'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-8"><div className="card p-8 animate-pulse space-y-4"><div className="h-6 bg-gray-200 rounded w-1/3" /><div className="h-4 bg-gray-200 rounded w-full" /></div></div>
  if (!order) return null

  const stepIndex = order.status === 'cancelled' ? -1 : STEPS.indexOf(order.status)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate('/orders')} className="text-sm text-gray-500 hover:text-green-600 mb-6 flex items-center gap-1">← Back to Orders</button>

      <div className="card p-6 mb-4">
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order #{order._id.slice(-10).toUpperCase()}</h1>
            <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Progress tracker */}
        {order.status !== 'cancelled' && (
          <div className="mb-6">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
                <div className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }} />
              </div>
              {STEPS.map((step, i) => (
                <div key={step} className="flex flex-col items-center z-10 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${i <= stepIndex ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {i < stepIndex ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs mt-1 capitalize font-medium ${i <= stepIndex ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <h2 className="font-bold text-gray-900 mb-3">Items</h2>
        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item._id} className="flex gap-3 text-sm">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/56x56?text=P' }} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-500">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>

        <hr className="mb-4" />
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
            <p className="text-gray-600">{order.shippingAddress.street}</p>
            <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p className="text-gray-600">{order.shippingAddress.pincode}</p>
          </div>
          <div className="text-right sm:text-right">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Summary</h3>
            <p className="text-gray-600">Total: <span className="font-bold text-gray-900">₹{order.totalPrice.toLocaleString('en-IN')}</span></p>
            <p className={`mt-1 font-medium ${order.isPaid ? 'text-green-600' : 'text-orange-500'}`}>
              {order.isPaid ? '✓ Paid' : 'Payment Pending'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
