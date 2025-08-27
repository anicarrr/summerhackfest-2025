'use client'

import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import { formatNumber } from '@/lib/utils/formatting';

export const StatsPanel: React.FC = () => {
  const { 
    stardust, 
    stardustPerClick, 
    stardustPerSecond, 
    totalClicks, 
    credits, 
    prestigeLevel 
  } = useGameState();

  const stats = [
    {
      label: 'Stardust',
      value: formatNumber(stardust),
      icon: '✨',
      color: 'text-yellow-400'
    },
    {
      label: 'Per Click',
      value: formatNumber(stardustPerClick),
      icon: '👆',
      color: 'text-blue-400'
    },
    {
      label: 'Per Second',
      value: formatNumber(stardustPerSecond),
      icon: '⏱️',
      color: 'text-green-400'
    },
    {
      label: 'Total Clicks',
      value: formatNumber(totalClicks),
      icon: '🎯',
      color: 'text-purple-400'
    },
    {
      label: 'Credits',
      value: formatNumber(credits),
      icon: '💎',
      color: 'text-cyan-400'
    },
    {
      label: 'Prestige Level',
      value: prestigeLevel.toString(),
      icon: '👑',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        📊 Statistics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-gray-800/50 rounded-lg p-3 border border-gray-600 transform transition-all duration-200 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
            <div className={`text-lg font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress to Next Prestige */}
      {stardust < BigInt(1000000) && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Progress to Prestige</span>
            <span>{((Number(stardust) / 1000000) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((Number(stardust) / 1000000) * 100, 100)}%`
              }}
            />
          </div>
        </div>
      )}
      
      {/* Prestige Button */}
      {stardust >= BigInt(1000000) && (
        <div className="mt-4">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
            👑 Activate Prestige
          </button>
        </div>
      )}
    </div>
  );
};