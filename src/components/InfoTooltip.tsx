import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
}

export const InfoTooltip: React.FC<TooltipProps> = ({ content }) => {
  return (
    <div className="relative group inline-flex items-center justify-center cursor-help ml-2">
      <HelpCircle className="w-4 h-4 text-slate-500 hover:text-blue-400 transition-colors" />
      
      {/* Tooltip Popup */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-xl p-3 shadow-2xl relative">
          {content}
          {/* Triangle Pointer */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-slate-700"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-slate-900"></div>
        </div>
      </div>
    </div>
  );
};
