import React from 'react';
import { X, Network, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <HelpCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">How to use this Dashboard</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          
          <section>
            <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-3">
              <Network className="w-5 h-5" /> 1. The Visual Calculator
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              This dashboard acts as an interactive calculator to visually map exactly how IPv4 subnetting works.
            </p>
            <ul className="space-y-2 text-sm text-slate-400 ml-5 list-disc">
              <li><strong>Target IP:</strong> Enter any valid IPv4 address. The tool will automatically assign its theoretical bounds based on its class (A, B, or C).</li>
              <li><strong>CIDR Slider:</strong> Slide the prefix length to define how many bits belong to the network versus the host.</li>
              <li><strong>Binary Matrix:</strong> You can physically toggle bits to 1 or 0 by clicking on them. The Results calculate instantly! Purple/Blue bits represent the <strong>Network Mask</strong> while red segments represent the remaining host bounds.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5" /> 2. Practice Generator
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Testing for a CCNA or other networking certification? Hit <strong>"Generate Question"</strong> at the top of the dashboard.
            </p>
            <ul className="space-y-2 text-sm text-slate-400 ml-5 list-disc">
              <li>The engine will cycle through random real-world subnetting problems, ranging from simply identifying a host's broadcast address to computing the Nth usable subdivision of a large classful network.</li>
              <li>Once you generate a question, the target IP field will <strong>auto-populate</strong> to help you visualize the prompt.</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide">
              Validation Sandbox
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              When working out a manual problem or generated prompt, try entering what you believe is the correct Network, Broadcast, and Host Range into the <strong>Validation Zone</strong> at the bottom.
              If a question is active, it strictly validates against the correct answers for that specific problem—even if you playfully toggle bits on the matrix to use as a scratchpad! You can hit "Reveal Answers" if you get stuck.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
