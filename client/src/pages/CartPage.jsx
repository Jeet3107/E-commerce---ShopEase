import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) return navigate('/login')
    navigate('/checkout')
  }

  if (cart.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add some products to get started</p>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cart.length} items)</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4">
              <img src={item.image} alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=P' }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
                <p className="text-green-600 font-semibold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600 text-sm">−</button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600 text-sm">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700">Clear cart</button>
        </div>

        {/* Summary */}
        <div className="card p-5 h-fit sticky top-20">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span><span className="text-green-600">{totalPrice >= 499 ? 'Free' : '₹49'}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>₹{(totalPrice + (totalPrice >= 499 ? 0 : 49)).toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button onClick={handleCheckout} className="btn-primary w-full">
            Proceed to Checkout
          </button>
          <Link to="/products" className="btn-secondary w-full mt-2 text-center block text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
