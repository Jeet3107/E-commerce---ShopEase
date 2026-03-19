import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <Link to={`/products/${product._id}`} className="card group hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Product' }}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-green-600 font-medium uppercase tracking-wide mb-1">{product.category}</span>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 flex-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(product.ratings))}</span>
          <span className="text-xs text-gray-500">({product.numReviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-orange-500 mt-1">Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of stock</p>
        )}
      </div>
    </Link>
  )
}
