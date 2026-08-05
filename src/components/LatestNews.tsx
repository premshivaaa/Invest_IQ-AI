'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsItem } from '@/types';
import { Newspaper, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface LatestNewsProps {
  news: NewsItem[];
}

export function LatestNews({ news }: LatestNewsProps) {
  if (!news || news.length === 0) return null;

  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <Newspaper className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Latest News & Sentiment</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {news.map((item, idx) => {
            const isPositive = item.sentiment === 'positive';
            const isNegative = item.sentiment === 'negative';

            return (
              <div
                key={idx}
                className="group relative pb-6 border-b border-neutral-800/50 last:border-b-0 last:pb-0 print-border"
              >
                {/* News Header & Sentiment Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-400 transition-colors leading-snug print-text">
                    {item.headline}
                  </h4>
                  <span
                    className={`inline-flex items-center gap-1 self-start sm:self-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${
                      isPositive
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : isNegative
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                    }`}
                  >
                    {isPositive && <TrendingUp className="h-3 w-3" />}
                    {isNegative && <TrendingDown className="h-3 w-3" />}
                    <span>{item.sentiment}</span>
                  </span>
                </div>

                {/* News Description */}
                <p className="text-xs text-neutral-400 leading-relaxed mb-3 print-text">
                  {item.summary}
                </p>

                {/* Impact Analysis */}
                <div className="bg-neutral-900/40 border border-neutral-850 rounded-lg p-3 text-xs flex items-start gap-2 text-neutral-300 leading-normal print-border print-text">
                  <ArrowRight className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-indigo-400">Impact: </span>
                    {item.impact}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
