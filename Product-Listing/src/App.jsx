import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.freeapi.app/api/v1/public/randomproducts")
      const data = await res.json()
      setProducts(data.data.data)
    }
    fetchData()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Product Listing</h1>
        <p className="subtitle">{products.length} products found</p>
      </header>

      <div className="grid">
        {products.map((item) => (
          <div key={item.id} className="card">
            <div className="img-wrapper">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="card-body">
              <span className="brand">{item.brand}</span>
              <h2 className="title">{item.title}</h2>
              <p className="desc">{item.description}</p>
              <div className="footer">
                <span className="price">${item.price}</span>
                <span className="rating">⭐ {item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App