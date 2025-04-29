import React, { useState, useEffect } from "react";
import "./ImageCarousel.css";

// Importa tus imágenes
import Corte1 from "./IMG/Corte1.jpg";
import Corte2 from "./IMG/Corte2.jpg";
import Corte3 from "./IMG/Corte3.jpg";

const images = [
  {
    src: Corte1,
    title: "Corte Estilo 1",
    description: "Moderno y elegante para cualquier ocasión.",
  },
  {
    src: Corte2,
    title: "Corte Estilo 2",
    description: "Clásico con un toque profesional.",
  },
  {
    src: Corte3,
    title: "Corte Estilo 3",
    description: "Urbano y fresco para destacar.",
  },
];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setIndex((prev) => (prev + 1) % images.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          className={`carousel-slide ${i === index ? "active" : ""}`}
          key={i}
          style={{ backgroundImage: `url(${img.src})` }}
        >
          {i === index && paused && (
            <div className="overlay">
              <h2>{img.title}</h2>
              <p>{img.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
