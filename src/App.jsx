import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import JokeCard from './components/JokeCard';
import PrevButton from './components/PrevButton';
import NextButton from './components/NextButton';
import './App.css';

const API_BASE_URL = 'https://api.freeapi.app/api/v1/public/randomjokes';
const JOKES_PER_PAGE = 9;
const LIMIT = 10;

function App() {
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllJokes() {
      setIsLoading(true);
      setError('');

      try {
        let page = 1;
        let hasNext = true;
        const allJokes = [];

        while (hasNext && page <= 100) {
          const url = `${API_BASE_URL}?page=${page}&limit=${LIMIT}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: { accept: 'application/json' },
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch jokes (page ${page}).`);
          }

          const payload = await response.json();
          const jokesOnPage = payload?.data?.data ?? [];

          const normalized = jokesOnPage
            .map((item, index) => ({
              id: item.id ?? item._id ?? `${page}-${index}`,
              content: item.content ?? item.joke ?? item.setup ?? item.text ?? '',
            }))
            .filter((item) => item.content);

          allJokes.push(...normalized);
          hasNext = Boolean(payload?.data?.nextPage);
          page += 1;
        }

        if (allJokes.length === 0) {
          throw new Error('No jokes were returned from the API.');
        }

        setJokes(allJokes);
        setCurrentPage(1);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while fetching jokes.');
          setJokes([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllJokes();

    return () => controller.abort();
  }, []);

  const totalJokes = jokes.length;
  const totalPages = Math.max(1, Math.ceil(totalJokes / JOKES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * JOKES_PER_PAGE;

  const visibleJokes = useMemo(
    () => jokes.slice(start, start + JOKES_PER_PAGE),
    [jokes, start]
  );

  const isFirst = safePage === 1;
  const isLast = safePage === totalPages;

  return (
    <main className="app-shell">
      <Header totalJokes={totalJokes} />

      <section className="joke-stage" aria-live="polite">
        {isLoading && <p className="state-text">Loading jokes...</p>}

        {!isLoading && error && <p className="state-text error-text">{error}</p>}

        {!isLoading && !error && visibleJokes.length > 0 && (
          <div className="jokes-grid">
            {visibleJokes.map((joke) => (
              <JokeCard key={joke.id} setup={joke.content} />
            ))}
          </div>
        )}
      </section>

      <div className="controls-row">
        <PrevButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={isLoading || totalJokes === 0 || isFirst}
        />
        <p className="page-text">
          {totalJokes === 0 ? 'Page 0 of 0' : `Page ${safePage} of ${totalPages} (${totalJokes} jokes)`}
        </p>
        <NextButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={isLoading || totalJokes === 0 || isLast}
        />
      </div>
    </main>
  );
}

export default App;
