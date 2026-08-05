'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  History,
  TrendingUp,
  Brain,
  ShieldCheck,
  Zap,
  BarChart3,
  Sparkles,
  Settings,
  X,
  AlertCircle,
} from 'lucide-react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ResearchDashboard } from '@/components/ResearchDashboard';
import { SearchHistory } from '@/components/SearchHistory';
import { streamAnalysis } from '@/lib/api-client';
import { InvestmentReport, SearchHistoryItem, AnalysisProgressStep } from '@/types';

// Zod search schema
const searchSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Please enter a company name.')
    .max(60, 'Company name is too long.'),
  provider: z.enum(['openai', 'gemini']),
});

type SearchFormData = z.infer<typeof searchSchema>;

const INITIAL_STEPS: AnalysisProgressStep[] = [
  { id: 'searching_company', label: 'Searching company', status: 'idle' },
  { id: 'gathering_info', label: 'Gathering latest information', status: 'idle' },
  { id: 'finding_financials', label: 'Finding financial insights', status: 'idle' },
  { id: 'identifying_competitors', label: 'Identifying competitors', status: 'idle' },
  { id: 'evaluating_risks', label: 'Evaluating risks', status: 'idle' },
  { id: 'running_reasoning', label: 'Running AI reasoning', status: 'idle' },
  { id: 'generating_recommendation', label: 'Generating investment recommendation', status: 'idle' },
];

