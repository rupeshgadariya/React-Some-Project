import { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import "./styles.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/quotes"
      );
      const data = await res.json();
      setQuotes(data.data.data); // API nested structure
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const [randomQuote, setRandomQuote] = useState(null);

const getRandomQuote = () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  setRandomQuote(random);
};

  return (
    <div className="container">
      <h1>✨ Quotes Gallery</h1>
      
      <button onClick={getRandomQuote}>Random Quote</button>

{randomQuote && <QuoteCard quote={randomQuote} />}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {quotes.map((quote) => (
            <QuoteCard key={quote._id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;