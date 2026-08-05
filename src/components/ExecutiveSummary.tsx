'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface ExecutiveSummaryProps {
  summary: string;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <FileText className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Executive Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-neutral-300 text-sm leading-relaxed space-y-4 whitespace-pre-line print-text">
          {summary}
        </div>
      </CardContent>
    </Card>
  );
}
