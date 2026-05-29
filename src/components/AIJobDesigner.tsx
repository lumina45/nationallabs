/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Faculty, SocietalProblem, AIJob } from '../types';
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Calendar,
  Network
} from 'lucide-react';

interface AIJobDesignerProps {
  selectedFaculty: Faculty | null;
  selectedProblem: SocietalProblem | null;
  onJobCreated: (newJob: AIJob) => void;
  apiKeyAvailable: boolean;
}

export const AIJobDesigner: React.FC<AIJobDesignerProps> = ({
  selectedFaculty,
  selectedProblem,
  onJobCreated,
  apiKeyAvailable,
}) => {
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadingSteps = [
    "Sourcing Department Competency frameworks...",
    "Querying federal HUD & SAMHSA authorization databases...",
    "Aligning state-to-municipal resource sharing compliance maps...",
    "Gemini model formulating the custom Human-in-the-Loop ethical AI protocols...",
    "Seeding federal emergency budget allocation grants...",
    "Commissioning Civic AI Job specifications..."
  ];

  const handleGenerate = async () => {
    if (!selectedFaculty || !selectedProblem) return;

    setGenerating(true);
    setError(null);
    setGenerationStep(0);

    // Progress loading message cycle
    const interval = setInterval(() => {
      setGenerationStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 2800);

    try {
      const response = await fetch('/api/generate-ai-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          faculty: selectedFaculty,
          problem: selectedProblem,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned error while spawning job structure.');
      }

      const rawData = await response.json();
      
      const completeJob: AIJob = {
        id: `ai-job-${Date.now()}`,
        title: rawData.title,
        facultyId: selectedFaculty.id,
        targetedProblemId: selectedProblem.id,
        roleSummary: rawData.roleSummary,
        primaryResponsibilities: rawData.primaryResponsibilities,
        aiSubsystemName: rawData.aiSubsystemName,
        aiHumanLoopTask: rawData.aiHumanLoopTask,
        federalAgencyCollaborator: rawData.federalAgencyCollaborator,
        stateAgencyCollaborator: rawData.stateAgencyCollaborator,
        resourceSharingRequired: rawData.resourceSharingRequired,
        fundingAllocationSimulated: rawData.fundingAllocationSimulated,
        societalImpactTargets: rawData.societalImpactTargets,
        createdDate: new Date().toISOString().split('T')[0],
      };

      onJobCreated(completeJob);
    } catch (err: any) {
      console.error(err);
      setError('An error occurred. Check that the dev server is fully loaded and try again.');
    } finally {
      clearInterval(interval);
      setGenerating(false);
    }
  };

  return (
    <div id="ai-job-designer-section" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">University Lab Workspace</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100 font-sans">
            AI Job Co-Creation Workshop
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Select a target societal problem and choose your student faculty. Together, we will orchestrate a custom state-federal collaborative AI career blueprint specifically engineered to resolve the challenge.
          </p>
        </div>

        {!apiKeyAvailable && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5 text-[10px] text-amber-300 font-mono self-start md:self-auto shrink-0 uppercase tracking-wider">
            Demo Mode - Guided AI Draft Simulation
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Step inputs and status mapper */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-slate-950/40 border border-slate-800/60 p-5 rounded-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-mono font-bold">1</div>
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Target Problem</h3>
          </div>
          {selectedProblem ? (
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-left">
              <p className="text-[10px] font-mono text-amber-400/80 mb-1">{selectedProblem.category}</p>
              <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{selectedProblem.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">{selectedProblem.description}</p>
            </div>
          ) : (
            <div className="p-4 border border-dashed border-slate-800 rounded-lg bg-slate-900/20 text-center">
              <p className="text-xs text-slate-500">Pick a social problem above to begin mapping.</p>
            </div>
          )}

          <div className="border-t border-slate-900 my-1"></div>

          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-mono font-bold">2</div>
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-sans">Assigned Faculty</h3>
          </div>
          {selectedFaculty ? (
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-left">
              <span className="inline-block text-[9px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded uppercase mb-1.5">
                {selectedFaculty.code}
              </span>
              <h4 className="text-xs font-bold text-slate-200">{selectedFaculty.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">{selectedFaculty.description}</p>
            </div>
          ) : (
            <div className="p-4 border border-dashed border-slate-800 rounded-lg bg-slate-900/20 text-center">
              <p className="text-xs text-slate-500">Select an academic faculty from the ledger below.</p>
            </div>
          )}

          {/* Prompt Launcher Trigger */}
          <button
            id="spawn-job-blueprint-btn"
            disabled={!selectedFaculty || !selectedProblem || generating}
            onClick={handleGenerate}
            className={`w-full mt-auto py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              selectedFaculty && selectedProblem && !generating
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                Co-Creating Job...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 text-slate-950" />
                Spawning AI Job Blueprint
                <ArrowRight className="w-4 h-4 ml-1 text-slate-950" />
              </>
            )}
          </button>
        </div>

        {/* Dynamic Canvas Area: Loading Screen vs Empty vs Preview Results */}
        <div className="lg:col-span-8 flex flex-col justify-center min-h-[300px] border border-slate-800/80 bg-slate-950/60 rounded-xl relative overflow-hidden p-6 text-center">
          {generating ? (
            <div className="flex flex-col items-center justify-center max-w-md mx-auto py-8">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border border-dashed border-amber-500/40 animate-spin absolute inset-0"></div>
                <div className="w-16 h-16 rounded-full border-t-2 border-amber-500 animate-spin flex items-center justify-center">
                  <Network className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono animate-pulse mb-2">
                Civic Lab Catalyst
              </h4>
              <p className="text-xs text-amber-400 font-mono text-center h-8 leading-relaxed">
                {loadingSteps[generationStep]}
              </p>
              <p className="text-[10px] text-slate-500 mt-6 leading-relaxed max-w-xs">
                Generating comprehensive operational tasks, identifying shared federal infrastructure pipelines, and formulating clinical audit rules.
              </p>
            </div>
          ) : error ? (
            <div className="text-center p-6 max-w-md mx-auto">
              <p className="text-rose-400 text-sm font-semibold mb-2">Operational Boundary Reached</p>
              <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
              <button
                onClick={handleGenerate}
                className="mt-4 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded text-xs text-rose-300 font-mono uppercase tracking-wider transition-all duration-200"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto">
              <Brain className="w-10 h-10 text-slate-600 mb-4" />
              <h3 className="text-base font-semibold text-slate-300 mb-2">Waiting to Architect</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect your selected academic fields to community crises. Once paired, our Gemini pipeline will structure a job charter that defines direct public benefits, student duties, automated telemetry matching, and joint federal audit checkpoints.
              </p>
              <div className="flex gap-2.5 mt-6 font-mono text-[10px] text-slate-500">
                <span className="border border-slate-800 px-2 py-1 rounded">Harness telemetry feeds</span>
                <span className="border border-slate-800 px-2 py-1 rounded">Simulate Federal Grants</span>
                <span className="border border-slate-800 px-2 py-1 rounded">Ethical oversight gates</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
