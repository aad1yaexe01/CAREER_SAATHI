import React from 'react';
import { SkillItem } from '../../types/career';

interface SkillRadarChartProps {
  skills: SkillItem[];
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ skills }) => {
  // Use 6 skills for a crisp hexagon radar
  const radarSkills = skills.slice(0, 6);
  const size = 320;
  const center = size / 2;
  const radius = 105;
  const angleStep = (Math.PI * 2) / Math.max(radarSkills.length, 3);

  // Helper to convert polar to cartesian
  const getCoordinates = (valueRatio: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * valueRatio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate web background polygons (25%, 50%, 75%, 100%)
  const webLevels = [0.25, 0.5, 0.75, 1.0];

  // Points for Current Skills polygon
  const currentPoints = radarSkills
    .map((s, i) => {
      const { x, y } = getCoordinates(s.currentLevel / 100, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Points for Target Requirements polygon
  const targetPoints = radarSkills
    .map((s, i) => {
      const { x, y } = getCoordinates(s.requiredLevel / 100, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Background web polygons */}
          {webLevels.map((lvl, idx) => {
            const levelPoints = radarSkills
              .map((_, i) => {
                const { x, y } = getCoordinates(lvl, i);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={idx}
                points={levelPoints}
                fill="none"
                stroke="rgba(148, 163, 184, 0.15)"
                strokeWidth="1"
                strokeDasharray={lvl === 1.0 ? 'none' : '3,3'}
              />
            );
          })}

          {/* Radial Axis lines */}
          {radarSkills.map((_, i) => {
            const { x, y } = getCoordinates(1.0, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(148, 163, 184, 0.15)"
                strokeWidth="1"
              />
            );
          })}

          {/* Target Requirement Polygon (Dashed Cyan/Indigo) */}
          <polygon
            points={targetPoints}
            fill="rgba(6, 182, 212, 0.12)"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Candidate Current Skills Polygon (Glowing Indigo) */}
          <polygon
            points={currentPoints}
            fill="rgba(99, 102, 241, 0.35)"
            stroke="#818cf8"
            strokeWidth="2.5"
            className="filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-700"
          />

          {/* Data Points on vertices */}
          {radarSkills.map((s, i) => {
            const curr = getCoordinates(s.currentLevel / 100, i);
            const tgt = getCoordinates(s.requiredLevel / 100, i);
            return (
              <g key={i}>
                {/* Target marker */}
                <circle cx={tgt.x} cy={tgt.y} r="3" fill="#06b6d4" />
                {/* Current marker */}
                <circle 
                  cx={curr.x} 
                  cy={curr.y} 
                  r="4.5" 
                  fill="#818cf8" 
                  stroke="#1e1b4b" 
                  strokeWidth="1.5"
                  className="transition-all duration-700"
                />
              </g>
            );
          })}

          {/* Skill Labels positioned outside */}
          {radarSkills.map((s, i) => {
            const { x, y } = getCoordinates(1.22, i);
            // split name for better rendering
            const shortName = s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] || '');
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-semibold fill-slate-300 select-none"
              >
                {shortName}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
          <span className="text-slate-300 font-medium">Candidate Current Level</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-cyan-400 border-t border-dashed border-cyan-300" />
          <span className="text-slate-400 font-medium">Target Job Expectation</span>
        </div>
      </div>
    </div>
  );
};
