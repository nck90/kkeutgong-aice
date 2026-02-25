import { BarChart, Search, BrainCircuit, MessageSquare } from 'lucide-react'
import { ImageMockup } from './ui-mockups'

// Chapter 4 & 5
const slidesPart3 = [
  // 17. Feature 4: Diagnostic
  {
    id: 'feature-4',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-amber-500 font-bold text-xl mb-4 tracking-widest uppercase">
              Feature 04. 메타인지 대시보드 및 약점 진단
            </h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3] max-w-2xl">
              "내 실력이 어느 정도인지<br />데이터로 객관화합니다"
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
              <p>
                학습 시작 전 <b>사전 진단고사(Diagnostic)</b>를 통해 정확한 내 위치를 파악하고,
                매일 주어지는 미션을 통해 나의 취약 파트를 수치화된 리포트로 관리받습니다.
              </p>
              <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-amber-900 font-bold flex items-start gap-4">
                <BarChart className="w-8 h-8 text-amber-600 shrink-0" />
                <div>
                  감으로 하는 공부는 필패합니다.<br />
                  끝공은 유저의 코딩 정답률 데이터를 기반으로 가장 시급한 파트부터 타격하도록 커리큘럼을 실시간으로 우회합니다.
                </div>
              </div>
            </div>
          </div>
          {/* Right Visual */}
          <div className="flex-[1.2] w-full max-w-3xl">
            <ImageMockup src="/pitch-assets/diagnostic.png" alt="Diagnostic Dashboard" className="w-full h-[600px] text-left" />
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // Chapter 4: Elevating AI Capabilities
  {
    id: 'chapter-4-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Chapter 4. Elevating AI Capabilities
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-foreground max-w-5xl leading-tight text-center mx-auto">
          자격증은 끝이 아니라 시작입니다.
        </h2>
        <div className="bg-white p-10 rounded-3xl border border-border shadow-xl max-w-4xl mx-auto mt-8">
          <p className="text-2xl text-muted-foreground leading-[1.8] text-center">
            끝공의 진짜 목표는 단순한 종이 조각이 아닙니다.
            <br />단 한 번이라도 Jupyter에서 데이터를 다뤄보고 예외(에러)를 처리해 본 감각. 그 AI 리터러시를 수험생의 머리와 손에 강력하게 각인시킵니다.
          </p>
        </div>
      </div>
    ),
    background: 'bg-[#F9FAFB]',
  },

  // 24. AI Tutor
  {
    id: 'ai-tutor',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-bold mb-12 text-foreground text-center">
          언제든 물어볼 수 있는 <span className="text-primary">단독 AI 튜터</span>
        </h2>
        <div className="bg-white border border-border p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-12 max-w-6xl mx-auto items-center">
          <div className="bg-primary/10 p-10 rounded-full border border-primary/20 flex-shrink-0 relative">
            <BrainCircuit className="w-24 h-24 text-primary animate-bounce shadow-[0_0_30px_rgba(115,83,234,0.4)] rounded-full" />
            <div className="absolute top-4 right-0 bg-white p-3 rounded-full shadow-lg border border-border">
              <MessageSquare className="w-8 h-8 text-blue-500 fill-blue-500/20" />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 p-6 rounded-2xl mb-6 relative w-max max-w-full">
              <p className="text-2xl font-bold text-foreground">
                "선생님, 이 pandas 코드에서 왜 KeyError가 나나요?"
              </p>
              <div className="absolute -left-4 top-1/2 -mt-3 w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-gray-100 border-b-[10px] border-b-transparent"></div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed pl-4 border-l-4 border-primary">
              에러 때문에 진도가 막히면 1:1 대화형 챗봇에게 곧바로 질문하세요. 단순히 구글링을 대신하는 것이 아니라,
              수험생이 풀고 있는 문항과 <b>작성한 파이썬 코드를 AI가 실시간으로 같이 읽으며</b> 과외 강사처럼 힌트를 제시합니다.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-white',
  },

  // Chapter 5: Market & Competitors
  {
    id: 'chapter-5-intro',
    content: (
      <div className="flex flex-col justify-center items-center text-center h-full w-full px-12 md:px-24 bg-[#111] text-white">
        <h3 className="text-primary font-bold text-xl mb-6 tracking-widest uppercase">
          Chapter 5. The Competitive Edge
        </h3>
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.2]">
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
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 box-border">
        <h2 className="text-5xl font-black mb-16 text-foreground flex items-center justify-center gap-4 text-center">
          <Search className="w-12 h-12 text-blue-500" /> '코딩 실습형' 민간 자격증의 블루오션
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] items-stretch w-full justify-center">
          <div className="bg-white p-10 rounded-3xl border border-border flex-1 shadow-md">
            <h4 className="text-2xl font-bold mb-6">데이터 리터러시 시대</h4>
            <p className="text-lg text-muted-foreground leading-relaxed">
              더 이상 암기식 자격증이 대우받지 않습니다. AICE를 필두로, 직접 코드를 작성하고 실무 능력을 방증하는 디지털 역량 검정 자격증 수요가 B2B/B2C 할 것 없이 폭증 중입니다.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl border-2 border-primary flex-[1.5] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10"></div>
            <div className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full w-max mb-6 tracking-widest uppercase">
              경쟁자의 한계
            </div>
            <h4 className="text-3xl font-black text-primary mb-6">[인프라 구축]의 장벽</h4>
            <p className="text-foreground text-xl leading-relaxed font-bold mb-6">
              아무나 "AICE 대비 앱"을 외칠 수는 있습니다. O/X 문항만 텍스트로 띄워주면 되니까요.
            </p>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed">
                하지만 끝공처럼 "브라우저에 Jupyter 커널을 이식하여 파이썬 코드를 1초 만에 실행/채점"해주는 <b>클라우드 컴파일러 서버 환경</b>은
                막대한 클라우드 인프라 이해도와 파이프라인 설계기가 필요합니다.<br /><br />
                가벼운 마음으로 접근하는 선발/후발주자들이 감히 넘볼 수 없는 강력한 기술적 해자(Moat)입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
]

export { slidesPart3 }
