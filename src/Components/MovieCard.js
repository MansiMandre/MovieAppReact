import React from 'react';
import { motion } from 'framer-motion';
import "../App.css"
function MovieCard({ movie }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://i.ibb.co/MBtjqXQ/no-poster.png'}
  alt={movie.Title}
  className="rounded-lg shadow-lg"
/>

      <h2 className="text-lg font-semibold text-center">{movie.Title}</h2>
      <p className="text-gray-600">{movie.Year}</p>
    </motion.div>
  );
}

export default MovieCard;
