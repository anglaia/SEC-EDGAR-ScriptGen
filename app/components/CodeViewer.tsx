'use client'

import { useState } from 'react'
import { GeneratedScript } from '../types'
import { Copy, Check, FileCode, Info } from 'lucide-react'

interface CodeViewerProps {
  data: GeneratedScript | null
}

export default function CodeViewer({ data }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (data?.code) {
      navigator.clipboard.writeText(data.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!data) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700 border-dashed">
        <FileCode className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">准备生成</p>
        <p className="text-sm max-w-xs text-center mt-2">
          在左侧配置您的请求，为SEC EDGAR生成符合规范的Python脚本。
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 h-full animate-fadeIn">
      {/* Explanation Card */}
      <div className="bg-indigo-900/20 border border-indigo-800/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2 text-indigo-300">
          <Info className="w-4 h-4" />
          <h3 className="font-semibold text-sm">策略</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {data.explanation}
        </p>
      </div>

      {/* Code Window */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-slate-400 font-mono">sec_fetcher.py</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '已复制' : '复制'}
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          <pre className="text-sm font-mono leading-relaxed text-blue-100">
            <code>{data.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

