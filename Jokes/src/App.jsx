import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])


  useEffect(() => {
    async function fetchJokes(params) {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes");
        const data = await response.json();
        setJokes(data.data.data)
      } catch (error) {
        console.log(`jokes not fetch ${error.message}`)
      }
    }
    fetchJokes()
  }, [])


  return (
    <div className="app">
      <div className="header">
        <div className="header-tag">Daily Humor</div>
        <h1>Jokes are Here</h1>
        <p>you are Where 😄</p>
      </div>
      <div className="grid">
        {jokes.map((joke) => (
          <div className="jokes" key={joke.id}>
            <div className="card-top">
              <span className="jokeId">#{joke.id}</span>
              <span className="category">{joke.categories}</span>
            </div>
            <p className="joke">{joke.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
