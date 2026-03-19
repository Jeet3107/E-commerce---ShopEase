require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')
const User = require('./models/User')
const connectDB = require('./config/db')

const products = [
  { name: 'iPhone 15 Pro', description: 'Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system.', price: 134900, category: 'Electronics', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', stock: 25, ratings: 4.8, numReviews: 120 },
  { name: 'Samsung Galaxy S24', description: 'Flagship Android phone with AI features, 200MP camera, and Snapdragon 8 Gen 3.', price: 79999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', stock: 30, ratings: 4.6, numReviews: 85 },
  { name: 'Sony WH-1000XM5', description: 'Industry-leading noise cancelling headphones with 30hr battery life.', price: 26990, category: 'Electronics', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400', stock: 50, ratings: 4.9, numReviews: 200 },
  { name: 'MacBook Air M2', description: '13.6-inch Liquid Retina display, Apple M2 chip, 18hr battery, fanless design.', price: 114900, category: 'Electronics', image: 'https://images.unsplash.com/photo-1611186871525-76b5c6a4a3c0?w=400', stock: 15, ratings: 4.9, numReviews: 95 },
  { name: 'Nike Air Max 270', description: 'Iconic sneaker with large Air unit for all-day comfort and bold style.', price: 11995, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock: 80, ratings: 4.5, numReviews: 310 },
  { name: 'Adidas Ultraboost 23', description: 'Premium running shoe with Boost midsole and Primeknit upper for performance.', price: 16999, category: 'Footwear', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', stock: 60, ratings: 4.7, numReviews: 175 },
  { name: 'Levi\'s 511 Slim Jeans', description: 'Classic slim-fit jeans in stretch denim for a modern comfortable look.', price: 3499, category: 'Clothing', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', stock: 100, ratings: 4.4, numReviews: 420 },
  { name: 'Allen Solly Formal Shirt', description: 'Premium cotton formal shirt, slim fit, perfect for office wear.', price: 1299, category: 'Clothing', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', stock: 120, ratings: 4.3, numReviews: 280 },
  { name: 'Instant Pot Duo 7-in-1', description: 'Multi-use pressure cooker, slow cooker, rice cooker, steamer, and more.', price: 8999, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', stock: 40, ratings: 4.8, numReviews: 560 },
  { name: 'Dyson V12 Vacuum', description: 'Cordless vacuum with laser dust detection and 60min runtime.', price: 52900, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', stock: 20, ratings: 4.7, numReviews: 145 },
  { name: 'The Psychology of Money', description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.', price: 399, category: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', stock: 200, ratings: 4.9, numReviews: 1200 },
  { name: 'Atomic Habits', description: 'An easy and proven way to build good habits and break bad ones by James Clear.', price: 449, category: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', stock: 180, ratings: 4.9, numReviews: 980 },
]

const seedDB = async () => {
  await connectDB()
  await Product.deleteMany()
  await User.deleteMany()

  await User.create({
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    role: 'admin',
  })
  await User.create({
    name: 'Test User',
    email: 'user@ecommerce.com',
    password: 'user123',
    role: 'user',
  })
  await Product.insertMany(products)

  console.log('✅ Database seeded!')
  console.log('👤 Admin: admin@ecommerce.com / admin123')
  console.log('👤 User:  user@ecommerce.com / user123')
  process.exit()
}

seedDB()
