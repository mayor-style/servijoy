import { useState } from "react";

const OptimizedImage = ({ src, alt, rounded, width, height, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackSrc = "/images/fallback-image.jpg"; // Define a fallback image path

  return (
    <div className={`relative ${className}`}>
      {/* Blurred Placeholder */}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded && !error ? "opacity-0" : "opacity-100 blur-md"
        } ${rounded}`}
      />

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded && !error ? "opacity-100" : "opacity-0"
        } ${rounded}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default OptimizedImage;