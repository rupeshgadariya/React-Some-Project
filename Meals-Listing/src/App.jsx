import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [meal, setMeal] = useState([])

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/meals")
        const data = await res.json();
        setMeal(data.data.data)
      } catch (error) {
        console.log(`fetch error ${error.message}`)
      }
    }
    fetchMeal();
  }, [])

  return (
    <div className="container">
      <h1 className="title">🍽️ Meal Explorer</h1>

      <div className="grid">
        {meal.map((item) => (
          <div className="card" key={item.idMeal}>

            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="image"
            />

            <div className="card-body">
              <h2>{item.strMeal}</h2>
              <p className="info">
                {item.strArea} • {item.strCategory}
              </p>

              <div className="tags">
                {item.strTags &&
                  item.strTags.split(",").map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
              </div>

              <button className="btn">View Recipe</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App