import { BarChart, Search, BrainCircuit, MessageSquare } from 'lucide-react'
import { ImageMockup } from './slides-data-part2'

// Chapter 4: 22-26
const slidesPart3 = [
  // 17. Feature 3 Session View (The Real Editor)
  {
    id: 'feature-3-session-view',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1500px] mx-auto">
        <ImageMockup src="/pitch-assets/session.png" alt="Live IDE Session" className="w-full h-[650px]" />
      </div>
    ),
    background: 'bg-[#191F28]',
  },

  // 19. Feature 4 Intro
  {
    id: 'feature-4-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-amber-500 font-bold text-3xl mb-4">
          Feature 04. 메타인지 대시보드 및 약점 진단 (Diagnostic)
        </h3>
        <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
          "내 실력이 어느 정도인지<br />데이터로 객관화합니다"
        </h2>
        <div className="bg-white p-8 rounded-3xl border border-border shadow-xl max-w-5xl">
          <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <BarChart className="w-8 h-8 text-amber-500" /> 감으로 하는 공부는 필패합니다.
          </h4>
          <p className="text-xl text-muted-foreground leading-relaxed">
            학습 시작 전 <b>사전 진단고사(Diagnostic)</b>를 통해 정확한 내 위치를 파악하고,
            매일 로그인하는 <b>대시보드(Dashboard)</b>에서 진도율과 나의 취약 파트(Scikit-Learn 등)를 수치화된 그래프로 관리받습니다.
          </p>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 20. Feature 4 Diagnostic View 
  {
    id: 'feature-4-diagnostic-view',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto bg-[#FAFAFA]">
        <ImageMockup src="/pitch-assets/diagnostic.png" alt="Diagnostic Test" className="w-full h-[650px] border-[#333]" />
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 21. Feature 4 Dashboard View
  {
    id: 'feature-4-dashboard-view',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto bg-[#F3F4F6]">
        <ImageMockup src="/pitch-assets/dashboard-auth.png" alt="Curriculum Dashboard" className="w-full h-[650px]" />
      </div>
    ),
    background: 'bg-[#F3F4F6]',
  },

  // Chapter 4: Elevating AI Capabilities
  {
    id: 'chapter-4-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">
          Chapter 4. Elevating AI Capabilities
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-foreground max-w-5xl leading-tight">
          자격증은 끝이 아니라 시작입니다.
        </h2>
        <p className="text-2xl text-muted-foreground leading-relaxed max-w-4xl">
          끝공의 진짜 목표는 단순한 종이 조각이 아닙니다.
          <br />단 한 번이라도 Jupyter에서 데이터를 다뤄보고 예외(에러)를 처리해 본 감각. 그 AI 리터러시를 수험생의 머리와 손에 강력하게 각인시킵니다.
        </p>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // 24. AI Tutor
  {
    id: 'ai-tutor',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-bold mb-12 text-foreground">
          언제든 물어볼 수 있는 <span className="text-primary">단독 AI 튜터</span>
        </h2>
        <div className="bg-white border border-border p-10 rounded-3xl shadow-xl flex gap-10 max-w-5xl items-center">
          <div className="bg-primary/20 p-8 rounded-full border border-primary/30 flex-shrink-0 relative">
            <BrainCircuit className="w-20 h-20 text-primary animate-pulse" />
            <div className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg">
              <MessageSquare className="w-6 h-6 text-blue-500 fill-blue-500/20" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-4">
              "선생님, 이 pandas 코드에서 왜 KeyError가 나나요?"
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              에러 때문에 진도가 막히면 1:1 대화형 챗봇에게 곧바로 질문하세요. 단순히 구글링을 대신하는 것이 아니라,
              수험생이 풀고 있는 문항과 작성한 파이썬 코드를 <b>AI가 같이 읽으며</b> 과외 강사처럼 힌트를 제시합니다.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // Chapter 5: Market & Competitors
  {
    id: 'chapter-5-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 bg-[#111] text-white">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">
          Chapter 5. The Competitive Edge
        </h3>
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          웹 기반 AI 실습 환경(Web IDE)이<br />
          만들어내는 압도적 시장 우위
        </h2>
      </div>
    ),
    background: 'bg-[#111]',
  },
  // 26. The Blue Ocean
  {
    id: 'blue-ocean',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-bold mb-12 text-foreground flex items-center gap-4">
          <Search className="w-12 h-12 text-blue-500" /> '코딩 실습형' 민간 자격증의 블루오션
        </h2>
        <div className="flex gap-8 max-w-6xl items-center">
          <div className="bg-white p-8 rounded-3xl border border-border flex-1 shadow-md w-1/3">
            <h4 className="text-xl font-bold mb-4">데이터 리터러시 시대</h4>
            <p className="text-gray-400">
              더 이상 암기식 자격증이 대우받지 않습니다. AICE를 필두로, 직접 코드를 작성하고 실무 능력을 증명하는 디지털 자격증 수요가 폭증 중입니다.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border-2 border-primary flex-1 shadow-xl transform scale-105 z-10 w-2/3">
            <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-4">
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

export { slidesPart3 }
