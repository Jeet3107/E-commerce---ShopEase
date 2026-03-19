import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-xl" />
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  )

  if (!product) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-green-600 mb-6 flex items-center gap-1">
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=Product' }} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-sm text-green-600 font-medium uppercase tracking-wide">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">{'★'.repeat(Math.round(product.ratings))}</span>
            <span className="text-sm text-gray-500">{product.ratings} ({product.numReviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>
          {product.stock > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100 text-gray-600">−</button>
                <span className="px-4 py-2 font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-gray-100 text-gray-600">+</button>
              </div>
              <button onClick={handleAdd} className={`btn-primary flex-1 ${added ? 'bg-green-700' : ''}`}>
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
