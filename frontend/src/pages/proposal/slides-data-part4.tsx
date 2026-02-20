import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

// Chapter 6: Roadmap & Vision (29~38)
const slidesPart4 = [
  // 29. Competitor Analysis 
  {
    id: 'competitor-analysis',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-bold mb-16 text-foreground text-center">
          우리는 '정답 공유 게시판' 앱이 아닙니다.
        </h2>

        <table className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-xl text-center">
          <thead className="bg-[#191F28] text-white">
            <tr>
              <th className="p-6 font-bold text-xl w-1/4">서비스 비교점</th>
              <th className="p-6 font-bold text-xl w-1/4 border-l border-gray-600 opacity-60">
                고전 자격증 앱 (맞추O 등)
              </th>
              <th className="p-6 font-bold text-xl w-1/4 border-l border-gray-600 opacity-60">
                이론 중심 인강 플랫폼
              </th>
              <th className="p-6 font-black text-2xl w-1/4 border-l border-primary text-primary bg-primary/10">
                끝공 (Kkeutgong)
              </th>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr className="border-b">
              <td className="p-6 font-bold text-foreground bg-gray-50">주요 학습 폼 팩터</td>
              <td className="p-6 text-muted-foreground">단순 텍스트 / 커뮤니티</td>
              <td className="p-6 text-muted-foreground">시청각 자료 위주</td>
              <td className="p-6 font-bold text-primary bg-primary/5">AICE 특화 자격증 앱</td>
            </tr>
            <tr className="border-b">
              <td className="p-6 font-bold text-foreground bg-gray-50">실전 코딩 지원</td>
              <td className="p-6 text-muted-foreground">단편적인 O/X 수준</td>
              <td className="p-6 text-muted-foreground">인터랙티브 코딩(X)</td>
              <td className="p-6 font-bold text-primary bg-primary/5">100% 브라우저 내 Jupyter 연동</td>
            </tr>
            <tr>
              <td className="p-6 font-bold text-foreground bg-gray-50">학습의 연속성</td>
              <td className="p-6 text-red-400">자료가 파편화됨</td>
              <td className="p-6 text-red-400">보는 것으로 착각함</td>
              <td className="p-6 font-bold text-green-600 bg-primary/5">
                개념장 ➡ 실습 ➡ 1:1 챗봇
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    background: 'bg-[#F3F4F6]',
  },

  // Chapter 6: Roadmap & Vision
  {
    id: 'chapter-6-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">
          Chapter 6. Roadmap & Vision
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-foreground">
          자격증 주관사 🤝 플랫폼 🤝 수험생
          <br />
          필연적 파트너십
        </h2>

        <div className="flex bg-white p-12 rounded-3xl border border-border shadow-2xl items-center justify-between mx-auto max-w-6xl w-full">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-3xl mb-4 border border-primary/30">
              주관
            </div>
            <p className="font-bold text-lg text-foreground mb-1">AICE 등 자격증 주관사</p>
            <p className="text-sm text-gray-400 text-center">
              수험율 및 공신력 상승
              <br />
              합격률 리포트 확보
            </p>
          </div>

          <div className="flex flex-col text-primary font-black text-2xl animate-pulse">
            ➡ 상생 시너지 ➡
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-primary text-white rounded-3xl flex flex-col items-center justify-center font-bold text-3xl mb-4 shadow-lg shadow-primary/30 transform scale-110">
              끝공
              <span className="text-xs bg-white/20 px-2 py-1 mt-2 rounded-full">Kkeutgong</span>
            </div>
            <p className="font-bold text-lg text-primary text-center">공식 지정 AI 실습 인프라</p>
          </div>

          <div className="flex flex-col text-primary font-black text-2xl animate-pulse">
            ➡ 고품질 학습 ➡
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center font-bold mb-4 border border-blue-200">
              <Users className="w-12 h-12" />
            </div>
            <p className="font-bold text-lg text-foreground mb-1">응시생들</p>
            <p className="text-sm text-gray-400 text-center">
              14일 단기 완성 패스
              <br />
              인강/환경 세팅 고통 해방
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // 33. Phase 1~3
  {
    id: 'vision-roadmap',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-bold mb-16 text-foreground text-center">
          향후 로드맵: AI 리터러시 멘토링 거점
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-xl flex-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
              Current
            </div>
            <div className="text-primary text-lg font-bold mb-2">Phase 1 (MVP 구현 완료)</div>
            <h3 className="text-2xl font-black mb-4">현재까지 보여드린 4대 영역</h3>
            <ul className="list-disc pl-5 text-muted-foreground font-medium space-y-2">
              <li>14일 맞춤 스케줄러 (Plan)</li>
              <li>AICE 핵심 요약 개념 (Textbook)</li>
              <li>라이브 파이썬 코딩 및 피드백 (Labs)</li>
              <li>메타인지 약점 대시보드 (Dashboard)</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border flex-1 border-t-4 border-t-blue-500 shadow-md">
            <div className="text-blue-500 text-lg font-bold mb-2">Phase 2 (고도화 돌입)</div>
            <h3 className="text-2xl font-black mb-4">학습 튜터링 파이프라인</h3>
            <ul className="list-disc pl-5 text-muted-foreground font-medium space-y-2">
              <li>실제 AICE CBT와 흡사한 완전 모의고사 (Mock Exam) 개발</li>
              <li>유저의 코드를 직접 수정/힌트 주는 LLM AI-Tutor 이식</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border flex-1 border-t-4 border-t-green-500 shadow-md">
            <div className="text-green-500 text-lg font-bold mb-2">Phase 3 (비전 성장)</div>
            <h3 className="text-2xl font-black mb-4">IT/SW 자격증 인프라 확장</h3>
            <ul className="list-disc pl-5 text-muted-foreground font-medium space-y-2">
              <li>정보처리기사, 빅데이터 분석 기사 등 [실기] 기반 시험 포섭</li>
              <li>합격자와 예비 응시생을 잇는 프리미엄 커뮤니티</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // 38. Outro
  {
    id: 'outro',
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#1A1A24] text-white px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-8 w-24 h-24 rounded-3xl flex items-center justify-center relative">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-50 rounded-full animate-pulse"></div>
            <div className="font-black text-6xl text-white relative z-10">끝</div>
          </div>
          <h2 className="text-5xl md:text-[80px] font-black tracking-tighter mb-8 text-white leading-tight">
            막막했던 자격증 공부,
            <br />
            14일 챌린지로 <span className="text-primary">끝장냅니다.</span>
          </h2>
          <div className="inline-block mt-8 px-10 py-5 rounded-2xl bg-white text-black font-black text-2xl hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer">
            Thank You. Any Questions?
          </div>
        </motion.div>
      </div>
    ),
    background: 'bg-[#1A1A24]',
  },
]

export { slidesPart4 }
