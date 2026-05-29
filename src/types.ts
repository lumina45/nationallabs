/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SocietalProblem {
  id: string;
  title: string;
  category: 'Poverty' | 'Substance Crisis' | 'Housing & Homelessness' | 'Digital Divide' | 'Public Welfare' | 'Mental Health';
  description: string;
  location: string;
  severity: 'Critical' | 'High' | 'Moderate';
  targetCommunities: string[];
  currentShortfalls: string[];
  historicalPrecedent?: string;
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  iconName: string; // lucide icon name representation
  description: string;
  coreSkills: string[];
  academicFocus: string;
}

export interface AIJob {
  id: string;
  title: string;
  facultyId: string;
  targetedProblemId: string;
  roleSummary: string;
  primaryResponsibilities: string[];
  aiSubsystemName: string; // The AI technology assisting them
  aiHumanLoopTask: string; // The specific human-in-the-loop task for the student
  federalAgencyCollaborator: string; // e.g., HUD, HHS, DEd, DOL
  stateAgencyCollaborator: string; // e.g., Caltrans, State Health Authority
  resourceSharingRequired: string[];
  fundingAllocationSimulated: number; // in USD
  societalImpactTargets: string[];
  createdDate: string;
  isSimulating?: boolean;
}

export interface GovernmentAsset {
  id: string;
  name: string;
  agency: string;
  level: 'Federal' | 'State' | 'Joint';
  description: string;
  allocatedBudgetSimulated: number;
  assetType: 'API Feed' | 'Specialist Force' | 'Direct Grant Fund' | 'Geospatial Data' | 'Surplus Supply';
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  jobId: string;
  jobTitle: string;
  message: string;
  status: 'info' | 'success' | 'warning' | 'critical';
  impactProgressValue?: number;
}