export default function Home() {
  const { success, error, warning } = useToast();
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>('investiq_history', []);
  const [currentReport, setCurrentReport] = useState<InvestmentReport | null>(null);
  
  // App states
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [steps, setSteps] = useState<AnalysisProgressStep[]>(INITIAL_STEPS);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchedName, setSearchedName] = useState('');

  // Default parameters
  const [defaultProvider, setDefaultProvider] = useLocalStorage<'openai' | 'gemini'>('investiq_provider', 'gemini');

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      companyName: '',
      provider: defaultProvider,
    },
  });

  const selectedProvider = watch('provider');

  // Trigger analysis pipeline
  const onSubmit = async (data: SearchFormData) => {
    setStatus('loading');
    setErrorMsg(null);
    setSearchedName(data.companyName);
    
    // Reset steps
    setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: 'idle' })));

    // Begin SSE Streaming
    await streamAnalysis(
      data.companyName,
      data.provider,
      // Progress handler
      (stepId, stepStatus, message) => {
        setSteps((prev) =>
          prev.map((s) => {
            if (s.id === stepId) {
              return { ...s, status: stepStatus };
            }
            // Mark preceding steps as success if we reach a new running step
            if (stepStatus === 'running') {
              const currentIdx = prev.findIndex((item) => item.id === stepId);
              const itemIdx = prev.findIndex((item) => item.id === s.id);
              if (itemIdx < currentIdx && s.status !== 'success') {
                return { ...s, status: 'success' };
              }
            }
            return s;
          })
        );
      },
      // Completion handler
      (report: InvestmentReport) => {
        // Cache in history
        const newHistoryItem: SearchHistoryItem = {
          id: Math.random().toString(36).substring(2, 9),
          companyName: report.company.name,
          ticker: report.company.ticker,
          decision: report.decision,
          score: report.score,
          date: new Date().toISOString(),
          report: report,
        };

        setHistory((prev) => {
          // Prevent duplicates for the same ticker
          const filtered = prev.filter((item) => item.report.company.ticker !== report.company.ticker);
          return [newHistoryItem, ...filtered].slice(0, 15); // keep latest 15
        });

        setCurrentReport(report);
        setStatus('success');
        success('Analysis Complete', `Successfully generated report for ${report.company.name}.`);
      },
      // Error handler
      (message) => {
        console.error('Pipeline error:', message);
        setErrorMsg(message);
        setStatus('error');
        error('Analysis Failed', message);
      }
    );
  };

  // Select cached item from history
  const handleSelectHistory = (item: SearchHistoryItem) => {
    setCurrentReport(item.report);
    setStatus('success');
    setHistoryOpen(false);
    success('Loaded cached report', `Viewing cached analysis for ${item.companyName}.`);
  };

  // Delete search record
  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    warning('Item removed', 'Search history record has been deleted.');
  };

  // Clear all history cache
  const handleClearHistory = () => {
    setHistory([]);
    warning('History cleared', 'All cached investment reports have been deleted.');
  };

  // Navigate back to landing
  const handleReset = () => {
    setCurrentReport(null);
    setStatus('idle');
    setSearchedName('');
    setValue('companyName', '');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between dot-grid">
      {/* Decorative Gradient Background Glares */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-neutral-900/60 glass sticky top-0 z-40 px-6 py-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-neutral-50 to-neutral-300 bg-clip-text text-transparent">
            InvestIQ <span className="text-indigo-400 font-medium">AI</span>
          </span>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2">
          {/* History Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHistoryOpen(true)}
            className="relative"
          >
            <History className="h-4.5 w-4.5 text-neutral-400 mr-2" />
            <span>History</span>
            {history.length > 0 && (
              <span className="ml-1.5 h-2 w-2 rounded-full bg-indigo-500" />
            )}
          </Button>

          {/* Model settings button */}
          <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-4.5 w-4.5 text-neutral-400" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* 1. Landing Page / Idle state */}
          {status === 'idle' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto px-6 w-full text-center space-y-12"
            >
              {/* Hero Header */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Configurable Multi-Agent Pipeline</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight animated-gradient-text leading-none">
                  AI Investment Research Agent
                </h1>
                <p className="text-neutral-400 text-base md:text-lg">
                  Analyze any company in seconds using AI.
                </p>
              </div>

              {/* Form Search Container */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl mx-auto space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-neutral-500" />
                    <Input
                      {...register('companyName')}
                      placeholder="Enter company name..."
                      className="pl-10 h-11 text-base rounded-xl"
                      disabled={false}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    className="h-11 px-6 rounded-xl font-bold"
                  >
                    Analyze
                  </Button>
                </div>
                {errors.companyName && (
                  <p className="text-xs text-rose-400 text-left pl-2 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.companyName.message}
                  </p>
                )}
              </form>

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto text-xs text-neutral-500">
                <span>Try searching:</span>
                {['NVIDIA', 'Tesla', 'Apple', 'Swiggy', 'Zomato', 'Reliance'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setValue('companyName', chip)}
                    className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-12 border-t border-neutral-900/60 max-w-4xl mx-auto">
                <div className="p-5 bg-neutral-950/20 border border-neutral-900 rounded-2xl text-center space-y-3 hover:border-neutral-800 transition-colors">
                  <Brain className="h-6 w-6 text-indigo-400 mx-auto" />
                  <h3 className="text-xs font-bold text-neutral-200">AI Research</h3>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Consolidated deep agentic summaries.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950/20 border border-neutral-900 rounded-2xl text-center space-y-3 hover:border-neutral-800 transition-colors">
                  <BarChart3 className="h-6 w-6 text-indigo-400 mx-auto" />
                  <h3 className="text-xs font-bold text-neutral-200">Financial Analysis</h3>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Revenue trends & snap valuation.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950/20 border border-neutral-900 rounded-2xl text-center space-y-3 hover:border-neutral-800 transition-colors">
                  <Zap className="h-6 w-6 text-indigo-400 mx-auto" />
                  <h3 className="text-xs font-bold text-neutral-200">SWOT Analysis</h3>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Strengths, weaknesses, threats.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950/20 border border-neutral-900 rounded-2xl text-center space-y-3 hover:border-neutral-800 transition-colors">
                  <ShieldCheck className="h-6 w-6 text-indigo-400 mx-auto" />
                  <h3 className="text-xs font-bold text-neutral-200">Risk Assessment</h3>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Operational & market index ratings.
                  </p>
                </div>

                <div className="p-5 bg-neutral-950/20 border border-neutral-900 rounded-2xl text-center space-y-3 hover:border-neutral-800 transition-colors col-span-2 md:col-span-1">
                  <TrendingUp className="h-6 w-6 text-indigo-400 mx-auto" />
                  <h3 className="text-xs font-bold text-neutral-200">Investment Thesis</h3>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Final Buy / Pass recommendations.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Loading Pipeline state */}
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen steps={steps} companyName={searchedName} />
            </motion.div>
          )}

          {/* 3. Success state - Report Dashboard */}
          {status === 'success' && currentReport && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResearchDashboard report={currentReport} onBack={handleReset} />
            </motion.div>
          )}

          {/* 4. Error state */}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center p-8 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-6"
            >
              <div className="h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center mx-auto">
                <AlertCircle className="h-6 w-6 text-rose-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-neutral-100">Research Failed</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {errorMsg || 'An unexpected error occurred while compiling analysis report.'}
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSubmit(onSubmit)}
                >
                  Retry Analysis
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Disclaimer */}
      <footer className="border-t border-neutral-900/60 py-6 text-center text-[10px] text-neutral-600 leading-normal px-6 no-print">
        <p>
          InvestIQ AI is an artificial intelligence-driven research assistant. Content is aggregated from public web search results and synthesized via large language models.
        </p>
        <p className="mt-1">
          This compiled report is for informational purposes only and does not constitute financial, investment, legal, or tax advice. Always consult a licensed broker or advisor.
        </p>
      </footer>

      {/* Side History Drawer Component */}
      <SearchHistory
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
        onClearAll={handleClearHistory}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />

      {/* Settings Modal (LLM Provider Configurator) */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 no-print">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              onClick={() => setSettingsOpen(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3">
                <h3 className="font-bold text-base text-neutral-100 flex items-center gap-2">
                  <Settings className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Configure Provider</span>
                </h3>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="text-neutral-500 hover:text-neutral-300 p-1 rounded hover:bg-neutral-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Provider Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  LLM Provider
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Gemini */}
                  <button
                    type="button"
                    onClick={() => {
                      setValue('provider', 'gemini');
                      setDefaultProvider('gemini');
                      success('Provider switched', 'Now using Gemini 2.5 Pro.');
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedProvider === 'gemini'
                        ? 'border-indigo-500 bg-indigo-500/5 text-neutral-100'
                        : 'border-neutral-850 bg-neutral-900/10 text-neutral-400 hover:bg-neutral-900/30'
                    }`}
                  >
                    <span className="font-bold text-sm">Gemini Pro</span>
                    <span className="text-[10px] text-neutral-500 mt-1">Google</span>
                  </button>

                  {/* OpenAI */}
                  <button
                    type="button"
                    onClick={() => {
                      setValue('provider', 'openai');
                      setDefaultProvider('openai');
                      success('Provider switched', 'Now using OpenAI GPT-4o.');
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedProvider === 'openai'
                        ? 'border-indigo-500 bg-indigo-500/5 text-neutral-100'
                        : 'border-neutral-850 bg-neutral-900/10 text-neutral-400 hover:bg-neutral-900/30'
                    }`}
                  >
                    <span className="font-bold text-sm">GPT-4o</span>
                    <span className="text-[10px] text-neutral-500 mt-1">OpenAI</span>
                  </button>
                </div>
              </div>

              <div className="bg-neutral-900/30 border border-neutral-850 rounded-xl p-3 text-[10px] text-neutral-400 leading-normal">
                Make sure you have populated the correct environment variables (<code className="text-indigo-400">GEMINI_API_KEY</code> / <code className="text-indigo-400">OPENAI_API_KEY</code>) in your local project root before running analyses.
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={() => setSettingsOpen(false)}
                className="w-full font-bold"
              >
                Save & Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
