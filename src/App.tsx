/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  INITIAL_PROBLEMS, 
  FACULTIES, 
  GOVERNMENT_ASSETS, 
  INITIAL_AI_JOBS 
} from './data';
import { SocietalProblem, Faculty, AIJob } from './types';
import { ProblemCard } from './components/ProblemCard';
import { FacultySelector } from './components/FacultySelector';
import { AIJobDesigner } from './components/AIJobDesigner';
import { ResourceLedger } from './components/ResourceLedger';
import { SimulationSandbox } from './components/SimulationSandbox';
import { 
  Network, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  ShieldAlert, 
  Cpu, 
  FileText, 
  Trash2,
  MapPin,
  TrendingUp,
  Workflow
} from 'lucide-react';

export default function App() {
  // Application wide state
  const [problems, setProblems] = useState<SocietalProblem[]>(INITIAL_PROBLEMS);
  const [selectedProblemId, setSelectedProblemId] = useState<string>('prob-skid-row');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('fac-social-work');
  const [activeJobs, setActiveJobs] = useState<AIJob[]>(INITIAL_AI_JOBS);
  const [simulatingJobId, setSimulatingJobId] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'blueprint' | 'ledger' | 'sandbox'>('blueprint');

  const selectedProblem = problems.find(p => p.id === selectedProblemId) || null;
  const selectedFaculty = FACULTIES.find(f => f.id === selectedFacultyId) || null;

  // Handles adding newly co-created jobs into state list
  const handleJobCreated = (newJob: AIJob) => {
    setActiveJobs(prev => [newJob, ...prev]);
    setSimulatingJobId(newJob.id);
    // Switch to sandbox so user can immediately test their newly created job!
    setCurrentTab('sandbox');
  };

  // Handles deleting an AI job position
  const handleDeleteJob = (jobId: string) => {
    setActiveJobs(prev => prev.filter(j => j.id !== jobId));
  };

  // Aggregated indicators for the main header dashboard
  const uniqueFacultiesMapped = new Set(activeJobs.map(j => j.facultyId)).size;
  const uniqueProblemsCovered = new Set(activeJobs.map(j => j.targetedProblemId)).size;
  const totalFundingAllocated = activeJobs.reduce((sum, j) => sum + j.fundingAllocationSimulated, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Visual background atmospheric elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-slate-950">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-sky-500/5 blur-[140px]" />
      </div>

      {/* Top Main Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
              <Network className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-100 font-sans">
                  CivicAI <span className="text-amber-400">Core</span>
                </h1>
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold px-2 py-0.5 rounded text-amber-400">
                  NATIONAL LABS V2.5
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-light">
                Bridging university research, inter-agency APIs, and federal budgets to instantiate New AI-Powered Careers.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 bg-slate-900/45 border border-slate-800/80 rounded-xl p-3 sm:px-4 sm:py-2 text-left self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-slate-400 uppercase leading-none">Deployed Faculties</p>
                <p className="text-xs font-bold text-slate-100">{uniqueFacultiesMapped} of 6</p>
              </div>
            </div>
            <div className="w-px h-5 bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-slate-400 uppercase leading-none">Problems Covered</p>
                <p className="text-xs font-bold text-slate-100">{uniqueProblemsCovered} / {problems.length}</p>
              </div>
            </div>
            <div className="w-px h-5 bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-slate-400 uppercase leading-none">Simulated Grants Pool</p>
                <p className="text-xs font-bold text-slate-100">${totalFundingAllocated.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dynamic Navigation Tabs */}
        <div className="flex border-b border-slate-900 gap-1 overflow-x-auto pb-px">
          <button
            onClick={() => setCurrentTab('blueprint')}
            className={`py-3 px-5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              currentTab === 'blueprint'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/35'
            }`}
          >
            <Workflow className="w-4 h-4" />
            1. Job Commission Workshop
          </button>
          <button
            onClick={() => setCurrentTab('ledger')}
            className={`py-3 px-5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              currentTab === 'ledger'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/35'
            }`}
          >
            <Building2 className="w-4 h-4" />
            2. State-Federal Ledgers
          </button>
          <button
            onClick={() => setCurrentTab('sandbox')}
            className={`py-3 px-5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              currentTab === 'sandbox'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/35'
            }`}
          >
            <Cpu className="w-4 h-4" />
            3. Field Simulation (Human Audit)
          </button>
        </div>

        {/* Tab content area */}
        {currentTab === 'blueprint' && (
          <div className="space-y-8 animate-fade-in">
            {/* Step 1: Browse Societal Problems */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div>
                  <h2 className="text-base font-bold text-slate-100 font-sans tracking-tight uppercase flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-amber-500 rounded-full"></span>
                    Centralized Societal Challenge Index
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real societal life problems selected for student program assignment. Select an item to anchor your AI job deployment.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-slate-500 bg-slate-900/35 border border-slate-800 px-3 py-1 rounded">
                  Showing {problems.length} live modern vectors
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problems.map((prob) => (
                  <ProblemCard
                    key={prob.id}
                    problem={prob}
                    isSelected={selectedProblemId === prob.id}
                    onSelect={() => setSelectedProblemId(prob.id)}
                  />
                ))}
              </div>
            </section>

            {/* Step 2: Faculty Enrollment Selection */}
            <section className="space-y-4 pt-4 border-t border-slate-900/80">
              <div className="text-left">
                <h2 className="text-base font-bold text-slate-100 font-sans tracking-tight uppercase flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-amber-500 rounded-full"></span>
                  University Academic Faculty Registry
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose the academic division responsible for coordinating, executing and ethically auditing this specific AI Public-benefit job.
                </p>
              </div>

              <FacultySelector
                faculties={FACULTIES}
                selectedFacultyId={selectedFacultyId}
                onSelectFaculty={setSelectedFacultyId}
              />
            </section>

            {/* Step 3: Job Creator cockpit */}
            <section className="pt-4 border-t border-slate-900/80">
              <AIJobDesigner
                selectedFaculty={selectedFaculty}
                selectedProblem={selectedProblem}
                onJobCreated={handleJobCreated}
                apiKeyAvailable={true}
              />
            </section>
          </div>
        )}

        {currentTab === 'ledger' && (
          <div className="animate-fade-in">
            <ResourceLedger assets={GOVERNMENT_ASSETS} />
          </div>
        )}

        {currentTab === 'sandbox' && (
          <div className="animate-fade-in">
            <SimulationSandbox activeJobs={activeJobs} initialJobId={simulatingJobId} />
          </div>
        )}

        {/* Existing AI Jobs Commission Board List */}
        <section className="space-y-4 pt-6 border-t border-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-sans tracking-tight uppercase flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-500" />
                Commissioned Civic AI Jobs Ledger
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 animate-pulse">
                Active municipal university programs. Launch these profiles inside the Sandbox Terminal to simulate life-saving field telemetry.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded border border-slate-800">
              {activeJobs.length} active public service careers defined
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeJobs.map((job) => {
              const matchedFaculty = FACULTIES.find(f => f.id === job.facultyId);
              const matchedProblem = problems.find(p => p.id === job.targetedProblemId);

              return (
                <div
                  id={`job-charter-${job.id}`}
                  key={job.id}
                  className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between text-left relative group hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300"
                >
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="absolute top-4 right-4 p-1 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded transition-colors duration-200"
                    title="Delete program commission"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div>
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2 text-[10px] font-mono">
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold uppercase text-[9px]">
                        {matchedFaculty?.code || 'CIVIC'}
                      </span>
                      <span className="text-slate-500">→ Target:</span>
                      <span className="text-slate-300 max-w-[150px] truncate">{matchedProblem?.category || 'Community Action'}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 tracking-tight group-hover:text-amber-400 transition-colors duration-200 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono mb-3 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {matchedProblem?.location}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {job.roleSummary}
                    </p>

                    {/* Operational Duties */}
                    <div className="bg-slate-950/50 rounded-lg p-3.5 border border-slate-900 mb-4 text-xs">
                      <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">Core Technical Tasks:</h4>
                      <ul className="space-y-1.5 text-slate-300 list-inside list-disc">
                        {job.primaryResponsibilities.slice(0, 3).map((r, idx) => (
                          <li key={idx} className="line-clamp-2 leading-relaxed">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Human in the loop ethical veto */}
                    <div className="bg-amber-500/5 rounded-lg p-3 border border-amber-500/10 mb-4 text-xs flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">Human-In-The-Loop Checkpoint:</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                          {job.aiHumanLoopTask}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sourced assets or budgets */}
                  <div className="pt-4 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-slate-500 uppercase">Interactive Pilot Grant</p>
                      <p className="text-sm font-bold font-mono text-sky-400">
                        ${job.fundingAllocationSimulated.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSimulatingJobId(job.id);
                        setCurrentTab('sandbox');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-[10px] rounded uppercase tracking-wider transition-all duration-200"
                    >
                      <Cpu className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                      Boot Sandbox
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Modern Footer bar */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <p>© 2026 CivicAI Core Initiative. Joint Local, State, and Federal University Program.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 transition-colors duration-200">Legal/SSO Integration Charter</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors duration-200">HUD SAMHSA Portal Rules</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
