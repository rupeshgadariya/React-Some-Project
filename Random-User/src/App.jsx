import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers")
        const data = await res.json()
        setUsers(data.data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="container">
      <h1 className="title">👤 User Directory</h1>

      <div className="grid">
        {users.map((user, index) => (
          <div className="card" key={index}>

            <img
              src={user.picture.large}
              alt={user.name.first}
              className="avatar"
            />

            <h2>
              {user.name.title} {user.name.first} {user.name.last}
            </h2>

            <p className="email">{user.email}</p>

            <p className="info">
              {user.gender} • {user.dob.age} yrs
            </p>

            <p className="location">
              📍 {user.location.city}, {user.location.country}
            </p>

            <div className="extra">
              <span>📞 {user.phone}</span>
              <span>📱 {user.cell}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App