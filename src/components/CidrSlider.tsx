import React from 'react';

interface CidrSliderProps {
  cidr: number;
  minCidr: number;
  onChange: (val: number) => void;
}

export const CidrSlider: React.FC<CidrSliderProps> = ({ cidr, minCidr, onChange }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-xl w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-200">CIDR Prefix Length</h3>
        <div className="px-3 py-1 bg-blue-600/20 text-blue-400 font-mono font-bold rounded-md border border-blue-500/30 text-xl">
          /{cidr}
        </div>
      </div>
      
      <div className="relative pt-4 pb-2">
        <input
          type="range"
          min={minCidr}
          max={30}
          value={cidr}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 outline-none hover:accent-blue-400 transition-all"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-3 font-mono">
          <span>Min (/{minCidr})</span>
          <span>Max (/30)</span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/50 mt-1">
        <span className="text-xs text-slate-400 font-semibold tracking-wide">BORROWABLE BITS</span>
        <strong className="text-blue-400 font-mono text-lg leading-none">{32 - cidr}</strong>
      </div>
    </div>
  );
};
