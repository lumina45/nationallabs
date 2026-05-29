/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Faculty } from '../types';
import * as Icons from 'lucide-react';

interface FacultySelectorProps {
  faculties: Faculty[];
  selectedFacultyId: string | null;
  onSelectFaculty: (facultyId: string) => void;
}

export const FacultySelector: React.FC<FacultySelectorProps> = ({
  faculties,
  selectedFacultyId,
  onSelectFaculty,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {faculties.map((fac) => {
        // Resolve Lucide Icon dynamically
        const IconComponent = (Icons as any)[fac.iconName] || Icons.GraduationCap;

        const isSelected = selectedFacultyId === fac.id;

        return (
          <button
            id={`faculty-btn-${fac.id}`}
            key={fac.id}
            onClick={() => onSelectFaculty(fac.id)}
            className={`w-full relative p-5 rounded-xl border text-left transition-all duration-300 group ${
              isSelected
                ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/5'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
            }`}
          >
            {/* Faculty code badge */}
            <span className="absolute top-4 right-4 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-amber-400 transition-colors duration-200">
              {fac.code}
            </span>

            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                isSelected ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-500/5'
              } transition-colors duration-300`}>
                <IconComponent className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="text-sm font-semibold text-slate-100 tracking-tight">
                {fac.name}
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
              {fac.description}
            </p>

            <div className="mt-auto">
              <p className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-1.5">Focus Skills:</p>
              <div className="flex flex-wrap gap-1 leading-none">
                {fac.coreSkills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800/40 text-slate-300 text-[9px] px-1.5 py-0.5 rounded font-mono border border-slate-700/30"
                  >
                    {skill}
                  </span>
                ))}
                {fac.coreSkills.length > 3 && (
                  <span className="text-slate-500 text-[9px] font-mono px-1 py-0.5">
                    +{fac.coreSkills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
