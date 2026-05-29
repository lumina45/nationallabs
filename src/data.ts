/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SocietalProblem, Faculty, GovernmentAsset, AIJob } from './types';

export const INITIAL_PROBLEMS: SocietalProblem[] = [
  {
    id: 'prob-skid-row',
    title: 'Skid Row Chronic Homelessness & Vulnerability Indexing',
    category: 'Housing & Homelessness',
    description: 'Developing high-precision local coordination for transitional housing placement, shelter matching, and emergency services on Skid Row, Los Angeles.',
    location: 'Skid Row District, Los Angeles CA',
    severity: 'Critical',
    targetCommunities: ['Unsheltered Adults', 'Chronically Homeless Families', 'Veterans'],
    currentShortfalls: [
      'Stale annual census data (point-in-time counts)',
      'Legacy paperwork for shelter bed availability',
      'Fragmented coordination among local nonprofits, state social services, and federal HUD grants.'
    ],
    historicalPrecedent: 'In 1976, Los Angeles adopted a policy of centralization for Skid Row services, keeping shelter resources concentrated but leading to a severe containment effect.'
  },
  {
    id: 'prob-fentanyl-substance',
    title: 'Pre-emptive Substance overdose Mitigation & Outreach',
    category: 'Substance Crisis',
    description: 'Enhancing community-wide peer support programs, predicting critical overdose hot-spots across downtown districts, and optimizing distribution of Naloxone.',
    location: 'Downtown Tenderloin & Civic Center, San Francisco CA',
    severity: 'Critical',
    targetCommunities: ['Active drug users', 'High-vulnerability neighborhood residents', 'First responders'],
    currentShortfalls: [
      'Delayed reactive crisis mapping (often 48-72h stale)',
      'Suboptimal supply chain for life-saving counter-agents',
      'Inadequate trust-building peer networks matched to critical streets.'
    ],
    historicalPrecedent: 'The Fentanyl crisis has accelerated overdose rates by a factor of 5x over preceding decades, making rapid field communication paramount.'
  },
  {
    id: 'prob-east-la-digital',
    title: 'East LA Early Education Support & Digital Divide Bypass',
    category: 'Digital Divide',
    description: 'Providing specialized AI literacy, hardware access, and customized curriculum assistance to children in disconnected low-income households.',
    location: 'East Los Angeles & Boyle Heights, CA',
    severity: 'High',
    targetCommunities: ['Elementary and middle school students', 'Spanish-speaking parents', 'Underfunded public schools'],
    currentShortfalls: [
      'Absence of offline-ready translation technologies for parents supporting homework',
      'Unequal ratio of personalized tutoring across classrooms (1 teacher to 30 students)',
      'Poor broadband penetration limits cloud learning access.'
    ]
  },
  {
    id: 'prob-food-desert',
    title: 'Optimized Urban Agriculture & Food Waste Redirect Logistics',
    category: 'Poverty',
    description: 'Mitigating chronic lack of access to fresh organic produce in neighborhood food deserts through intelligent excess farm-to-community redirection.',
    location: 'South Side Chicago Neighborhoods, Cook County IL',
    severity: 'High',
    targetCommunities: ['Low-income families', 'Elderly residents without cars', 'Local neighborhood markets'],
    currentShortfalls: [
      'Vast volume of fresh local wholesale distributor scrap wasted daily',
      'Inefficient distribution routing that bypasses high-deprivation tracts',
      'Higher relative costs of healthy produce compared to processed fast-food.'
    ]
  },
  {
    id: 'prob-mental-youth',
    title: 'De-escalation Peer Network and Vulnerable Youth Support',
    category: 'Mental Health',
    description: 'Setting up active mobile de-escalation units and protective youth centers that utilize localized behavioral support strategies.',
    location: 'East Harlem & Bronx Community Districts, NY',
    severity: 'High',
    targetCommunities: ['At-risk teens', 'Families without mental health insurance', 'Local street youth networks'],
    currentShortfalls: [
      'Emergency response reliance on traditional police dispatch instead of mental health professionals',
      'Extreme waiting times in local medicaid-funded primary therapy centers',
      'High rates of adolescent drop-out from school due to localized chronic trauma.'
    ]
  }
];

