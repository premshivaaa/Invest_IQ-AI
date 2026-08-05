'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Zap, Flame } from 'lucide-react';

interface SwotAnalysisProps {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export function SwotAnalysis({ strengths, weaknesses, opportunities, threats }: SwotAnalysisProps) {
  return (
    <div className="space-y-4">
      {/* Grid container */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card className="border-emerald-950 bg-emerald-950/5 print-card">
          <CardHeader className="flex flex-row items-center gap-3 pb-2 border-b border-emerald-900/20 print-border">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <CardTitle className="text-lg font-bold text-emerald-400 print-text">Strengths</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {strengths.map((str, idx) => (
                <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-amber-950 bg-amber-950/5 print-card">
          <CardHeader className="flex flex-row items-center gap-3 pb-2 border-b border-amber-900/20 print-border">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
            </div>
            <CardTitle className="text-lg font-bold text-amber-400 print-text">Weaknesses</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {weaknesses.map((weak, idx) => (
                <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card className="border-indigo-950 bg-indigo-950/5 print-card">
          <CardHeader className="flex flex-row items-center gap-3 pb-2 border-b border-indigo-900/20 print-border">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Zap className="h-5 w-5 text-indigo-400" />
            </div>
            <CardTitle className="text-lg font-bold text-indigo-400 print-text">Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {opportunities.map((opp, idx) => (
                <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Threats */}
        <Card className="border-rose-950 bg-rose-950/5 print-card">
          <CardHeader className="flex flex-row items-center gap-3 pb-2 border-b border-rose-900/20 print-border">
            <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <Flame className="h-5 w-5 text-rose-400" />
            </div>
            <CardTitle className="text-lg font-bold text-rose-400 print-text">Threats</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {threats.map((thr, idx) => (
                <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{thr}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
