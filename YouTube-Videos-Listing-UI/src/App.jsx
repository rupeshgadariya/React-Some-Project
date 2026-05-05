import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function youtube() {
      const res = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
      const data = await res.json()
      setVideos(data.data.data)
    }
    youtube()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="logo">▶ VideoFeed</div>
        <p className="count">{videos.length} videos</p>
      </header>

      <div className="grid">
        {videos.map((video) => (
          <div key={video.items.id} className="card">   {/* ✅ sahi key */}
            <div className="thumb-wrap">
              <img
                src={video.items.snippet.thumbnails.high.url}
                alt={video.items.snippet.title}
              />
              <span className="play-btn">▶</span>
            </div>
            <div className="info">
              <h2 className="title">{video.items.snippet.title}</h2>
              <div className="meta">
                <span className="channel">{video.items.snippet.channelTitle}</span>
                <span className="views">
                  {Number(video.items.statistics.viewCount).toLocaleString()} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App