export const FACULTIES: Faculty[] = [
  {
    id: 'fac-medicine-health',
    name: 'College of Medicine & Public Health',
    code: 'MPH',
    iconName: 'HeartPulse',
    description: 'Specializes in epidemic tracking, preventive healthcare, localized triage protocols, mental health interventions, and substance abuse counseling methodologies.',
    coreSkills: ['Epidemiologic Modeling', 'Behavioral Intake Protocols', 'Triage System Analysis', 'Community Care Coordination', 'Telemetry Medicine'],
    academicFocus: 'Translating public clinical research into human-centered street team protocols.'
  },
  {
    id: 'fac-law-policy',
    name: 'School of Law & Public Policy',
    code: 'SLP',
    iconName: 'Scale',
    description: 'Dedicated to eviction defense, civil rights, federal grant matching statutes, state-level privacy guidelines for census data, and municipal program structuring.',
    coreSkills: ['Eviction Legislation', 'Grant Compliance', 'Resource Allocation Regulatory Law', 'Inter-agency MoU Design', 'Civil Advocacy'],
    academicFocus: 'Structuring legally bulletproof, civil rights-affirming municipal-federal collaboration models.'
  },
  {
    id: 'fac-engineering-cs',
    name: 'College of Engineering & Computer Science',
    code: 'ECS',
    iconName: 'Cpu',
    description: 'Builds secure local databases, offline peer mesh networking routers, route optimization models, and lightweight client-side AI modules.',
    coreSkills: ['Distributed Data Architecture', 'Edge AI Inferences', 'Mesh Telecom Mesh Routing', 'GIS Geospatial Optimization', 'UI-UX Hardware Integrity'],
    academicFocus: 'Iterating on resilient, localized, crash-proof software that serves vulnerable people securely.'
  },
  {
    id: 'fac-social-work',
    name: 'Department of Social Work & Human Services',
    code: 'SWH',
    iconName: 'Users',
    description: 'Maintains field relationships, designs high-empathy peer intake strategies, tracks neighborhood vulnerability indexes, and prevents veteran trauma relapses.',
    coreSkills: ['Trauma-Informed Triage', 'Direct Shelter Navigation', 'Crisis Management & De-escalation', 'Family Re-unification Support', 'Linguistic Bridge Integration'],
    academicFocus: 'Putting human-to-human relationships at the absolute center of technological aid.'
  },
  {
    id: 'fac-business-economics',
    name: 'School of Business & Applied Economics',
    code: 'SBA',
    iconName: 'Coins',
    description: 'Analyzes long-term federal budget allocations, designs micro-incentive food reward models, coordinates logistics for food waste, and audits programmatic ROI.',
    coreSkills: ['Federal Fund Matching', 'Logistical Supply Chain Tuning', 'Micro-incentive Architecture', 'Social Capital Allocation', 'Budgetary Impact Auditing'],
    academicFocus: 'Maximizing systemic capital efficiency so that every civic dollar actually reaches human recipients.'
  },
  {
    id: 'fac-creative-arts',
    name: 'College of Liberal Arts, Fine Arts & Communications',
    code: 'LAC',
    iconName: 'Palette',
    description: 'Engineers intuitive narrative-driven interfaces, multi-lingual audio visual notifications, public awareness murals, and de-stigmatized visual aid systems.',
    coreSkills: ['Narrative Design', 'Multi-Lingual Localization', 'Human Interaction Graphics', 'Substance-De-stigmatization Campaigns', 'Immersive Community Maps'],
    academicFocus: 'Eviscerating bureaucratic complexity using beautiful, clear, de-stigmatized visual communication.'
  }
];

