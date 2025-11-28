import React, { useState } from 'react';
import { ScriptConfig, LoadingState } from '../types';
import { Terminal, Mail, User, Search, Play } from 'lucide-react';

interface ConfigFormProps {
  onGenerate: (config: ScriptConfig) => void;
  loadingState: LoadingState;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onGenerate, loadingState }) => {
  const [developerName, setDeveloperName] = useState('Sample Corp');
  const [developerEmail, setDeveloperEmail] = useState('admin@sample.com');
  const [targetData, setTargetData] = useState('Latest 10-K filing for Apple Inc (AAPL)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ developerName, developerEmail, targetData });
  };

  const isLoading = loadingState === LoadingState.LOADING;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6 text-emerald-400">
        <Terminal className="w-6 h-6" />
        <h2 className="text-xl font-semibold text-white">Script Configuration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* User Agent Section */}
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              SEC Identity Requirement
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              The SEC blocks requests without a valid User-Agent string in the format: 
              <code className="bg-slate-900 px-1 py-0.5 rounded mx-1 text-slate-300">Name email@address.com</code>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Developer / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={developerName}
                  onChange={(e) => setDeveloperName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={developerEmail}
                  onChange={(e) => setDeveloperEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g. john@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Target Data Section */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> What data do you need?
          </label>
          <textarea
            required
            rows={3}
            value={targetData}
            onChange={(e) => setTargetData(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all resize-none"
            placeholder="Describe the data you want to fetch. e.g. 'Get all company facts for Microsoft' or 'Download latest 10-Q for Tesla'"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
            isLoading 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Script...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Generate Python Script
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConfigForm;