function Header({ totalJokes }) {
  return (
    <header className="header-wrap">
      <h1>Joke Diary</h1>
      <p>Your cozy corner of comedy.</p>
      <p className="count-text">{totalJokes} joke{totalJokes === 1 ? '' : 's'} loaded</p>
    </header>
  );
}

export default Header;