export const GOVERNMENT_ASSETS: GovernmentAsset[] = [
  {
    id: 'asset-hud-hmis',
    name: 'HUD Homeless Management Information System (HMIS) Registry API',
    agency: 'US Dept of Housing and Urban Development (HUD)',
    level: 'Federal',
    description: 'Provides federal secure real-time metadata on shelter availability, temporary housing vouchers, and local eligibility markers.',
    allocatedBudgetSimulated: 45000000,
    assetType: 'API Feed'
  },
  {
    id: 'asset-samhsa-grants',
    name: 'SAMHSA State Targeted Response Substance Opioid Recovery Grants',
    agency: 'Substance Abuse and Mental Health Services Administration (SAMHSA)',
    level: 'Federal',
    description: 'A direct federal financial fund accessible to local universities partnering with municipal outreach teams for substance de-escalation programs.',
    allocatedBudgetSimulated: 120000000,
    assetType: 'Direct Grant Fund'
  },
  {
    id: 'asset-state-caltrans-surplus',
    name: 'State Transitional Land and Surplus Housing Registry',
    agency: 'State Department of Transportation / General Services',
    level: 'State',
    description: 'Provides priority access to dormant state-owned land parcels and temporary modular building sites suitable for rapid-deployment student-led tiny shelters.',
    allocatedBudgetSimulated: 28000000,
    assetType: 'Surplus Supply'
  },
  {
    id: 'asset-gis-tracts',
    name: 'State Multi-Agency Spatial Geospatial Vulnerability Mapping Platform',
    agency: 'State Social Services GIS Division',
    level: 'State',
    description: 'Live demographic maps highlighting localized poverty indices, drug overdose alerts, and under-resourced public utility structures across postal codes.',
    allocatedBudgetSimulated: 15000000,
    assetType: 'Geospatial Data'
  },
  {
    id: 'asset-medicaid-mobile',
    name: 'Joint Federal-State Mobile Triage & Medic Reimbursement Pipeline',
    agency: 'Centers for Medicare & Medicaid Services (CMS)',
    level: 'Joint',
    description: 'Direct billing structure allowing licensed and student-supervised mobile clinics to bill telehealth, substance screening, and diagnostic triage immediately from street environments.',
    allocatedBudgetSimulated: 85000000,
    assetType: 'Direct Grant Fund'
  }
];

export const INITIAL_AI_JOBS: AIJob[] = [
  {
    id: 'job-hcd-navigator',
    title: 'Precision Triage Housing Navigator',
    facultyId: 'fac-social-work',
    targetedProblemId: 'prob-skid-row',
    roleSummary: 'Utilizing spatial predictive telemetry & the HUD HMIS Registry API, this student specialist navigates transient camps directly, dynamically calculating emergency shelter matches for high-vulnerability unsheltered adults.',
    primaryResponsibilities: [
      'Assess emergency medical needs following automated spatial hot-spot alerts.',
      'Establish personalized, secure client profiles on-site via mobile-adaptive edge apps.',
      'Coordinate with regional shelter nodes to claim vacant beds in immediate geographic range.'
    ],
    aiSubsystemName: 'CivicMatch Eviction & Shelter Allocation Predictive Recommender',
    aiHumanLoopTask: 'Verify client medical/behavioral nuances that an algorithm misses before finalizing the emergency shelter bed lock.',
    federalAgencyCollaborator: 'US Dept of Housing and Urban Development (HUD)',
    stateAgencyCollaborator: 'State Department of Social Services',
    resourceSharingRequired: [
      'HUD Homeless Management Information System (HMIS) Registry API',
      'State Multi-Agency Spatial Geospatial Vulnerability Mapping Platform'
    ],
    fundingAllocationSimulated: 145000,
    societalImpactTargets: [
      '35% reduction in shelter allocation downtime.',
      '100% accurate triage logs for chronically ill homeless veterans.'
    ],
    createdDate: '2026-05-20'
  },
  {
    id: 'job-tox-predictive',
    title: 'Predictive Toxicology Resource Logistician',
    facultyId: 'fac-medicine-health',
    targetedProblemId: 'prob-fentanyl-substance',
    roleSummary: 'This specialized student role tracks anonymized real-time dispatch emergency telemetry and optimizes portable Naloxone (Narcan) kits distribution to local civilian hubs before severe local spikes occur.',
    primaryResponsibilities: [
      'Review predictive heatmaps of downtown blocks showing sudden spike indices.',
      'Supply neighborhood peer advocates with testing strips, sub-dosage kits, and education checklists.',
      'Incorporate feedback logs into local health network APIs to tune predictive drug purity forecasts.'
    ],
    aiSubsystemName: 'ToxRisk Predictive Overdose Hazard Alert Matrix',
    aiHumanLoopTask: 'Formulate empathetic contextual feedback loops from local peer advocates to audit the algorithmic risk forecasting model.',
    federalAgencyCollaborator: 'Health Resources and Services Administration (HRSA)',
    stateAgencyCollaborator: 'State Health Authority & Emergency Medical Board',
    resourceSharingRequired: [
      'SAMHSA State Targeted Response Substance Opioid Recovery Grants',
      'State Multi-Agency Spatial Geospatial Vulnerability Mapping Platform'
    ],
    fundingAllocationSimulated: 185000,
    societalImpactTargets: [
      'Redistribution of Naloxone supply within 4 hours of toxic batch notification incidents.',
      '50% lower mortality rates in monitored civic tracts.'
    ],
    createdDate: '2026-05-24'
  }
];
