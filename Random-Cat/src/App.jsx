// App.jsx
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchCat() {
    setLoading(true)
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random")
      const data = await response.json();
      setCat(data.data)
    } catch (error) {
      console.log(`Data not fetch: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCat();
  }, [])

  return (
    <div className="app">
      <div className="header">
        <h1>Random Cat Viewer</h1>
        <p>Discover a new cat every time!</p>
      </div>

      {cat && (
        <div className="card">
          <div className="img-wrapper">
            {loading
              ? <div className="skeleton" />
              : <img src={cat.image} alt={cat.name} />
            }
          </div>

          <div className="info">
            <div className="name-row">
              <h2>{cat.name}</h2>
              <span className="origin">{cat.origin}</span>
            </div>

            <p className="desc">{cat.description}</p>

            <div className="stats">
              <div className="stat"><span>Life Span</span><strong>{cat.life_span} yrs</strong></div>
              <div className="stat"><span>Weight</span><strong>{cat.weight.metric} kg</strong></div>
              <div className="stat"><span>Energy</span><strong>{'★'.repeat(cat.energy_level)}</strong></div>
              <div className="stat"><span>Affection</span><strong>{'★'.repeat(cat.affection_level)}</strong></div>
            </div>

            <div className="temperament">
              {cat.temperament.split(',').map((t, i) => (
                <span key={i} className="tag">{t.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <button onClick={fetchCat} disabled={loading}>
        {loading ? 'Loading...' : 'New Cat ✦'}
      </button>
    </div>
  )
}

export default App