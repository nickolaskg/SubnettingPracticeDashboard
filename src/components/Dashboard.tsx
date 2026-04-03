import React, { useState, useEffect } from 'react';
import { useSubnetLogic } from '../hooks/useSubnetLogic';
import { useQuestionGenerator } from '../hooks/useQuestionGenerator';
import { BinaryMatrix } from './BinaryMatrix';
import { CidrSlider } from './CidrSlider';
import { ValidationZone } from './ValidationZone';
import { QuestionComponent } from './QuestionComponent';
import { Network, RefreshCw } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { bits, cidr, setCidr, toggleBit, setIpFromString, reset, calc } = useSubnetLogic();
  const { activeQuestion, generateNewQuestion, clearQuestion } = useQuestionGenerator();

  const [ipInput, setIpInput] = useState(calc.ipString);

  // Sync internal IP input when bits change externally (e.g. from matrix)
  useEffect(() => {
    setIpInput(calc.ipString);
  }, [calc.ipString]);

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIpInput(val);
    setIpFromString(val); // only updates bits if valid
  };

  const activeCalc = activeQuestion ? activeQuestion.expectedCalc : calc;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-3 md:p-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-5">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-xl gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-2.5 bg-blue-600/20 rounded-xl shadow-[0_0_15px_rgba(0,123,255,0.3)] border border-blue-500/20">
              <Network className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-md">
                Subnetting <span className="text-blue-500">Dashboard</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">
                Interactive Visualization & Practice Tool
              </p>
            </div>
          </div>
          
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-sm font-bold transition-all hover:shadow-lg active:scale-95 relative z-10 text-slate-200"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </header>

        {/* Practice Question Generator */}
        <section>
          <QuestionComponent 
            question={activeQuestion} 
            onGenerate={generateNewQuestion}
            onClear={clearQuestion}
          />
        </section>

        {/* Real-time Result Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-slate-400 font-semibold mb-3 uppercase tracking-widest text-sm">Target IP Address</h2>
            
            <div className="flex items-center gap-3 w-full justify-center">
              <input 
                type="text" 
                value={ipInput}
                onChange={handleIpChange}
                className="w-full max-w-[280px] sm:max-w-[340px] text-center bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-blue-500 rounded-xl text-3xl sm:text-4xl font-black font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] tracking-tight outline-none transition-all py-2"
                placeholder="0.0.0.0"
              />
              <div className="hidden sm:flex flex-col items-center justify-center bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2 gap-0.5">
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Class</span>
                 <span className="text-blue-400 text-2xl font-black leading-none drop-shadow-[0_0_8px_rgba(0,123,255,0.3)]">{calc.ipClass}</span>
              </div>
            </div>

            <div className="mt-4 px-5 py-1.5 bg-slate-800 rounded-full border border-slate-700 font-mono text-slate-300 text-base shadow-inner">
              Subnet Mask: <strong className="text-blue-400 ml-1">{calc.submaskString}</strong>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
            <h2 className="text-slate-400 font-semibold mb-2 uppercase tracking-widest text-sm text-center">
              Magic Number
            </h2>
            <div className="text-6xl font-black font-mono text-blue-500 drop-shadow-[0_0_20px_rgba(0,123,255,0.4)] my-1 transition-transform group-hover:scale-105 duration-300">
              {calc.magicNumber}
            </div>
            <p className="text-slate-400 mt-2 text-xs text-center font-medium bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-700/50">
              Block Size in Octet <strong className="text-slate-200 ml-1">{calc.magicNumberOctet}</strong>
            </p>
          </div>
        </section>

        {/* Interactive Components */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <BinaryMatrix bits={bits} cidr={cidr} onToggle={toggleBit} />
          </div>
          <div className="xl:col-span-1 h-full flex">
            <CidrSlider cidr={cidr} minCidr={calc.minCidr} onChange={setCidr} />
          </div>
        </section>

        {/* Practice Validation */}
        <section>
          <ValidationZone calc={activeCalc} />
        </section>
        
      </div>
    </div>
  );
};
