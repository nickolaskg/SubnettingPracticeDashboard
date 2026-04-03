import React from 'react';
import type { GeneratedQuestion } from '../hooks/useQuestionGenerator';
import { HelpCircle, Shuffle } from 'lucide-react';

interface QuestionComponentProps {
  question: GeneratedQuestion | null;
  onGenerate: () => void;
  onClear: () => void;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onGenerate, onClear }) => {
  return (
    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      
      <div className="flex items-center gap-4 relative z-10 w-full md:w-auto flex-1">
        <div className="p-3 bg-purple-600/20 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-500/20 shrink-0 hidden sm:flex">
          <HelpCircle className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
            Practice Generator
            {question && (
              <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px]">Active</span>
            )}
          </h2>
          {question ? (
            <p className="text-white font-medium text-sm sm:text-base leading-relaxed tracking-wide">
              {question.promptText}
            </p>
          ) : (
            <p className="text-slate-400 font-medium text-sm">
              Generate a random subnetting question to test your knowledge! The answer validation zone below will automatically sync to check your answer against the active question.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto shrink-0 relative z-10 justify-end mt-2 md:mt-0">
        {question && (
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] active:scale-95"
        >
          <Shuffle className="w-4 h-4" />
          {question ? 'New Question' : 'Generate Question'}
        </button>
      </div>
    </div>
  );
};
