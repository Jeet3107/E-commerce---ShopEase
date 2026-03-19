import { Link } from 'react-router-dom'

const CATEGORIES = ['Electronics', 'Footwear', 'Clothing', 'Home & Kitchen', 'Books']

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Everything You Need</h1>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Discover thousands of products across electronics, fashion, home & more. Fast delivery, easy returns.
          </p>
          <Link to="/products" className="bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="card p-6 text-center hover:border-green-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">
                  {cat === 'Electronics' ? '📱' : cat === 'Footwear' ? '👟' : cat === 'Clothing' ? '👕' : cat === 'Home & Kitchen' ? '🏠' : '📚'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹499' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '🔒', title: 'Secure Payment', desc: 'JWT protected checkout' },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
