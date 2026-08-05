'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyDetails } from '@/types';
import { Building2, Calendar, DollarSign, Globe, ShieldAlert, User, Users } from 'lucide-react';

interface CompanyOverviewProps {
  company: CompanyDetails;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  // Use Clearbit logo API, fallback to text representation
  const [logoError, setLogoError] = React.useState(false);

  return (
    <Card hoverEffect className="print-card">
      <CardHeader className="flex flex-row items-center gap-4 pb-4 border-b border-neutral-800/40 print-border">
        {!logoError && company.logo_url ? (
          <div className="h-14 w-14 rounded-2xl bg-neutral-900/80 border border-neutral-800 p-2 flex items-center justify-center shadow-lg shadow-indigo-500/5 shrink-0">
            <img
              src={company.logo_url}
              alt={`${company.name} logo`}
              className="h-full w-full object-contain rounded-lg"
              onError={() => setLogoError(true)}
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-650 border border-indigo-400/20 text-white text-xl font-extrabold shadow-lg shadow-indigo-500/20 uppercase">
            {company.name.slice(0, 2)}
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold text-neutral-100 print-text">
              {company.name}
            </CardTitle>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 uppercase">
              {company.ticker || 'PRIVATE'}
            </span>
          </div>
          <p className="text-sm text-neutral-400 font-medium mt-0.5">{company.industry}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Description */}
        <p className="text-sm text-neutral-300 leading-relaxed print-text">
          {company.description}
        </p>

        {/* Data Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-800/20 print-border">
          {/* CEO */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">CEO</p>
              <p className="text-sm font-medium text-neutral-200 mt-0.5 print-text">{company.ceo || 'N/A'}</p>
            </div>
          </div>

          {/* Headquarters */}
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Headquarters</p>
              <p className="text-sm font-medium text-neutral-200 mt-0.5 print-text">{company.hq || 'N/A'}</p>
            </div>
          </div>

          {/* Founded */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Founded</p>
              <p className="text-sm font-medium text-neutral-200 mt-0.5 print-text">{company.founded || 'N/A'}</p>
            </div>
          </div>

          {/* Employees */}
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Employees</p>
              <p className="text-sm font-medium text-neutral-200 mt-0.5 print-text">{company.employees || 'N/A'}</p>
            </div>
          </div>

          {/* Market Cap */}
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Market Cap</p>
              <p className="text-sm font-medium text-neutral-200 mt-0.5 print-text">{company.market_cap || 'N/A'}</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Website</p>
              {company.website && company.website !== 'N/A' ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-indigo-400 hover:underline hover:text-indigo-300 mt-0.5 block truncate max-w-[150px]"
                >
                  {company.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              ) : (
                <p className="text-sm font-medium text-neutral-200 mt-0.5 print-text">N/A</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
