'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, ExternalLink } from 'lucide-react';

interface SourcesListProps {
  sources: string[];
}

export function SourcesList({ sources }: SourcesListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <Card hoverEffect className="no-print print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <Link2 className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Sources & References</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <p className="text-xs text-neutral-400 leading-normal mb-4 print-text">
          The research compiled above was synthesized from the following public pages and articles.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-3">
          {sources.map((url, idx) => {
            let domain = 'Source Link';
            try {
              domain = new URL(url).hostname;
            } catch (e) {}

            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-3 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-850 hover:border-neutral-700 rounded-xl transition-all text-xs text-indigo-400 font-medium group"
              >
                <span className="truncate max-w-[220px]">{domain}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
