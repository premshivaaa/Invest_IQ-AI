export interface CompanyDetails {
  name: string;
  ticker: string;
  logo_url: string;
  industry: string;
  ceo: string;
  hq: string;
  founded: string;
  employees: string;
  market_cap: string;
  website: string;
  description: string;
}

export interface BusinessModel {
  explanation: string;
  products: string[];
  services: string[];
  revenue_streams: string[];
}

export interface RevenueTrendItem {
  year: string;
  amount: number; // in billions or absolute numbers
}

export interface Financials {
  revenue: string;
  net_income: string;
  operating_margin: string;
  pe_ratio: string;
  eps: string;
  debt: string;
  cash: string;
  revenue_trend: RevenueTrendItem[];
}

export interface NewsItem {
  headline: string;
  summary: string;
  impact: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface CompetitorComparison {
  name: string;
  advantages: string[];
  disadvantages: string[];
  market_position: string;
}

export type RiskSeverity = 'low' | 'medium' | 'high';

export interface RiskDetails {
  operational: string;
  financial: string;
  market: string;
  regulatory: string;
  competition: string;
}

export interface Risks {
  operational: RiskSeverity;
  financial: RiskSeverity;
  market: RiskSeverity;
  regulatory: RiskSeverity;
  competition: RiskSeverity;
  details: RiskDetails;
}

export interface InvestmentReport {
  company: CompanyDetails;
  summary: string;
  business_model: BusinessModel;
  financials: Financials;
  latest_news: NewsItem[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  competitors: CompetitorComparison[];
  risks: Risks;
  score: number; // 0 - 100
  decision: 'INVEST' | 'PASS';
  reason: string;
  confidence: number; // 0 - 100
  key_reasons: string[];
  upside: string;
  downside: string;
  horizon: 'Short Term' | 'Medium Term' | 'Long Term';
  isDemo?: boolean;
  sources: string[];
}

export interface SearchHistoryItem {
  id: string;
  companyName: string;
  ticker: string;
  decision: 'INVEST' | 'PASS';
  score: number;
  date: string;
  report: InvestmentReport;
}

export interface AnalysisProgressStep {
  id: string;
  label: string;
  status: 'idle' | 'running' | 'success' | 'error';
}
