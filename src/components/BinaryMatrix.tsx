import React from 'react';
import type { Bit } from '../hooks/useSubnetLogic';

interface BinaryMatrixProps {
  bits: Bit[];
  cidr: number;
  onToggle: (index: number) => void;
}

const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

export const BinaryMatrix: React.FC<BinaryMatrixProps> = ({ bits, cidr, onToggle }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 md:gap-4 p-3 md:p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-xl w-full">
      {Array(4).fill(0).map((_, octetIndex) => (
        <div key={octetIndex} className="flex flex-col gap-1 md:gap-2 p-2 px-1 sm:px-3 bg-slate-900 rounded-lg border border-slate-700 w-full">
          {/* Decimal Value of this octet */}
          <div className="text-center font-bold text-slate-200 mb-1 font-mono text-xl">
            {parseInt(bits.slice(octetIndex * 8, (octetIndex + 1) * 8).join(''), 2)}
          </div>
          
          <div className="flex gap-1 sm:gap-1.5 justify-center">
            {Array(8).fill(0).map((__, bitIndex) => {
              const globalIndex = octetIndex * 8 + bitIndex;
              const isNetwork = globalIndex < cidr;
              const weight = WEIGHTS[bitIndex];
              const value = bits[globalIndex];

              return (
                <div key={globalIndex} className="flex flex-col items-center group">
                  <span className="text-[10px] text-slate-500 font-mono mb-1">{weight}</span>
                  <button
                    onClick={() => onToggle(globalIndex)}
                    className={`
                      flex-1 w-full max-w-[36px] min-w-[20px] h-10 sm:h-12 rounded flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold font-mono transition-all duration-200
                      hover:-translate-y-1 active:translate-y-0
                      ${isNetwork ? 'border-b-2 border-blue-500' : 'border-b-2 border-red-900'}
                      ${value === 1 
                        ? (isNetwork ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_12px_rgba(0,123,255,0.4)]' : 'bg-red-600/20 text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]') 
                        : (isNetwork ? 'bg-slate-800 text-slate-500 hover:bg-slate-700' : 'bg-red-950/30 text-red-900 hover:bg-red-900/40')}
                    `}
                    title={`Toggle Bit ${globalIndex}`}
                  >
                    {value}
                  </button>
                  {/* Subtle indicator for network vs host */}
                  <div className={`h-1 w-full mt-2 rounded-full transition-colors ${isNetwork ? 'bg-blue-500' : 'bg-red-900'}`} />
                </div>
              );
            })}
          </div>
          <div className="text-center text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">
            Octet {octetIndex + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
