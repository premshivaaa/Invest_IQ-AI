'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface InvestmentScoreProps {
  score: number;
}

export function InvestmentScore({ score }: InvestmentScoreProps) {
  // Circular gauge constants
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const getScoreColor = (val: number) => {
    if (val >= 75) return '#10b981'; // Emerald
    if (val >= 50) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  const getScoreLabel = (val: number) => {
    if (val >= 85) return 'Strong Buy';
    if (val >= 70) return 'Moderate Buy';
    if (val >= 50) return 'Hold / Neutral';
    if (val >= 35) return 'Underperform';
    return 'Sell / Avoid';
  };

  const scoreColor = getScoreColor(score);

  return (
    <Card hoverEffect className="flex flex-col items-center justify-center p-6 h-full print-card">
      <CardHeader className="w-full text-center pb-2">
        <CardTitle className="text-sm font-semibold text-neutral-400 uppercase tracking-widest print-text">
          AI Investment Score
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center space-y-4 w-full">
        {/* Animated SVG Gauge */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="w-full h-full -rotate-90">
            {/* Background Track Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#1f2937"
              strokeWidth={strokeWidth}
              className="opacity-40"
            />
            {/* Foreground Score Circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={scoreColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Central Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-extrabold text-neutral-100 tracking-tight print-text"
            >
              {score}
            </motion.span>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              of 100
            </span>
          </div>
        </div>

        {/* Rating Category Text */}
        <div className="text-center">
          <p className="text-base font-bold print-text" style={{ color: scoreColor }}>
            {getScoreLabel(score)}
          </p>
          <p className="text-xs text-neutral-500 font-medium mt-1 leading-normal">
            Based on consolidated business fundamentals, news sentiment, and risk indexes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
