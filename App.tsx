import React, { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import CodeViewer from './components/CodeViewer';
import { ScriptConfig, GeneratedScript, LoadingState } from './types';
import { generatePythonScript } from './services/geminiService';
import { ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [scriptData, setScriptData] = useState<GeneratedScript | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: ScriptConfig) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    try {
      const result = await generatePythonScript(config);
      setScriptData(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate script. Please check your API key or try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-200">
      
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">SEC EDGAR ScriptGen</h1>
              <p className="text-xs text-emerald-400 font-medium">Python Request Generator</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">API Reference</span>
            <a 
              href="https://www.sec.gov/edgar/sec-api-documentation" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              SEC.gov Info &rarr;
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Configuration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="prose prose-invert prose-sm">
              <p className="text-slate-400">
                Generate production-ready Python code for the SEC EDGAR API. 
                This tool automatically handles the required 
                <span className="text-emerald-400 font-mono mx-1">User-Agent</span> 
                headers and selects the correct endpoint logic based on your request.
              </p>
            </div>
            
            <ConfigForm onGenerate={handleGenerate} loadingState={loadingState} />

            {error && (
               <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg text-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 {error}
               </div>
            )}
            
            <div className="hidden lg:block bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Popular Requests</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2 cursor-default hover:text-emerald-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  Get all company facts (Financials)
                </li>
                <li className="flex items-center gap-2 cursor-default hover:text-emerald-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  Download latest 10-K/10-Q XBRL
                </li>
                <li className="flex items-center gap-2 cursor-default hover:text-emerald-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  Map Ticker Symbol to CIK
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Code Output */}
          <div className="lg:col-span-7">
            <CodeViewer data={scriptData} />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default App;