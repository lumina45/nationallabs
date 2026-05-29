/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SocietalProblem } from '../types';
import { MapPin, AlertCircle, ShieldAlert } from 'lucide-react';

interface ProblemCardProps {
  problem: SocietalProblem;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, isSelected, onSelect }) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      default:
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/30';
    }
  };

  return (
    <div
      id={`problem-card-${problem.id}`}
      onClick={onSelect}
      className={`relative p-5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/5'
          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono tracking-wider uppercase mb-2 ${getSeverityBadge(problem.severity)}`}>
            {problem.severity}
          </span>
          <h3 className="text-base font-semibold text-slate-100 font-sans tracking-tight line-clamp-2">
            {problem.title}
          </h3>
        </div>
        <div className="shrink-0">
          {problem.severity === 'Critical' ? (
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-mono">
        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="truncate">{problem.location}</span>
      </div>

      <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed font-sans">
        {problem.description}
      </p>

      {/* Target communities */}
      <div className="mb-4">
        <h4 className="text-[11px] font-mono tracking-wider text-slate-500 uppercase mb-1.5">Targeted Civic Sectors:</h4>
        <div className="flex flex-wrap gap-1">
          {problem.targetCommunities.map((tag, idx) => (
            <span key={idx} className="bg-slate-800/60 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700/40">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {problem.historicalPrecedent && (
        <div className="pt-3 border-t border-slate-800/60">
          <p className="text-[10px] text-slate-500 italic leading-snug">
            <span className="font-semibold text-slate-400">Context:</span> {problem.historicalPrecedent}
          </p>
        </div>
      )}
    </div>
  );
};
