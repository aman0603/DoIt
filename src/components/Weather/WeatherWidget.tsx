import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { fetchWeather } from '../../store/slices/weatherSlice';
import { Cloud, Sun, CloudRain, AlertCircle } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    dispatch(fetchWeather() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg animate-pulse`}>
        <div className="h-8 w-24 bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!data) return null;

  const getWeatherIcon = () => {
    if (data.icon.includes('01')) return <Sun className="h-8 w-8 text-yellow-400" />;
    if (data.icon.includes('09') || data.icon.includes('10')) {
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    }
    return <Cloud className="h-8 w-8 text-gray-400" />;
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg flex items-center gap-4`}>
      {getWeatherIcon()}
      <div>
        <div className="text-xl font-bold">{data.temperature}°C</div>
        <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;