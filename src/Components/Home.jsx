import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const rotatingMessages = [
  'Exploring New Tastes?',
  'Cooking Adventure Time!',
  'Recipe Hunt Ongoing!',
  'Craving Something Delicious?',
  'Cooking Inspiration Here!',
  'Recipe Radar On!',
  'Discover New Recipes!'
];

const messageVariants = {
  initial: { opacity: 0, y: 20 }, // Initial position and opacity
  animate: { opacity: 1, y: 0 }, // Animation to apply when new message enters
  exit: { opacity: 0, y: -20 }    // Animation to apply when old message exits
};

function Home() {
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % rotatingMessages.length);
    }, 5000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [messageIndex, setMessageIndex] = useState(0);
  return (
    <div className="home-container" >
      <h1 className="home-title" >
        Discover Delicious Recipes
      </h1>
      <p className="normal-text" >
        Welcome to the Tasty Temptations App! Explore a wide range of mouth-watering recipes, find your favorites, and add your own creations to share with the community.
      </p>
      <motion.p
        className="message-style"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={messageVariants}
        key={messageIndex} 
      >
        {rotatingMessages[messageIndex]}
      </motion.p>
      <div className="home-buttons" >
        <Link
          to="/display-recipes"
          className="home-button"
        >
          Display All Recipes
        </Link>
        <Link
          to="/search-recipes"
          className="home-button"
        >
          Search Recipes
        </Link>
        <Link
          to="/favorite-recipes"
          className="home-button"
        >
          Favorite Recipes
        </Link>
        <Link
          to="/add-recipe"
          className="home-button"
        >
          Add Recipe
        </Link>
      </div>
    </div>
  );
}

export default Home;

