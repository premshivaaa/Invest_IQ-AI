'use client';

import React from 'react';
import { SearchHistoryItem } from '@/types';
import { History, Trash2, ArrowRight, X } from 'lucide-react';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchHistory({
  history,
  onSelect,
  onDelete,
  onClearAll,
  isOpen,
  onClose,
}: SearchHistoryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end no-print">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm h-full bg-neutral-950 border-l border-neutral-800 p-6 shadow-2xl flex flex-col justify-between">
        <div className="space-y-6 overflow-y-auto flex-1 pr-1">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
            <div className="flex items-center gap-2 text-neutral-100">
              <History className="h-5 w-5 text-indigo-400" />
              <h3 className="font-bold text-lg">Search History</h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-300 p-1 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          {history.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-semibold text-neutral-400">No recent searches</p>
              <p className="text-xs text-neutral-500 max-w-[200px] mx-auto leading-normal">
                Analyzed reports will be stored in your local history cache.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => {
                const isInvest = item.decision === 'INVEST';
                return (
                  <div
                    key={item.id}
                    className="group relative flex items-center justify-between p-3.5 bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-neutral-200 truncate">
                          {item.companyName}
                        </p>
                        <span className="text-[10px] text-neutral-500 font-semibold uppercase">
                          {item.ticker}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            isInvest
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/10'
                          }`}
                        >
                          {item.decision}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          Score: <span className="font-bold text-neutral-200">{item.score}</span>
                        </span>
                        <span className="text-[9px] text-neutral-500">
                          {new Date(item.date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Delete item button */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 p-1.5 hover:bg-neutral-800 rounded-lg transition-all cursor-pointer"
                        title="Delete search"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear All Footer */}
        {history.length > 0 && (
          <div className="border-t border-neutral-800/60 pt-4 mt-4">
            <button
              onClick={onClearAll}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-neutral-800 hover:border-rose-950 text-neutral-400 hover:text-rose-400 bg-neutral-950 hover:bg-rose-500/5 transition-all text-xs font-semibold cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear History Cache</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
