import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const getWindDirectionIcon = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  useEffect(() => {
    if (data) {
      setLoading(true);
      // Get the full country name from geolocation data
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&format=json`
        )
        .then((response) => {
          setCountryName(response.data.address.country);
        })
        .catch((error) => {
          console.error("Error fetching country name:", error);
        })
        .finally(() => {
          setTimeout(() => {
            setWeatherData(data);
            setLoading(false);
          }, 1500);
        });
    }
  }, [data]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full p-4 text-white font-medium z-10 sm:w-full sm:max-w-screen-md mx-auto my-4 sm:my-8 bg-gradient-to-b from-blue-800 to-blue-600 rounded-lg shadow-lg">
      {loading ? (
        <div className="animate-spin rounded-full h-16 w-16 border-t-[6px] border-white"></div>
      ) : weatherData ? (
        <>
          <div className="mb-8">
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Icono del clima"
              width={120}
              height={120}
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold capitalize">
              {weatherData.weather[0].description}
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-yellow-400">
              {weatherData.main.temp.toFixed(0)}&#176;C
            </p>
            <div className="flex items-center justify-center mt-2 space-x-4">
              <p className="text-lg text-white">
                Mínima: {weatherData.main.temp_min.toFixed(0)}&#176;C
              </p>
              <p className="text-lg text-white">
                Máxima: {weatherData.main.temp_max.toFixed(0)}&#176;C
              </p>
            </div>
          </div>
          {/* Bottom */}
          <div className="bg-blue-800 bg-opacity-70 mt-8 p-8 rounded-lg w-full">
            <div className="text-center">
              <p className="text-xl font-semibold text-white/80">
                Clima de hoy
                <p className="font-extrabold">
                  {weatherData.name}, {countryName}
                </p>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-white">Humedad</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white">Viento</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {weatherData.wind.speed.toFixed(0)} Km/h
                </p>
                <p className="text-lg text-white">
                  {getWindDirectionIcon(weatherData.wind.deg)}{" "}
                  {weatherData.wind.deg.toFixed(0)}
                  &#176;
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
