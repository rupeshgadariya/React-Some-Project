import './App.css'

function App() {
  async function fetchdata(params) {
    const res = await fetch("POST https://api.freeapi.app/api/v1/users/register");
    const data = await res.json();
    console.log(data.data)
  }
  fetchdata();

  return (
    <h1>Authentication</h1>
  )
}

export default App
