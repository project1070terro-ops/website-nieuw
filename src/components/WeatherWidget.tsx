import { useEffect, useState } from 'react';
import { Cloud, CloudLightning, CloudRain, Snowflake, Sun, Wind } from 'lucide-react';
import type { Language, TranslationContent } from '../types';

type Labels = TranslationContent['routeViewer'];

interface CurrentWeather {
  temp: number;
  code: number;
  wind: number;
  description: string;
  condition: 'sunny' | 'cloudy' | 'rain' | 'snow' | 'storm';
}

const WMO: Record<number, { en: string; nl: string; es: string }> = {
  0: { en: 'Sunny', nl: 'Zonnig', es: 'Soleado' },
  1: { en: 'Clear', nl: 'Vrijhelder', es: 'Despejado' },
  2: { en: 'Partly cloudy', nl: 'Licht bewolkt', es: 'Poco nublado' },
  3: { en: 'Cloudy', nl: 'Bewolkt', es: 'Nublado' },
  45: { en: 'Fog', nl: 'Mist', es: 'Niebla' },
  48: { en: 'Fog', nl: 'Mist', es: 'Niebla' },
  51: { en: 'Drizzle', nl: 'Motregen', es: 'Llovizna' },
  53: { en: 'Drizzle', nl: 'Motregen', es: 'Llovizna' },
  55: { en: 'Drizzle', nl: 'Motregen', es: 'Llovizna' },
  61: { en: 'Light rain', nl: 'Lichte regen', es: 'Lluvia ligera' },
  63: { en: 'Rain', nl: 'Regen', es: 'Lluvia' },
  65: { en: 'Heavy rain', nl: 'Zware regen', es: 'Lluvia fuerte' },
  66: { en: 'Freezing rain', nl: 'IJzel', es: 'Lluvia helada' },
  67: { en: 'Freezing rain', nl: 'IJzel', es: 'Lluvia helada' },
  71: { en: 'Light snow', nl: 'Lichte sneeuw', es: 'Nieve ligera' },
  73: { en: 'Snow', nl: 'Sneeuw', es: 'Nieve' },
  75: { en: 'Heavy snow', nl: 'Zware sneeuw', es: 'Nieve fuerte' },
  77: { en: 'Snow', nl: 'Sneeuw', es: 'Nieve' },
  80: { en: 'Showers', nl: 'Buien', es: 'Chubascos' },
  81: { en: 'Showers', nl: 'Buien', es: 'Chubascos' },
  82: { en: 'Heavy showers', nl: 'Zware buien', es: 'Chub. fuertes' },
  95: { en: 'Thunder', nl: 'Onweer', es: 'Tormenta' },
  96: { en: 'Hail storm', nl: 'Onweer', es: 'Torm. granizo' },
  99: { en: 'Heavy storm', nl: 'Zwaar onweer', es: 'Torm. fuerte' },
};

function getIcon(code: number, size = 22) {
  if (code === 0 || code === 1) return <Sun size={size} />;
  if (code === 2 || code === 3 || (code >= 45 && code <= 48)) return <Cloud size={size} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <Snowflake size={size} />;
  if (code >= 95) return <CloudLightning size={size} />;
  return <Cloud size={size} />;
}

function getCondition(code: number): 'sunny' | 'cloudy' | 'rain' | 'snow' | 'storm' {
  if (code === 0 || code === 1) return 'sunny';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloudy';
}

export function WeatherWidget({
  lat,
  lon,
  r,
  language,
}: {
  lat: number;
  lon: number;
  r: Labels;
  language: Language;
}) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto&temperature_unit=celsius&windspeed_unit=kmh`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Weerservice onbereikbaar');
        return res.json();
      })
      .then((data) => {
        if (cancelled || !data.current) return;
        const code = data.current.weather_code;
        const label = WMO[code] || { en: '', nl: '', es: '' };
        setWeather({
          temp: data.current.temperature_2m,
          code,
          wind: data.current.wind_speed_10m,
          description: label[language] || label.en,
          condition: getCondition(code),
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : r.weatherError);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lat, lon, r.weatherError, language]);

  const condition = weather?.condition || 'cloudy';

  return (
    <div className={`route-weather ${condition}`}>
      <div className="route-weather-top">
        <h4 className="route-weather-title">{r.weatherTitle}</h4>
        {weather && (
          <span className="route-weather-wind">
            <Wind size={10} /> {Math.round(weather.wind)} km/h
          </span>
        )}
      </div>
      {loading ? (
        <p className="route-weather-loading">…</p>
      ) : error || !weather ? (
        <p className="route-weather-error">{error || r.weatherError}</p>
      ) : (
        <div className="route-weather-current">
          <span className="route-weather-icon">{getIcon(weather.code, 20)}</span>
          <span className="route-weather-temp">{Math.round(weather.temp)}°</span>
          <span className="route-weather-desc">{weather.description}</span>
        </div>
      )}
    </div>
  );
}
