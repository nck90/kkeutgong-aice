
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

// Chapter 6: Roadmap & Vision (29~38)
const slidesPart4 = [
  // 29. Competitor Analysis 
  {
    id: 'competitor-analysis',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-black mb-16 text-foreground text-center">
          우리는 '정답 공유 게시판' 앱이 아닙니다.
        </h2>

        <table className="w-full max-w-[1400px] bg-white rounded-3xl overflow-hidden shadow-2xl text-center border-collapse">
          <thead className="bg-[#111] text-white">
            <tr>
              <th className="p-8 font-bold text-xl w-1/4 border-b-2 border-primary/20">서비스 비교점</th>
              <th className="p-8 font-bold text-xl w-1/4 border-l border-gray-800 opacity-60 border-b-2 border-transparent">
                고전 자격증 앱 (맞추O 등)
              </th>
              <th className="p-8 font-bold text-xl w-1/4 border-l border-gray-800 opacity-60 border-b-2 border-transparent">
                이론 중심 인강 플랫폼
              </th>
              <th className="p-8 font-black text-2xl w-1/4 border-l border-blue-500 text-blue-400 bg-blue-500/10 border-b-2 border-blue-500">
                끝공 (Kkeutgong)
              </th>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr className="border-b border-border">
              <td className="p-8 font-bold text-foreground bg-gray-50/50">주요 학습 폼 팩터</td>
              <td className="p-8 text-muted-foreground">단순 텍스트 / 커뮤니티</td>
              <td className="p-8 text-muted-foreground">시청각 자료 위주</td>
              <td className="p-8 font-bold text-blue-600 bg-blue-50/50">AICE 특화 자격증 앱</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-8 font-bold text-foreground bg-gray-50/50">실전 코딩 지원</td>
              <td className="p-8 text-muted-foreground">단편적인 O/X 수준</td>
              <td className="p-8 text-muted-foreground">인터랙티브 코딩(X)</td>
              <td className="p-8 font-bold text-blue-600 bg-blue-50/50">100% 브라우저 내 Jupyter 연동</td>
            </tr>
            <tr>
              <td className="p-8 font-bold text-foreground bg-gray-50/50">학습의 연속성</td>
              <td className="p-8 text-red-500 font-medium">자료가 파편화됨</td>
              <td className="p-8 text-red-500 font-medium">보는 것으로 착각함</td>
              <td className="p-8 font-bold text-blue-600 bg-blue-50/50">
                개념장 ➔ 실습 ➔ 1:1 챗봇
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // Chapter 6: Roadmap & Vision
  {
    id: 'chapter-6-intro',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Chapter 6. Roadmap & Vision
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-foreground text-center leading-[1.3] max-w-4xl">
          자격증 주관사 🤝 플랫폼 🤝 수험생<br />
          필연적 파트너십
        </h2>

        <div className="flex bg-white p-12 rounded-3xl border border-border shadow-2xl items-center justify-between mx-auto max-w-6xl w-full">
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 bg-primary/5 text-primary rounded-full flex items-center justify-center font-bold text-2xl mb-6 border border-primary/20 shadow-inner">
              주관
            </div>
            <p className="font-bold text-xl text-foreground mb-2">AICE 등 주관사</p>
            <p className="text-base text-muted-foreground text-center leading-relaxed break-keep">
              수험율 및 공신력 상승<br />
              취약점 분석 데이터 모델 확보
            </p>
          </div>

          <div className="flex flex-col text-primary font-black text-2xl animate-pulse px-4">
            ➔ 상생 ➔
          </div>

          <div className="flex flex-col items-center flex-1 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl p-4"></div>
            <div className="w-36 h-36 bg-primary text-white rounded-3xl flex flex-col items-center justify-center font-bold text-4xl mb-6 shadow-2xl shadow-primary/40 transform scale-110 relative z-10 border border-white/20">
              끝공
              <span className="text-xs bg-black/20 px-3 py-1 font-sans mt-2 rounded-full tracking-widest uppercase">Kkeutgong</span>
            </div>
            <p className="font-bold text-xl text-primary text-center">공식 지정 AI 실습 인프라</p>
          </div>

          <div className="flex flex-col text-primary font-black text-2xl animate-pulse px-4">
            ➔ 고품질 ➔
          </div>

          <div className="flex flex-col items-center flex-1 break-keep">
            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center font-bold mb-6 border border-blue-100 shadow-inner">
              <Users className="w-10 h-10" />
            </div>
            <p className="font-bold text-xl text-foreground mb-2">응시생</p>
            <p className="text-base text-muted-foreground text-center leading-relaxed">
              14일 단기 완성 패스<br />
              인강/설치 고통 완벽 해방
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#F3F4F6]',
  },

  // 33. Phase 1~3
  {
    id: 'vision-roadmap',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-black mb-16 text-foreground text-center">
          향후 로드맵 : AI 리터러시 멘토링 거점
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1500px] w-full mx-auto items-stretch">
          <div className="bg-white p-10 rounded-3xl border-2 border-primary shadow-2xl flex-1 relative overflow-hidden transform hover:-translate-y-2 transition-transform">
            <div className="absolute top-0 right-0 bg-primary text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
              Current
            </div>
            <div className="text-primary text-xl font-bold mb-4">Phase 1 (MVP)</div>
            <h3 className="text-3xl font-black mb-6 text-foreground">현재까지 구현된 4대 핵심 영역</h3>
            <ul className="space-y-4 text-lg text-muted-foreground font-medium break-keep">
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-primary rounded-full"></span> 14일 맞춤 스케줄러 (Plan)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-primary rounded-full"></span> AICE 핵심 요약 개념 (Textbook)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-primary rounded-full"></span> 라이브 파이썬 코딩 및 피드백 (Labs)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 bg-primary rounded-full"></span> 메타인지 약점 대시보드 (Diagnostic)</li>
            </ul>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-border flex-1 border-t-8 border-t-blue-500 shadow-xl transform hover:-translate-y-2 transition-transform">
            <div className="text-blue-500 text-xl font-bold mb-4">Phase 2 (고도화)</div>
            <h3 className="text-3xl font-black mb-6 text-foreground break-keep">학습 튜터링 파이프라인</h3>
            <ul className="space-y-4 text-lg text-muted-foreground font-medium break-keep">
              <li className="flex items-start gap-3"><span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span> 실전 AICE CBT 환경과 100% 동일한 통합 모의고사 (Mock Exam)</li>
              <li className="flex items-start gap-3"><span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span> 유저의 코드를 실시간으로 읽고 힌트를 제공하는 AI-Tutor 챗봇</li>
            </ul>
          </div>

          <div className="bg-[#111] p-10 rounded-3xl border border-border flex-1 border-t-8 border-t-green-500 shadow-xl transform hover:-translate-y-2 transition-transform text-white break-keep">
            <div className="text-green-400 text-xl font-bold mb-4">Phase 3 (비전 확장)</div>
            <h3 className="text-3xl font-black mb-6">IT/SW 자격증 시장 제패</h3>
            <ul className="space-y-4 text-lg text-gray-400 font-medium break-keep">
              <li className="flex items-start gap-3"><span className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></span> 정보처리기사, 빅데이터 분석 기사 등 [실기] 기반 시험 포섭</li>
              <li className="flex items-start gap-3"><span className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></span> 합격자와 예비 응시생을 잇는 프리미엄 러닝 커뮤니티</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    background: 'bg-white',
  },

  // 38. Outro
  {
    id: 'outro',
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#111] text-white px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="mx-auto mb-12 w-24 h-24 rounded-3xl flex items-center justify-center relative">
            <div className="absolute inset-0 bg-primary blur-[40px] opacity-70 rounded-full animate-pulse"></div>
            <div className="font-black text-6xl text-white relative z-10 border-4 border-white/20 w-24 h-24 flex items-center justify-center rounded-3xl bg-white/5 backdrop-blur-md">끝</div>
          </div>
          <h2 className="text-5xl md:text-[80px] font-black tracking-tighter mb-10 text-white leading-[1.2] break-keep">
            막막했던 자격증 공부,<br />
            14일 챌린지로 <span className="text-primary">끝장냅니다.</span>
          </h2>
          <div className="inline-block mt-4 px-12 py-6 rounded-full bg-white text-black font-black text-2xl hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] cursor-pointer">
            질의응답 및 피드백 (Q&A)
          </div>
        </motion.div>
      </div>
    ),
    background: 'bg-[#111]',
  },
]

export { slidesPart4 }
