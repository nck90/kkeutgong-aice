'use client'

import React, { useState, useRef, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { Play, CheckSquare, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

export default function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
    const router = useRouter()
    // React 19 / Next 15 requires unwrapping async params via React.use
    const resolvedParams = use(params)
    const sessionId = resolvedParams.sessionId

    const [code, setCode] = useState("import pandas as pd\n\n# DataFrame을 불러오고 결측치를 확인하세요.\ndf = pd.read_csv('data.csv')\n")
    const [output, setOutput] = useState("출력 결과가 여기에 표시됩니다.\n\n[System] Jupyter Kernel Ready.")
    const [status, setStatus] = useState<'idle' | 'running' | 'submitted'>('idle')
    const [result, setResult] = useState<any>(null)

    const executeCode = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/aice/sessions/${sessionId}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, stepNo: 1 })
            })
            if (!res.ok) throw new Error('Execution failed')
            return res.json()
        },
        onMutate: () => {
            setStatus('running')
            setOutput("Running...\n")
        },
        onSuccess: (data) => {
            setOutput(data.data.stdout || data.data.stderr || "No output.")
            setStatus('idle')
        },
        onError: (err: any) => {
            setOutput(`Error: ${err.message}`)
            setStatus('idle')
        }
    })

    const submitStep = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/aice/sessions/${sessionId}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: { code }, stepNo: 1 })
            })
            if (!res.ok) throw new Error('Submission failed')
            return res.json()
        },
        onMutate: () => {
            setStatus('submitted')
        },
        onSuccess: (data) => {
            setResult(data.data)
            setStatus('idle')
        }
    })

    return (
        <div className="h-screen w-screen flex flex-col bg-[#1E1E1E] text-[#D4D4D4] overflow-hidden">
            {/* Top Navbar */}
            <header className="h-14 bg-[#2D2D2D] border-b border-[#404040] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/labs')}
                        className="p-2 hover:bg-[#404040] rounded-lg transition-colors flex items-center gap-2 text-sm font-bold text-gray-300"
                    >
                        <ArrowLeft className="w-4 h-4" /> 나가기
                    </button>
                    <div className="h-4 w-px bg-[#404040]"></div>
                    <span className="text-sm font-bold">AICE 실습 세션 (Step 1/5)</span>
                </div>

                <div className="flex justify-center items-center font-mono font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                    59:42 남음
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => executeCode.mutate()}
                        disabled={status !== 'idle'}
                        className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#45a049] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                    >
                        {status === 'running' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        실행 (Shift+Enter)
                    </button>
                    <button
                        onClick={() => submitStep.mutate()}
                        disabled={status !== 'idle'}
                        className="flex items-center gap-2 bg-primary hover:bg-[#5F3DC4] text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(115,83,234,0.4)] disabled:opacity-50"
                    >
                        <CheckSquare className="w-4 h-4" /> 제출
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                {/* Left: Problem Desc */}
                <div className="w-full md:w-[35%] h-full bg-[#252526] border-r border-[#404040] p-6 overflow-y-auto">
                    <div className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-bold mb-4 border border-blue-500/30">
                        실습 문항 1
                    </div>
                    <h2 className="text-xl font-bold text-white mb-6 leading-relaxed">
                        Pandas DataFrame 결측치 전처리
                    </h2>

                    <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-medium">
                        <p>
                            주어진 <code>data.csv</code> 파일을 읽어 DataFrame 형태로 변환하세요.
                        </p>
                        <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#404040] space-y-2 mt-4">
                            <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">지시사항</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>변수명 <code>df</code>로 데이터를 로딩할 것</li>
                                <li><code>Age</code> 컬럼의 결측치를 확인하는 코드를 작성할 것</li>
                            </ul>
                        </div>
                    </div>

                    {/* Result Feedback Box */}
                    {result && (
                        <div className={`mt-8 p-4 rounded-xl border ${result.result === 'PASS' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                            <div className="flex items-center gap-2 font-bold mb-2">
                                {result.result === 'PASS' ? <CheckSquare className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                {result.result === 'PASS' ? '정답입니다! (+10점)' : '오답입니다.'}
                            </div>
                            <p className="text-sm font-medium opacity-80">{result.feedback.summary}</p>
                        </div>
                    )}
                </div>

                {/* Right: Code & Output */}
                <div className="flex-1 h-full flex flex-col min-w-0">
                    {/* Code Editor */}
                    <div className="flex-[2] h-full w-full relative min-h-0 border-b border-[#404040]">
                        <div className="absolute top-0 left-0 w-full h-8 bg-[#1E1E1E] flex items-center px-4 border-b border-[#333] z-10 text-xs font-bold text-gray-400">
                            main.py
                        </div>
                        <div className="pt-8 h-full">
                            <Editor
                                height="100%"
                                defaultLanguage="python"
                                theme="vs-dark"
                                value={code}
                                onChange={(val) => setCode(val || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    fontFamily: 'JetBrains Mono, Menlo, monospace',
                                    lineHeight: 24,
                                    padding: { top: 16 },
                                    scrollBeyondLastLine: false,
                                    smoothScrolling: true,
                                    cursorBlinking: "smooth",
                                    cursorSmoothCaretAnimation: "on",
                                }}
                            />
                        </div>
                    </div>

                    {/* Terminal / Output */}
                    <div className="flex-1 h-full bg-[#1E1E1E] flex flex-col min-h-0">
                        <div className="h-8 bg-[#252526] border-b border-[#333] flex items-center px-4 text-xs font-bold text-gray-400 gap-4 shrink-0">
                            <span className="text-white border-b-2 border-primary h-full flex items-center pt-[2px]">TERMINAL</span>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
                            <span className="text-green-400">root@kkeutgong-sandbox:~#</span> python main.py
                            <br /><br />
                            {output}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
