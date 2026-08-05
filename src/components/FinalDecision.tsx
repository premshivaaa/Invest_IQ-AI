'use client';

import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { InvestmentReport } from '@/types';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalDecisionProps {
  report: InvestmentReport;
}

export function FinalDecision({ report }: FinalDecisionProps) {
  const { decision, score, confidence, reason, key_reasons, upside, downside, horizon } = report;
  const isInvest = decision === 'INVEST';

  useEffect(() => {
    if (isInvest) {
      // Fire confetti for INVEST decision
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInvest]);

  return (
    <Card
      className={`border-2 overflow-hidden print-card ${
        isInvest
          ? 'border-emerald-500/30 bg-gradient-to-br from-neutral-950 via-neutral-950 to-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.08)]'
          : 'border-rose-500/30 bg-gradient-to-br from-neutral-950 via-neutral-950 to-rose-950/20 shadow-[0_0_30px_rgba(244,63,94,0.08)]'
      }`}
    >
      <CardContent className="p-8 space-y-6">
        {/* Recommendation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800/40 pb-6 print-border">
          <div className="flex items-center gap-4">
            <div
              className={`h-16 w-16 rounded-2xl flex items-center justify-center border text-2xl font-bold ${
                isInvest
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
              }`}
            >
              {isInvest ? '🟢' : '🔴'}
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                Final Assessment
              </span>
              <h2
                className={`text-3xl font-extrabold tracking-tight mt-0.5 print-text ${
                  isInvest ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isInvest ? 'INVEST' : 'PASS'}
              </h2>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            {/* Confidence */}
            <div className="text-right">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Confidence
              </span>
              <span className="text-xl font-extrabold text-neutral-100 mt-1 block print-text">
                {confidence}%
              </span>
            </div>
            {/* Horizon */}
            <div className="text-right">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Horizon
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-indigo-400 mt-1 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-lg">
                <Clock className="h-3.5 w-3.5" />
                <span>{horizon}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Thesis */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-neutral-300 print-text">Detailed Reasoning</h3>
          <p className="text-sm text-neutral-400 leading-relaxed print-text">{reason}</p>
        </div>

        {/* Key Reasons List */}
        {key_reasons && key_reasons.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-neutral-300 print-text">Key Catalysts</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {key_reasons.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-neutral-900/30 border border-neutral-850 rounded-xl print-border"
                >
                  <div
                    className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border mt-0.5 ${
                      isInvest
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-neutral-300 leading-relaxed print-text">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upside & Downside Catalysts */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800/40 print-border">
          {/* Upside */}
          <div className="space-y-2">
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <ArrowUpRight className="h-4 w-4" />
              Potential Upside
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed print-text">{upside}</p>
          </div>

          {/* Downside */}
          <div className="space-y-2">
            <span className="flex items-center gap-1 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <ArrowDownRight className="h-4 w-4" />
              Potential Downside
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed print-text">{downside}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
