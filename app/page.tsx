'use client'

import { useState } from 'react'
import ConfigForm from './components/ConfigForm'
import CodeViewer from './components/CodeViewer'
import { ScriptConfig, GeneratedScript, LoadingState } from './types'
import { ShieldCheck } from 'lucide-react'

export default function Home() {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE)
  const [scriptData, setScriptData] = useState<GeneratedScript | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (config: ScriptConfig) => {
    setLoadingState(LoadingState.LOADING)
    setError(null)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`)
      }

      const result: GeneratedScript = await response.json()
      setScriptData(result)
      setLoadingState(LoadingState.SUCCESS)
    } catch (err) {
      console.error(err)
      setError('生成脚本失败，请检查您的配置后重试。')
      setLoadingState(LoadingState.ERROR)
    }
  }

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
              <p className="text-xs text-emerald-400 font-medium">Python脚本生成器</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">文档</span>
            <span className="hover:text-white cursor-pointer transition-colors">API参考</span>
            <a 
              href="https://www.sec.gov/edgar/sec-api-documentation" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              SEC.gov 信息 &rarr;
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
                为SEC EDGAR API生成生产就绪的Python代码。
                此工具会自动处理必需的
                <span className="text-emerald-400 font-mono mx-1">User-Agent</span> 
                头，并根据您的请求选择正确的端点逻辑。
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
              <h4 className="text-sm font-semibold text-slate-300 mb-3">常用请求</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2 cursor-default hover:text-emerald-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  获取所有公司财务数据
                </li>
                <li className="flex items-center gap-2 cursor-default hover:text-emerald-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  下载最新的10-K/10-Q XBRL
                </li>
                <li className="flex items-center gap-2 cursor-default hover:text-emerald-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  将股票代码映射到CIK
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
  )
}

