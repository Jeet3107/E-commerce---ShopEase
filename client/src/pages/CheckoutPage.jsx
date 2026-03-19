import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../utils/api'

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ street: '', city: '', state: '', pincode: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const items = cart.map((i) => ({ product: i._id, quantity: i.quantity }))
      const { data } = await api.post('/orders', { items, shippingAddress: form })
      clearCart()
      navigate(`/orders/${data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Shipping form */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">Shipping Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input name="street" value={form.street} onChange={handleChange} required className="input-field" placeholder="123 Main Street" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input name="city" value={form.city} onChange={handleChange} required className="input-field" placeholder="Ahmedabad" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input name="state" value={form.state} onChange={handleChange} required className="input-field" placeholder="Gujarat" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} required className="input-field" placeholder="380001" />
            </div>

            {/* Dummy payment */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 text-sm mb-2">Payment (Demo)</h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <span className="text-sm text-gray-600">•••• •••• •••• 4242</span>
                <span className="text-xs text-green-600 ml-auto">✓ Test card</span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Placing Order...' : `Place Order — ₹${totalPrice.toLocaleString('en-IN')}`}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="card p-6 h-fit">
          <h2 className="font-bold text-gray-900 mb-4">Order Items ({cart.length})</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-3 text-sm">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/48x48?text=P' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
