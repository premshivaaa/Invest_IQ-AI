'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { AnalysisProgressStep } from '@/types';

interface LoadingScreenProps {
  steps: AnalysisProgressStep[];
  companyName: string;
}

export function LoadingScreen({ steps, companyName }: LoadingScreenProps) {
  // Find current running step
  const activeStep = steps.find((s) => s.status === 'running');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 max-w-lg mx-auto">
      {/* Animated Glowing Ring Spinner */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="h-20 w-20 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        </div>
      </div>

      <div className="text-center mb-8 space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-neutral-100">
          Analyzing {companyName}
        </h2>
        <p className="text-sm text-neutral-400 h-5">
          {activeStep ? activeStep.label : 'Initializing pipeline...'}
        </p>
      </div>

      {/* Steps List */}
      <div className="w-full bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-4">
        {steps.map((step, index) => {
          const isIdle = step.status === 'idle';
          const isRunning = step.status === 'running';
          const isSuccess = step.status === 'success';
          const isError = step.status === 'error';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 text-sm"
            >
              {/* Step Status Icon */}
              <div className="shrink-0">
                {isSuccess && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shadow-sm" />
                )}
                {isRunning && (
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                )}
                {isIdle && (
                  <Circle className="h-5 w-5 text-neutral-700 fill-neutral-900/30" />
                )}
                {isError && (
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                )}
              </div>

              {/* Step Label */}
              <span
                className={`font-medium transition-colors duration-200 ${
                  isSuccess
                    ? 'text-neutral-300'
                    : isRunning
                    ? 'text-indigo-400 font-semibold'
                    : isError
                    ? 'text-rose-400'
                    : 'text-neutral-500'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
