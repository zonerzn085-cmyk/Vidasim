import React from 'react';
import { Weather } from '../types';
import { SunIcon, CloudIcon, BoltIcon } from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesIconSolid, CloudArrowDownIcon } from '@heroicons/react/24/solid';

interface WeatherIndicatorProps {
    weather: Weather;
}

const weatherMap = {
    'Ensolarado': { icon: <SunIcon className="w-full h-full text-yellow-400" />, color: 'text-yellow-400' },
    'Nublado': { icon: <CloudIcon className="w-full h-full text-gray-400" />, color: 'text-gray-400' },
    'Chuvoso': { icon: <CloudArrowDownIcon className="w-full h-full text-blue-400" />, color: 'text-blue-400' },
    'Tempestade': { icon: <BoltIcon className="w-full h-full text-purple-400" />, color: 'text-purple-400' },
    'Neve': { icon: <SparklesIconSolid className="w-full h-full text-cyan-300" />, color: 'text-cyan-300' },
};

function WeatherIndicator({ weather }: WeatherIndicatorProps): React.ReactElement {
    const { icon, color } = weatherMap[weather] || weatherMap['Nublado'];

    return (
        <div className="flex items-center gap-2" title={weather}>
            <div className={`w-6 h-6 ${color}`}>
                {icon}
            </div>
        </div>
    );
}

export default React.memo(WeatherIndicator);