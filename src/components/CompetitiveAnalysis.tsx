'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompetitorComparison } from '@/types';
import { Users2, ArrowUpRight, ArrowDownRight, Award } from 'lucide-react';

interface CompetitiveAnalysisProps {
  competitors: CompetitorComparison[];
}

export function CompetitiveAnalysis({ competitors }: CompetitiveAnalysisProps) {
  if (!competitors || competitors.length === 0) return null;

  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <Users2 className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Competitive Analysis</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-8">
          {competitors.map((comp, idx) => (
            <div
              key={idx}
              className="pb-6 border-b border-neutral-850 last:border-b-0 last:pb-0 print-border"
            >
              {/* Competitor Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="text-base font-bold text-neutral-100 print-text">
                  vs. {comp.name}
                </h4>
                {/* Market Position Badge */}
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-lg">
                  <Award className="h-3 w-3 text-indigo-400" />
                  <span className="font-semibold text-neutral-300">Position:</span>
                  <span>{comp.market_position}</span>
                </div>
              </div>

              {/* Comparative Columns */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Advantages */}
                <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-4 print-border">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Our Advantages
                  </span>
                  <ul className="space-y-1.5">
                    {comp.advantages.map((adv, aIdx) => (
                      <li key={aIdx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                        <span className="h-1 w-1 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-4 print-border">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-400 mb-2">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    Our Disadvantages
                  </span>
                  <ul className="space-y-1.5">
                    {comp.disadvantages.map((dis, dIdx) => (
                      <li key={dIdx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                        <span className="h-1 w-1 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
