import React, { useState } from 'react';
import type { SubnetCalculations } from '../hooks/useSubnetLogic';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ValidationZoneProps {
  calc: SubnetCalculations;
}

type ValidationStatus = 'idle' | 'success' | 'error';

export const ValidationZone: React.FC<ValidationZoneProps> = ({ calc }) => {
  const [network, setNetwork] = useState('');
  const [broadcast, setBroadcast] = useState('');
  const [firstUsable, setFirstUsable] = useState('');
  const [lastUsable, setLastUsable] = useState('');

  const [netStatus, setNetStatus] = useState<ValidationStatus>('idle');
  const [broadStatus, setBroadStatus] = useState<ValidationStatus>('idle');
  const [firstStatus, setFirstStatus] = useState<ValidationStatus>('idle');
  const [lastStatus, setLastStatus] = useState<ValidationStatus>('idle');

  const handleConfirm = () => {
    setNetStatus(network.trim() === calc.networkString ? 'success' : 'error');
    setBroadStatus(broadcast.trim() === calc.broadcastString ? 'success' : 'error');
    setFirstStatus(firstUsable.trim() === calc.firstUsableString ? 'success' : 'error');
    setLastStatus(lastUsable.trim() === calc.lastUsableString ? 'success' : 'error');
  };

  const handleClear = () => {
    setNetwork('');
    setBroadcast('');
    setFirstUsable('');
    setLastUsable('');
    setNetStatus('idle');
    setBroadStatus('idle');
    setFirstStatus('idle');
    setLastStatus('idle');
  };

  const getBorderColor = (status: ValidationStatus) => {
    if (status === 'success') return 'border-emerald-500 focus:border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] bg-emerald-500/10 text-emerald-400';
    if (status === 'error') return 'border-red-500 focus:border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)] bg-red-500/10 text-red-400';
    return 'border-slate-600 focus:border-blue-500 hover:border-slate-500 bg-slate-900 text-slate-100';
  };

  const StatusIcon = ({ status }: { status: ValidationStatus }) => {
    if (status === 'success') return <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />;
    return null;
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-xl w-full">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <h3 className="text-xl font-bold text-slate-100">Validation Practice Zone</h3>
        <button 
          onClick={handleClear}
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors"
        >
          Clear Fields
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-semibold text-slate-300 ml-1">Network Address</label>
          <div className="relative">
            <input
              type="text"
              value={network}
              onChange={(e) => { setNetwork(e.target.value); setNetStatus('idle'); }}
              className={`w-full p-3 pr-10 rounded-lg border outline-none transition-all font-mono ${getBorderColor(netStatus)}`}
              placeholder="e.g. 192.168.1.0"
            />
            <StatusIcon status={netStatus} />
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-semibold text-slate-300 ml-1">Broadcast Address</label>
          <div className="relative">
            <input
              type="text"
              value={broadcast}
              onChange={(e) => { setBroadcast(e.target.value); setBroadStatus('idle'); }}
              className={`w-full p-3 pr-10 rounded-lg border outline-none transition-all font-mono ${getBorderColor(broadStatus)}`}
              placeholder="e.g. 192.168.1.255"
            />
            <StatusIcon status={broadStatus} />
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-semibold text-slate-300 ml-1">First Usable IP</label>
          <div className="relative">
            <input
              type="text"
              value={firstUsable}
              onChange={(e) => { setFirstUsable(e.target.value); setFirstStatus('idle'); }}
              className={`w-full p-3 pr-10 rounded-lg border outline-none transition-all font-mono ${getBorderColor(firstStatus)}`}
              placeholder="e.g. 192.168.1.1"
            />
            <StatusIcon status={firstStatus} />
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-semibold text-slate-300 ml-1">Last Usable IP</label>
          <div className="relative">
            <input
              type="text"
              value={lastUsable}
              onChange={(e) => { setLastUsable(e.target.value); setLastStatus('idle'); }}
              className={`w-full p-3 pr-10 rounded-lg border outline-none transition-all font-mono ${getBorderColor(lastStatus)}`}
              placeholder="e.g. 192.168.1.254"
            />
            <StatusIcon status={lastStatus} />
          </div>
        </div>
      </div>

      <div className="flex mt-2">
        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(0,123,255,0.4)] hover:shadow-[0_0_20px_rgba(0,123,255,0.6)] active:translate-y-0.5 text-lg"
        >
          Confirm Answers
        </button>
      </div>
    </div>
  );
};
