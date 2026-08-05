'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessModel as BusinessModelType } from '@/types';
import { Briefcase, Layers, Package, TrendingUp } from 'lucide-react';

interface BusinessModelProps {
  model: BusinessModelType;
}

export function BusinessModel({ model }: BusinessModelProps) {
  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <Briefcase className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Business Model</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {/* Explanation */}
        <p className="text-sm text-neutral-300 leading-relaxed print-text">
          {model.explanation}
        </p>

        {/* Products and Services Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Products */}
          {model.products && model.products.length > 0 && (
            <div className="space-y-3 bg-neutral-900/30 border border-neutral-850 rounded-xl p-4 print-border">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <Package className="h-4 w-4" />
                <span>Key Products</span>
              </div>
              <ul className="space-y-1.5">
                {model.products.map((product, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          {model.services && model.services.length > 0 && (
            <div className="space-y-3 bg-neutral-900/30 border border-neutral-850 rounded-xl p-4 print-border">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <Layers className="h-4 w-4" />
                <span>Key Services</span>
              </div>
              <ul className="space-y-1.5">
                {model.services.map((service, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed print-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Revenue Streams */}
        {model.revenue_streams && model.revenue_streams.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-neutral-800/20 print-border">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              <span>Revenue Streams</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {model.revenue_streams.map((stream, idx) => (
                <div
                  key={idx}
                  className="p-3 text-xs bg-neutral-905 border border-neutral-800/60 rounded-xl text-neutral-300 leading-normal print-border print-text"
                >
                  {stream}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
