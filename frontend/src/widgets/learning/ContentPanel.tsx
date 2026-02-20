import { cn } from '@/shared/lib/utils'
import { type Lesson } from '@/shared/data/courses'

interface ContentPanelProps {
    lesson: Lesson
}

export function ContentPanel({ lesson }: ContentPanelProps) {
    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
            {/* Content Header */}
            <div className="px-10 py-12 border-b border-[#F1F3F5] shrink-0">
                <div className="flex items-center gap-2 mb-4">
                    <span className={cn(
                        "px-3 py-1.5 rounded-full text-[13px] font-bold tracking-wide shadow-sm",
                        lesson.type === 'concept' ? "bg-blue-50 text-blue-700 border border-blue-100" :
                            lesson.type === 'practice' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>
                        {lesson.type.toUpperCase()}
                    </span>
                </div>
                <h1 className="text-[32px] font-extrabold text-[#191F28] mb-4 tracking-tight leading-tight">{lesson.title}</h1>
                <p className="text-[#8B95A1] text-[18px] font-medium leading-[1.6]">
                    이 강의에서는 {lesson.title}에 대해 학습합니다. 핵심 개념을 잘 이해하고 넘어가세요.
                </p>
            </div>

            {/* Actual Content (Mock) */}
            <div className="px-10 py-10 text-[17px] leading-[1.8] text-[#4E5968] font-medium space-y-8">
                {lesson.type === 'practice' ? (
                    <div className="space-y-8">
                        <p className="text-[#333D4B]">
                            오른쪽 에디터에서 직접 코드를 작성하고 실행해보세요.<br />
                            아래 예제 코드를 복사해서 실행해보면 결과를 바로 확인할 수 있습니다.
                        </p>

                        {/* MacOS Style Code Snippet */}
                        <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg border border-[#333]">
                            {/* Window Controls */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#2D2D2D] border-b border-[#404040]">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                <span className="ml-2 text-[12px] text-[#A0A0A0] font-mono">example.py</span>
                            </div>

                            <div className="p-6 text-[15px] font-mono leading-[1.6]">
                                <div className="text-[#6A9955] mb-2"># Pandas를 사용한 데이터 프레임 실습</div>
                                <div><span className="text-[#C586C0]">import</span> <span className="text-[#D4D4D4]">pandas</span> <span className="text-[#C586C0]">as</span> <span className="text-[#D4D4D4]">pd</span></div>
                                <br />
                                <div className="text-[#6A9955] mt-2"># 딕셔너리를 활용한 데이터프레임 생성</div>
                                <div className="text-[#D4D4D4]">df = pd.DataFrame({'{'}<span className="text-[#CE9178]">"A"</span>: [<span className="text-[#B5CEA8]">1</span>, <span className="text-[#B5CEA8]">2</span>], <span className="text-[#CE9178]">"B"</span>: [<span className="text-[#B5CEA8]">3</span>, <span className="text-[#B5CEA8]">4</span>]{'}'})</div>
                                <div className="text-[#D4D4D4]">print(df)</div>
                            </div>
                        </div>

                        {/* Premium Callout Box */}
                        <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-[16px] flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">!</div>
                            <div>
                                <h4 className="font-bold text-blue-900 mb-1">실행 팁 (Tip)</h4>
                                <p className="text-[14px] text-blue-800 leading-[1.6]">코드를 작성한 후 <strong className="bg-blue-100 px-1 py-0.5 rounded text-blue-900">실행(Run)</strong> 버튼을 누르면, 하단 터미널 프롬프트에서 파이썬 실행 결과를 실시간으로 확인할 수 있습니다.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p>
                            데이터 사이언스에서 가장 중요한 것은 데이터의 흐름을 이해하는 것입니다.
                            이론 학습을 통해 기본 개념을 확실히 다진 후, 실습을 통해 실제로 코드를 작성해보세요.
                        </p>

                        {lesson.type === 'video' && (
                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white/50 mb-8">
                                [비디오 플레이어 영역]
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-[#191F28] mt-8 mb-4">핵심 포인트</h3>
                        <ul className="list-disc pl-5 space-y-2 text-[#4E5968]">
                            <li>학습 목표를 명확히 이해하기</li>
                            <li>주요 개념과 용어 정리하기</li>
                            <li>다음 실습을 위한 준비</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    )
}
