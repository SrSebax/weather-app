"use client";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "@/components/Weather";

export default function Home() {
  // Estados
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  // URL de la API del clima
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener datos del clima:", error.message);
          setLoading(false);
        });
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-600 min-h-screen flex flex-col items-center justify-center">
      {/* Búsqueda */}
      <div className="flex flex-col items-center justify-center w-full px-6 py-4 text-white z-10">
        <form
          onSubmit={fetchWeather}
          className="flex items-center w-full p-3 bg-blue-800 bg-opacity-70 border border-blue-400 text-white rounded-full"
        >
          <input
            onChange={(e) => setCity(e.target.value)}
            className="ml-4 bg-transparent border-none text-white focus:outline-none text-xl md:text-2xl w-full placeholder-white/50"
            type="text"
            placeholder="Buscar ciudad"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-12 h-12 ml-4"
          >
            <BsSearch size={25} className="text-white" />
          </button>
        </form>
      </div>
      {/* Weather */}
      <div className="flex-grow">
        {Object.keys(weather).length > 0 && (
          <div>
            <Weather data={weather} />
          </div>
        )}
      </div>
    </div>
  );
}
