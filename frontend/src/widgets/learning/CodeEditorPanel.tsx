import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, TerminalSquare, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

interface CodeEditorPanelProps {
    defaultCode?: string
    language?: string
}

export function CodeEditorPanel({
    defaultCode = "# 여기에 코드를 작성하세요\nprint('Hello, AICE!')",
    language = "python"
}: CodeEditorPanelProps) {
    const [code, setCode] = useState(defaultCode)
    const [output, setOutput] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [terminalOpen, setTerminalOpen] = useState(true)

    const generateMockOutput = (code: string): string[] => {
        // Simple mock logic based on code content
        if (code.includes("print")) {
            const match = code.match(/print\(['"](.+)['"]\)/)
            if (match) return [match[1]]
            // If print exists but regex doesn't match perfectly, just return default
            return ["Hello, AICE! (Mock Output)"]
        }
        if (code.includes("error")) {
            return ["Traceback (most recent call last):", "  File \"main.py\", line 1, in <module>", "NameError: name 'error' is not defined"]
        }
        return ["Execution complete.", "No output detected."]
    }

    const handleRun = async () => {
        setIsRunning(true)
        setOutput([]) // Clear previous output
        setTerminalOpen(true) // Open terminal if closed

        // Simulate network delay and execution
        setTimeout(() => {
            const newOutput = [
                "> python main.py",
                ...generateMockOutput(code),
                "",
                "Process finished with exit code 0"
            ]
            setOutput(newOutput)
            setIsRunning(false)
        }, 1200)
    }

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-[#333] relative">
            {/* Editor Toolbar (Glassmorphism) */}
            <div className="h-[52px] px-5 flex items-center justify-between bg-[#252526]/80 backdrop-blur-md border-b border-[#333] shrink-0 z-10 sticky top-0">
                <div className="flex items-center gap-3">
                    <span className="text-[13px] font-mono text-[#E5E8EB] bg-[#333] px-3 py-1.5 rounded-md shadow-inner border border-[#404040]">main.py</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 px-3 text-[#A0A0A0] hover:text-white hover:bg-[#333] transition-colors"
                        onClick={() => {
                            setCode(defaultCode)
                            setOutput([])
                        }}
                    >
                        <RotateCcw className="w-4 h-4 mr-1.5" /> 초기화
                    </Button>
                    {/* Glowing Run Button */}
                    <Button
                        size="sm"
                        className={cn(
                            "h-9 px-5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white font-bold shadow-lg shadow-emerald-500/20 border border-emerald-400/30 transition-all duration-300",
                            isRunning ? "opacity-80 cursor-not-allowed" : "hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                        )}
                        onClick={handleRun}
                        disabled={isRunning}
                    >
                        {isRunning ? (
                            <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 animate-spin" /> 실행 중...</span>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-1.5 fill-current" /> 실행
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 min-h-0 relative">
                <Editor
                    height="100%"
                    defaultLanguage={language}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16 }
                    }}
                />
            </div>

            {/* Terminal Panel */}
            <div
                className={cn(
                    "flex flex-col bg-[#1e1e1e] border-t border-[#333] transition-all duration-500 ease-in-out overflow-hidden shadow-[0_-4px_24px_rgba(0,0,0,0.2)] z-20",
                    terminalOpen ? "h-[35%]" : "h-[44px]"
                )}
            >
                <div
                    className="h-[44px] px-5 flex items-center justify-between bg-[#252526] cursor-pointer hover:bg-[#2A2D35] transition-colors shrink-0 border-b border-[#333]"
                    onClick={() => setTerminalOpen(!terminalOpen)}
                >
                    <div className="flex items-center gap-2 text-[14px] text-[#E5E8EB] font-bold">
                        <TerminalSquare className="w-4 h-4 text-[#A0A0A0]" />
                        실행 결과
                    </div>
                    {terminalOpen ? <ChevronDown className="w-5 h-5 text-[#888] transition-transform" /> : <ChevronUp className="w-5 h-5 text-[#888] transition-transform" />}
                </div>

                <div className="flex-1 p-5 font-mono text-[14px] leading-[1.6] overflow-auto custom-scrollbar bg-[#111111]">
                    {isRunning && output.length === 0 && (
                        <div className="text-emerald-400 mb-2 flex items-center gap-2">
                            <span className="animate-pulse">▶</span> Compiling and running...
                        </div>
                    )}
                    {output.map((line, i) => (
                        <div key={i} className={cn(
                            "mb-1.5 break-all whitespace-pre-wrap",
                            line.startsWith(">") ? "text-[#888] font-medium" :
                                line.includes("Traceback") || line.includes("Error") ? "text-rose-400" : "text-[#D4D4D4]"
                        )}>
                            {line}
                        </div>
                    ))}
                    {!isRunning && output.length === 0 && terminalOpen && (
                        <div className="text-[#666] italic text-[13px]">오른쪽 상단의 <strong className="text-emerald-500 not-italic">실행</strong> 버튼을 눌러 코드를 실행해보세요.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
