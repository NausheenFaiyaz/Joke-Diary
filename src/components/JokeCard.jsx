function JokeCard({ setup }) {
  return (
    <article className="joke-card">
      <div className="joke-card__rings" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="ring" />
        ))}
      </div>

      <p className="joke-card__content">{setup}</p>

      <p className="joke-card__highlight">˚✦　.　 ˚ . ✦　 　˚　 . ★⋆.　*　　 ✦</p>
     
    </article>
  );
}

export default JokeCard;
