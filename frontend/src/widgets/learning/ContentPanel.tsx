import { cn } from '@/shared/lib/utils'
import { type CurriculumStep } from '@/shared/data/curriculum'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ContentPanelProps {
    step: CurriculumStep
}

export function ContentPanel({ step }: ContentPanelProps) {
    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
            {/* Content Header */}
            <div className="px-10 py-12 border-b border-[#F1F3F5] shrink-0">
                <div className="flex items-center gap-2 mb-4">
                    <span className={cn(
                        "px-3 py-1 rounded-[100px] text-[13px] font-bold tracking-tight",
                        step.type === 'CONCEPT' ? "bg-[#eef2ff] text-[#4f46e5]" :
                            step.type === 'CODING' ? "bg-[#f5f3ff] text-[#7c3aed]" :
                                step.type === 'MCQ' ? "bg-[#fffbeb] text-[#d97706]" :
                                    "bg-[#ffedd5] text-[#c2410c]"
                    )}>
                        {step.type === 'CONCEPT' ? '개념 학습' :
                            step.type === 'CODING' ? '실습 코딩' :
                                step.type === 'MCQ' ? '객관식 문제' : '단답형 문제'}
                    </span>
                </div>
                <h1 className="text-[28px] font-extrabold text-[#191F28] tracking-tight leading-tight">{step.title}</h1>
            </div>

            {/* Actual Content (Markdown) */}
            <div className="px-10 py-10 pb-20">
                <div className="prose prose-slate max-w-none text-[15px] leading-[1.7] text-[#4E5968] font-medium 
                                prose-headings:text-[#191F28] prose-headings:font-bold prose-headings:tracking-tight
                                prose-h1:text-[22px] prose-h1:mb-5 
                                prose-h2:text-[18px] prose-h2:mb-4 prose-h2:mt-8
                                prose-h3:text-[16px] prose-h3:mb-3 prose-h3:mt-6
                                prose-p:mb-5 prose-p:leading-[1.75]
                                prose-strong:text-[#333D4B] prose-strong:font-bold
                                prose-a:text-[#3182f6] prose-a:no-underline hover:prose-a:underline
                                prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-6 prose-li:mb-1.5 prose-li:marker:text-[#8B95A1]
                                prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-6 prose-li:marker:text-[#8B95A1]
                                prose-code:text-[#191F28] prose-code:bg-[#F2F4F6] prose-code:px-1.5 prose-code:py-[3px] prose-code:rounded-[4px] prose-code:font-mono prose-code:text-[14px] prose-code:font-medium
                                prose-code:before:content-none prose-code:after:content-none
                                prose-blockquote:border-l-4 prose-blockquote:border-[#E5E8EB] prose-blockquote:pl-4 prose-blockquote:ml-0 prose-blockquote:text-[#8B95A1] prose-blockquote:font-normal prose-blockquote:not-italic
                                [&>*:first-child]:mt-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {step.contentMarkdown}
                    </ReactMarkdown>
                </div>

                {/* Options for MCQ */}
                {step.type === 'MCQ' && step.options && (
                    <div className="mt-8 space-y-3">
                        <h4 className="font-bold text-slate-900 mb-4">보기를 선택하세요:</h4>
                        {step.options.map((option, idx) => (
                            <button key={idx} className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 transition-colors flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0">
                                    {idx + 1}
                                </span>
                                <span>{option}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Short Answer Input */}
                {step.type === 'SHORT_ANSWER' && (
                    <div className="mt-8 space-y-3">
                        <h4 className="font-bold text-slate-900 mb-2">정답을 입력하세요:</h4>
                        <input
                            type="text"
                            placeholder="정확한 값을 입력하세요"
                            className="w-full max-w-md px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
