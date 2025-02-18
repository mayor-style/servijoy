
// File: components/favorites/Favorites.jsx
import React, { useState } from "react";
import FavoriteCard from "./components/FavoriteCard";

const Favorites = () => {
  const initialFavorites = [
    {
      id: 1,
      title: "Home Cleaning",
      shortDescription: "Keep your home spotless with our professional cleaning service.",
      image: "../../../assets/imgs/flooring.webp",
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 2,
      title: "Plumbing Services",
      shortDescription: "Fix leaks and clogs with our expert plumbing solutions.",
      image: "../../../assets/imgs/plumbing.webp",
      rating: 4.7,
      reviews: 95,
    },
    {
      id: 3,
      title: "Electrical Repairs",
      shortDescription: "Professional electrical repair services for your home or office.",
      image: "../../../assets/imgs/electrical.webp",
      rating: 4.9,
      reviews: 110,
    },
    {
      id: 4,
      title: "Painting Services",
      shortDescription: "High-quality painting services for interiors and exteriors.",
      image: "../../../assets/imgs/painting.webp",
      rating: 4.6,
      reviews: 80,
    },
  ];

  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-10 px-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center dark:text-white font-header mb-6 md:mb-8">
          My Favorites
        </h1>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
            You have no favorite services yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {favorites.map((fav) => (
              <FavoriteCard
                key={fav.id}
                favorite={fav}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
