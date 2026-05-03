function QuoteCard({ quote }) {
  return (
    <div className="card">
      <p className="content">"{quote.content}"</p>
      <h4 className="author">— {quote.author}</h4>
    </div>
  );
}

export default QuoteCard;