import { useState,useCallback, useEffect } from 'react';
import MovieCard from './Components/MovieCard';
import { motion } from 'framer-motion';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = '96e46e8c'; // Replace with your key

 const searchMovies = useCallback(async (resetPage = true) => {
  if (!query) return;
  setLoading(true);
  setError('');
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${resetPage ? 1 : page}`
    );
    const data = await res.json();
    if (data.Response === 'True') {
      if (resetPage) {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
        setPage(2);
      } else {
        setMovies((prev) => [...prev, ...data.Search]);
        setPage((prev) => prev + 1);
      }
    } else {
      setError(data.Error);
      setMovies([]);
    }
  } catch (err) {
    setError('Something went wrong.');
    setMovies([]);
  }
  setLoading(false);
}, [apiKey, query, page]);


  // ✅ Infinite Scroll Effect
useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      movies.length > 0 &&
      movies.length < totalResults
    ) {
      searchMovies(false);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [movies, loading, totalResults, searchMovies]);


  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?s=1024x1024&w=is&k=20&c=cSI-8stXlD8mieP_sD7jCDdWwrSXEV1w7TbTZo2TSRs=')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.h1
          className="text-5xl font-extrabold tracking-wide text-white drop-shadow-lg mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🎬 Movie Search App
        </motion.h1>

        <div className="flex space-x-2 mb-8">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 rounded-lg w-72 border border-white bg-white/30 text-white placeholder-white focus:outline-none focus:ring-4 focus:ring-white"
          />
          <button
            onClick={() => searchMovies(true)}
            className="bg-pink-500 hover:bg-pink-600 shadow-lg text-white px-5 py-3 rounded-lg transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-white mb-4">Loading...</p>}
        {error && <p className="text-red-300 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
