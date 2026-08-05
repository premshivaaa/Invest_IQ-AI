'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Financials } from '@/types';
import { BarChart3, TrendingUp, DollarSign, Wallet, Percent, Scale, Coins } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface FinancialSnapshotProps {
  financials: Financials;
}

export function FinancialSnapshot({ financials }: FinancialSnapshotProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format data for chart
  const chartData = financials.revenue_trend || [];

  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-neutral-800/40 print-border">
        <BarChart3 className="h-5 w-5 text-indigo-400" />
        <CardTitle className="text-xl font-semibold print-text">Financial Snapshot</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Revenue</span>
              <DollarSign className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-lg font-bold text-neutral-100 mt-2 print-text">{financials.revenue || 'N/A'}</p>
          </div>

          {/* Net Income */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Net Income</span>
              <Wallet className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-lg font-bold text-neutral-100 mt-2 print-text">{financials.net_income || 'N/A'}</p>
          </div>

          {/* Operating Margin */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Op. Margin</span>
              <Percent className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-lg font-bold text-neutral-100 mt-2 print-text">{financials.operating_margin || 'N/A'}</p>
          </div>

          {/* P/E Ratio */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">P/E Ratio</span>
              <Scale className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-lg font-bold text-neutral-100 mt-2 print-text">{financials.pe_ratio || 'N/A'}</p>
          </div>

          {/* EPS */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">EPS</span>
              <DollarSign className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-sm font-semibold text-neutral-100 mt-2 print-text">{financials.eps || 'N/A'}</p>
          </div>

          {/* Debt */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Debt</span>
              <Scale className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-sm font-semibold text-neutral-100 mt-2 print-text">{financials.debt || 'N/A'}</p>
          </div>

          {/* Cash */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-between print-border">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Cash</span>
              <Coins className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-sm font-semibold text-neutral-100 mt-2 print-text">{financials.cash || 'N/A'}</p>
          </div>

          {/* Cash to Debt context */}
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-4 flex flex-col justify-center print-border">
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Financial Health</p>
            <p className="text-xs text-neutral-400 mt-1 leading-normal print-text">
              Strong balance sheet with healthy liquidity metrics based on public reports.
            </p>
          </div>
        </div>

        {/* Revenue Trend Chart */}
        {chartData.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-neutral-800/20 print-border">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>Revenue Growth Trend</span>
            </div>
            
            <div className="h-64 w-full bg-neutral-950/20 border border-neutral-800/40 rounded-xl p-4">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      stroke="#4b5563" 
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#4b5563" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `$${val}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0c101d',
                        borderColor: '#1f2937',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#f3f4f6'
                      }}
                      formatter={(value) => [`$${value} Billion`, 'Revenue']}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-neutral-500">
                  Loading trend chart...
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
