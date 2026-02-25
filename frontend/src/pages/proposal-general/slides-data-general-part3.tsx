import { TrendingUp, Handshake } from 'lucide-react'

// Part 3: Market Research, 민간자격증 추이, 경쟁사 분석, Progress — 슬라이드 11~14

const slidesGeneralPart3 = [
    // 11. Market — 자격증 시장 규모
    {
        id: 'g-market-size',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Market Research
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center leading-tight">
                    자격증 시장은<br />
                    <span className="text-primary">매우 큽니다.</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">
                    <div className="flex-1 bg-white p-10 rounded-3xl border-2 border-primary shadow-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            국가기술
                        </div>
                        <div className="text-6xl font-black text-primary mb-3">548개</div>
                        <p className="text-lg text-foreground font-bold mb-2">국가기술자격증</p>
                        <p className="text-sm text-muted-foreground">정부 인정 전문 기술 자격</p>
                    </div>
                    <div className="flex-1 bg-[#191F28] p-10 rounded-3xl text-white text-center shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            민간
                        </div>
                        <div className="text-6xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            36,517개
                        </div>
                        <p className="text-lg font-bold mb-2">민간자격증</p>
                        <p className="text-sm text-white/60">단체 자격증까지 확장 가능</p>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-primary to-[#5F3DC4] p-10 rounded-3xl text-white text-center shadow-xl">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-bold mb-2">확장 포인트</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                            특히 기출문제가 없는 자격증은
                            교육 품질에 대한 니즈가 높습니다.
                            이 지점이 끝공의 확장 포인트입니다.
                        </p>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 12. Market — 민간자격증 등록 추이
    {
        id: 'g-market-trend',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground text-center">
                    민간자격증 등록 현황
                </h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">
                    민간자격증 등록 수는 매년 급격히 증가하고 있습니다.
                </p>
                <div className="max-w-5xl w-full bg-white p-10 rounded-3xl border border-border shadow-xl">
                    {/* Bar chart */}
                    <div className="flex items-end gap-3 h-64 justify-center">
                        {[
                            { y: '08', v: 655, h: 10 },
                            { y: '09', v: 380, h: 6 },
                            { y: '10', v: 539, h: 8 },
                            { y: '11', v: 1053, h: 16 },
                            { y: '12', v: 1453, h: 22 },
                            { y: '13', v: 2748, h: 42 },
                            { y: '14', v: 6253, h: 70 },
                            { y: '18', v: 6521, h: 73 },
                            { y: '22', v: 7011, h: 80 },
                            { y: '25', v: 7500, h: 85 },
                        ].map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                <span className="text-[10px] font-bold text-muted-foreground">
                                    {d.v >= 1000 ? `${(d.v / 1000).toFixed(1)}k` : d.v}
                                </span>
                                <div
                                    className="w-full rounded-t-lg transition-all duration-500"
                                    style={{
                                        height: `${d.h}%`,
                                        background: i >= 7
                                            ? 'linear-gradient(180deg, #7353EA, #5F3DC4)'
                                            : 'linear-gradient(180deg, #AB9DFE, #D4CDFE)',
                                    }}
                                />
                                <span className="text-[11px] font-bold text-foreground mt-1 text-center">{`'${d.y}`}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-6 text-right">출처: 민간자격정보 서비스</p>
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 13. Differentiator — 경쟁사 분석
    {
        id: 'g-competitor',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Competitive Analysis
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center">
                    서비스 차별점
                </h2>
                <table className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-xl text-center">
                    <thead className="bg-[#191F28] text-white">
                        <tr>
                            <th className="p-5 font-bold text-base w-1/5 text-center">비교 항목</th>
                            <th className="p-5 font-bold text-base w-1/5 border-l border-gray-600 opacity-60 text-center">맞추다</th>
                            <th className="p-5 font-bold text-base w-1/5 border-l border-gray-600 opacity-60 text-center">공부해닷컴</th>
                            <th className="p-5 font-bold text-base w-1/5 border-l border-gray-600 opacity-60 text-center">Brilliant</th>
                            <th className="p-5 font-black text-lg w-1/5 border-l border-primary text-primary bg-primary/10 text-center">끝공</th>
                        </tr>
                    </thead>
                    <tbody className="text-base">
                        <tr className="border-b">
                            <td className="p-5 font-bold text-foreground bg-gray-50 text-center">서비스 형태</td>
                            <td className="p-5 text-muted-foreground text-center">웹 랜딩페이지</td>
                            <td className="p-5 text-muted-foreground text-center">커뮤니티 형식</td>
                            <td className="p-5 text-muted-foreground text-center">글로벌 앱</td>
                            <td className="p-5 font-bold text-primary bg-primary/5 text-center">자격증 특화 앱</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-5 font-bold text-foreground bg-gray-50 text-center">문제 생성</td>
                            <td className="p-5 text-red-400 text-center">✕</td>
                            <td className="p-5 text-red-400 text-center">✕</td>
                            <td className="p-5 text-red-400 text-center">✕</td>
                            <td className="p-5 font-bold text-[#00C471] bg-primary/5 text-center">AI 자동 생성 ✓</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-5 font-bold text-foreground bg-gray-50 text-center">자료 품질</td>
                            <td className="p-5 text-muted-foreground text-center">자료 부족</td>
                            <td className="p-5 text-muted-foreground text-center">자료 공유 앱</td>
                            <td className="p-5 text-muted-foreground text-center">자격증 미지원</td>
                            <td className="p-5 font-bold text-primary bg-primary/5 text-center">PDF 기반 AI 분석</td>
                        </tr>
                        <tr>
                            <td className="p-5 font-bold text-foreground bg-gray-50 text-center">약점</td>
                            <td className="p-5 text-red-400 text-sm text-center">자격증 앱 ✕</td>
                            <td className="p-5 text-red-400 text-sm text-center">체계 없음</td>
                            <td className="p-5 text-red-400 text-sm text-center">한국 자격증 ✕</td>
                            <td className="p-5 font-bold text-[#00C471] bg-primary/5 text-sm text-center">맞춤 커리큘럼 + AI</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 14. Progress — AICE 미팅
    {
        id: 'g-progress',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h3 className="text-[#00C471] font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Progress
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center leading-tight">
                    어디까지 진행되었나요?
                </h2>
                <div className="max-w-4xl w-full space-y-6">
                    <div className="bg-white p-8 rounded-3xl border-2 border-[#00C471] shadow-xl">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="bg-[#00C471] text-white w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                                <Handshake className="w-8 h-8" />
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                                    <h3 className="text-2xl font-black text-foreground">AICE 자격증 운영 측과 미팅 완료</h3>
                                    <span className="bg-[#00C471]/10 text-[#00C471] text-xs font-bold px-3 py-1 rounded-full">진행 중</span>
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    AICE 자격증 운영 측과 직접 미팅을 진행했습니다.
                                    국가공인뿐 아니라 민간 자격증 영역까지 교육 솔루션에 대한 니즈가 있다는 것을
                                    확인했고, 현재 <span className="font-bold text-foreground">PoC(Proof of Concept)를 논의 중</span>입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-md">
                        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`w-20 h-2 rounded-full ${step <= 2 ? 'bg-[#00C471]' : 'bg-muted'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-muted-foreground text-center">
                                미팅 완료 → PoC 논의 중 → 파일럿 → 본계약
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 15. Blue Ocean — Web IDE 기술적 해자
    {
        id: 'g-blue-ocean',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
                    웹 기반 Jupyter 실습 환경이 만드는<br />
                    <span className="text-primary">압도적 기술 해자(Moat)</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-6xl items-center w-full">
                    <div className="bg-white p-8 rounded-3xl border border-border flex-1 shadow-md w-full md:w-1/3 text-center">
                        <h4 className="text-xl font-bold mb-4">데이터 리터러시 시대</h4>
                        <p className="text-muted-foreground">
                            더 이상 암기식 자격증이 대우받지 않습니다. AICE를 필두로, 직접 코드를 작성하고 실무 능력을 증명하는 디지털 자격증 수요가 폭증 중입니다.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border-2 border-primary flex-1 shadow-xl transform scale-100 md:scale-105 z-10 w-full md:w-2/3 text-center">
                        <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-4 mx-auto">
                            경쟁자의 한계
                        </div>
                        <h4 className="text-2xl font-black text-primary mb-4">[인프라 구축]의 장벽</h4>
                        <p className="text-foreground text-lg leading-relaxed font-medium mb-6">
                            아무나 "AICE 대비 앱"을 만들 수 있습니다. O/X 문항만 텍스트로 보여주면 되니까요.
                        </p>
                        <p className="text-muted-foreground">
                            하지만 끝공처럼 "브라우저에 Jupyter 커널을 이식하여 파이썬 코드를 1초 만에 실행/채점"해주는 <b>클라우드 컴파일 환경</b>은
                            막대한 인프라 지식과 설계가 필요합니다. 이것이 저희가 가진 감히 넘볼 수 없는 해자(Moat)입니다.
                        </p>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },
]

export { slidesGeneralPart3 }
