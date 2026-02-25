import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Part 4: Business Model, Vision, Team, Outro — 슬라이드 15~18

const slidesGeneralPart4 = [
    // 15. Business Model — B2B2C
    {
        id: 'g-biz-model',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Business Model
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center">
                    B2B2C 비즈니스 모델
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl w-full justify-center">
                    {/* Enterprise */}
                    <div className="flex-1 bg-[#191F28] p-8 rounded-3xl text-white text-center shadow-xl w-full max-w-xs">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                            <span className="text-3xl font-black">B2B</span>
                        </div>
                        <h4 className="text-xl font-black mb-2 text-center">자격증 단체</h4>
                        <p className="text-white/60 text-sm mb-4 leading-relaxed text-center">
                            자격증을 제작하고<br />교육하는 기관·단체
                        </p>
                        <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold text-white/80 inline-block">
                            월 3,000만~5,000만원
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                        <ArrowRight className="w-8 h-8 text-primary hidden md:block" />
                        <span className="text-xs text-muted-foreground font-bold">솔루션 제공</span>
                    </div>

                    {/* 끝공 */}
                    <div className="flex-1 bg-gradient-to-br from-primary to-[#5F3DC4] p-8 rounded-3xl text-white text-center shadow-2xl shadow-primary/20 transform scale-105 w-full max-w-xs z-10">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                            <span className="text-4xl font-black">끝공</span>
                        </div>
                        <h4 className="text-xl font-black mb-2 text-center">AI 자격증 학습 플랫폼</h4>
                        <p className="text-white/70 text-sm leading-relaxed text-center">
                            자격증 학습에 최적화된<br />올인원 학습 솔루션
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                        <ArrowRight className="w-8 h-8 text-primary hidden md:block" />
                        <span className="text-xs text-muted-foreground font-bold">학습 제공</span>
                    </div>

                    {/* User */}
                    <div className="flex-1 bg-white p-8 rounded-3xl border-2 border-border text-center shadow-xl w-full max-w-xs">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                            <span className="text-3xl font-black text-blue-500">C</span>
                        </div>
                        <h4 className="text-xl font-black text-foreground mb-2 text-center">유저</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed text-center">
                            자격증 학습에 니즈를<br />가지고 있는 타겟
                        </p>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 16. Vision — 향후 계획 3단계
    {
        id: 'g-vision',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Vision
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-16 text-foreground text-center">
                    향후 계획
                </h2>
                <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full justify-center">
                    {/* Phase 1 */}
                    <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-xl flex-1 relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            Current
                        </div>
                        <div className="text-primary text-lg font-bold mb-2 text-center md:text-left">Phase 1</div>
                        <h3 className="text-2xl font-black mb-4 text-center md:text-left">핵심 학습 구조 자동화</h3>
                        <ul className="list-disc pl-5 text-muted-foreground font-medium space-y-2 text-left">
                            <li>기출문제 PDF 기반 커리큘럼 자동 생성</li>
                            <li>핵심 개념 자동 추출 및 요약</li>
                            <li>학습 데이터 시각화 대시보드</li>
                            <li>웹 버전 구현 및 서비스 런칭</li>
                        </ul>
                    </div>

                    {/* Phase 2 */}
                    <div className="bg-white p-8 rounded-3xl border border-border flex-1 border-t-4 border-t-blue-500 shadow-md text-center md:text-left">
                        <div className="text-blue-500 text-lg font-bold mb-2 text-center md:text-left">Phase 2</div>
                        <h3 className="text-2xl font-black mb-4 text-center md:text-left">AI 시스템 고도화</h3>
                        <ul className="list-disc pl-5 text-muted-foreground font-medium space-y-2 text-left">
                            <li>AI 튜터 챗봇 연동</li>
                            <li>Bandit 알고리즘 기반 맞춤 알림</li>
                            <li>실전 모의고사 환경 구축</li>
                            <li>학습 패턴 분석 강화</li>
                        </ul>
                    </div>

                    {/* Phase 3 */}
                    <div className="bg-white p-8 rounded-3xl border border-border flex-1 border-t-4 border-t-green-500 shadow-md text-center md:text-left">
                        <div className="text-green-500 text-lg font-bold mb-2 text-center md:text-left">Phase 3</div>
                        <h3 className="text-2xl font-black mb-4 text-center md:text-left">커뮤니티 & 멘토링</h3>
                        <ul className="list-disc pl-5 text-muted-foreground font-medium space-y-2 text-left">
                            <li>합격자 멘토링 프로그램</li>
                            <li>학습 커뮤니티 구축</li>
                            <li>민간·국가 자격증 확장</li>
                            <li>B2B 파트너십 본격화</li>
                        </ul>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 17. Team
    {
        id: 'g-team',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 bg-white break-keep">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Team
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center">
                    끝공을 만드는 사람들
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center">
                    {[
                        { role: 'CEO / PM', skill: '기획 · 비즈니스', desc: '서비스 기획, 사업 전략, 파트너십 관리', color: 'from-primary to-[#5F3DC4]' },
                        { role: 'CTO / Dev', skill: '풀스택 개발', desc: 'AI 시스템 설계, 프론트/백엔드 개발, 인프라 구축', color: 'from-blue-500 to-cyan-500' },
                        { role: 'AI Engineer', skill: 'ML / NLP', desc: 'PDF 분석 AI, Bandit 알고리즘, 학습 모델 개발', color: 'from-emerald-500 to-green-500' },
                    ].map((m, i) => (
                        <div key={i} className="flex-1 bg-[#FAFAFA] p-8 rounded-3xl border border-border text-center hover:-translate-y-2 transition-transform max-w-xs">
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center mx-auto mb-4`}>
                                <span className="text-2xl font-black text-white">{m.role.charAt(0)}</span>
                            </div>
                            <h4 className="text-xl font-black text-foreground mb-1 text-center">{m.role}</h4>
                            <p className="text-sm text-primary font-bold mb-3 text-center">{m.skill}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed text-center">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 18. Outro
    {
        id: 'g-outro',
        content: (
            <div className="flex flex-col items-center justify-center h-full w-full bg-[#1A1A24] text-white px-4 text-center break-keep">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mx-auto mb-8 w-24 h-24 rounded-3xl flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-primary blur-2xl opacity-50 rounded-full animate-pulse" />
                        <div className="font-black text-6xl text-white relative z-10">끝</div>
                    </div>
                    <h2 className="text-5xl md:text-[80px] font-black tracking-tighter mb-8 text-white leading-tight">
                        자격증 공부,<br />
                        <span className="text-primary">끝</span>까지 <span className="text-primary">공</span>략하다.
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
                        기출문제 PDF만 올리면 AI가 커리큘럼을 설계하고,<br />
                        핵심 개념을 생성하며, 학습을 관리해줍니다.
                    </p>
                    <div className="mt-12 text-white/30 text-sm font-medium tracking-[0.2em] uppercase text-center">
                        KkeutGong AI Platform 2025
                    </div>
                </motion.div>
            </div>
        ),
        background: 'bg-[#1A1A24]',
    },
]

export { slidesGeneralPart4 }
