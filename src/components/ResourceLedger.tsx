/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GovernmentAsset } from '../types';
import { 
  Database, 
  Building2, 
  Coins, 
  Globe, 
  Sliders, 
  Info,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface ResourceLedgerProps {
  assets: GovernmentAsset[];
}

export const ResourceLedger: React.FC<ResourceLedgerProps> = ({ assets }) => {
  const [allocationRatios, setAllocationRatios] = useState<{ [key: string]: number }>({
    'asset-hud-hmis': 150000,
    'asset-samhsa-grants': 250000,
    'asset-state-caltrans-surplus': 80000,
    'asset-gis-tracts': 50000,
    'asset-medicaid-mobile': 120000,
  });

  const [simulatedPoolRatio, setSimulatedPoolRatio] = useState<number>(50); // 50/50 state/federal share

  const handleRatioSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSimulatedPoolRatio(Number(e.target.value));
  };

  const handleAdjustAllocation = (assetId: string, value: number) => {
    setAllocationRatios(prev => ({
      ...prev,
      [assetId]: Math.max(0, Math.min(1000000, value))
    }));
  };

  const totalSimulatedAllocation: number = Object.keys(allocationRatios).reduce((sum: number, key: string) => sum + (allocationRatios[key] || 0), 0);
  const federalPercentage = simulatedPoolRatio;
  const statePercentage = 100 - simulatedPoolRatio;

  return (
    <div id="resource-ledger-section" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Building2 className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">Consolidated Resource Pipeline</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-sans tracking-tight">
            Federal Council & State Resource Sharing Ledger
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            National databases, surplus public land registries, and direct state targeted response sub-grants pooled together. Student-led AI jobs draw real functional API queries and financial stipends from these streams.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60 flex items-center gap-4 shrink-0 font-mono text-left">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Active Pool</p>
            <p className="text-sm font-bold text-sky-400">
              ${(totalSimulatedAllocation).toLocaleString()}
            </p>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Synergy Ratio</p>
            <p className="text-sm font-bold text-emerald-400">
              {federalPercentage}:{statePercentage}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pool Tuning Panel */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-800/60 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono uppercase text-slate-300 tracking-wider">Joint Match Calculator</h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Governments specify matching percentage requirements on local program sub-grants. Drag the matching index to simulate regional budget balance between Federal direct allocations and State public resource equivalents.
            </p>

            {/* Slider container */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900/80 mb-6">
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                <span>Federal: {federalPercentage}%</span>
                <span>State: {statePercentage}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={simulatedPoolRatio}
                onChange={handleRatioSliderChange}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-850 rounded"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-2">
                <span>Centralized Support</span>
                <span>Localized Grants</span>
              </div>
            </div>

            {/* Simulated Stipend Impact summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/30 p-2.5 rounded border border-slate-850">
                <span className="flex items-center gap-1.5 font-sans">
                  Federal Contrib.
                </span>
                <span className="font-mono font-semibold text-sky-400">
                  ${Math.round((totalSimulatedAllocation * federalPercentage) / 100).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/30 p-2.5 rounded border border-slate-850">
                <span className="flex items-center gap-1.5 font-sans">
                  State Contribution
                </span>
                <span className="font-mono font-semibold text-emerald-400">
                  ${Math.round((totalSimulatedAllocation * statePercentage) / 100).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/40 text-left bg-slate-900/10 p-3 rounded-lg border border-slate-800/40">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              API Feed Compliance Notes
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Standard secure VPN tunnel token requirements apply. All student platforms must integrate single sign-on (SSO) with direct municipal key audits.
            </p>
          </div>
        </div>

        {/* Available Asset Feeds List */}
        <div className="lg:col-span-8 space-y-3">
          <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 text-left">
            Listed Sizable Sourced Assets
          </h3>
          {assets.map((asset) => {
            const currentSimValue = allocationRatios[asset.id] || 0;

            return (
              <div
                id={`gov-asset-${asset.id}`}
                key={asset.id}
                className="bg-slate-950/60 hover:bg-slate-950 border border-slate-800/60 text-left p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      {asset.level}
                    </span>
                    <span className="text-[10px] font-mono text-sky-400 uppercase bg-sky-500/10 border border-sky-400/20 px-2 py-0.5 rounded">
                      {asset.assetType}
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans tracking-tight">
                      {asset.agency}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">{asset.name}</h4>
                  <p className="text-xs text-slate-400 leading-normal">{asset.description}</p>
                </div>

                <div className="flex sm:flex-col items-end gap-3 sm:gap-1.5 self-stretch sm:self-auto justify-between sm:justify-start border-t sm:border-0 pt-3 sm:pt-0 border-slate-800 shrink-0">
                  <div className="text-left sm:text-right">
                    <p className="text-[9px] font-mono text-slate-500 uppercase">National Value Base</p>
                    <p className="text-xs font-mono font-bold text-slate-300">
                      ${(asset.allocatedBudgetSimulated / 1e6).toFixed(1)}M
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-mono text-slate-500 uppercase">Local Pool Seed</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <input
                        type="number"
                        value={currentSimValue}
                        onChange={(e) => handleAdjustAllocation(asset.id, Number(e.target.value))}
                        className="w-20 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-sky-300 font-mono text-center rounded px-1.5 py-0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
