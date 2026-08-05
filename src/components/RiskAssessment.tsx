'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Risks, RiskSeverity } from '@/types';
import { AlertOctagon, ShieldAlert } from 'lucide-react';

interface RiskAssessmentProps {
  risks: Risks;
}

export function RiskAssessment({ risks }: RiskAssessmentProps) {
  const riskCategories: { key: keyof typeof risks.details; label: string }[] = [
    { key: 'operational', label: 'Operational Risk' },
    { key: 'financial', label: 'Financial Risk' },
    { key: 'market', label: 'Market Risk' },
    { key: 'regulatory', label: 'Regulatory Risk' },
    { key: 'competition', label: 'Competition Risk' },
  ];

  const getSeverityStyles = (severity: RiskSeverity) => {
    switch (severity) {
      case 'high':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'medium':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'low':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      default:
        return 'bg-neutral-800 border-neutral-700 text-neutral-300';
    }
  };

  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <AlertOctagon className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Risk Assessment</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-5">
          {riskCategories.map(({ key, label }) => {
            const severity = risks[key] as RiskSeverity;
            const detail = risks.details[key];

            return (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 bg-neutral-900/30 border border-neutral-850 rounded-xl print-border"
              >
                {/* Risk Title & Severity Badge */}
                <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 shrink-0 sm:w-44">
                  <span className="text-xs font-bold text-neutral-200 print-text">
                    {label}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getSeverityStyles(
                      severity
                    )}`}
                  >
                    {severity}
                  </span>
                </div>

                {/* Risk Description */}
                <p className="text-xs text-neutral-400 leading-relaxed flex-1 print-text">
                  {detail}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
