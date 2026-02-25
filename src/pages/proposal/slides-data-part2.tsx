import { ImageMockup } from './ui-mockups';

// ==========================================
// Chapter 3: 4 Core Features (Merged Text + Visual)
// ==========================================

const slidesPart2 = [
  // 10. Chapter 3 Intro (Features)
  {
    id: 'chapter-3-intro',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Chapter 3. Real Features
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-foreground text-center leading-[1.3]">
          자격증 합격을 멱살 잡고 끌고 갈<br />
          끝공의 4가지 실제 무기
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl w-full">
          {['01. 14일 커스텀 플랜', '02. AICE 맞춤 개념장', '03. 라이브 코딩 세션', '04. 메타인지 진단'].map(
            (t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-border shadow-xl text-center flex flex-col justify-center gap-4 transition-transform hover:-translate-y-2"
              >
                <div className="text-primary/40 text-4xl font-black">{t.split('.')[0]}</div>
                <div className="text-xl font-bold text-foreground">{t.split('.')[1]}</div>
              </div>
            ),
          )}
        </div>
        <p className="mt-16 text-primary font-bold bg-primary/10 px-6 py-2 rounded-full inline-block tracking-widest uppercase text-sm">
          * 이어지는 화면들은 개발 완료된 실제 프론트엔드 UI 컴포넌트입니다.
        </p>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // 11. Feature 1: Plan
  {
    id: 'feature-1',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">Feature 01. 맞춤형 커리큘럼</h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3]">
              "시험이 코앞인데, 무엇부터 해야 하죠?"
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl break-keep">
              <p>
                더 이상 엑셀로 단계를 쪼개며 계획을 짜느라 <b>시간을 낭비하지 마세요.</b>
              </p>
              <p>
                사용자의 목표 트랙과 시험일(D-Day)을 설정하면 시스템이 지시하는 가이드를 그대로 따르기만 하면 됩니다.
              </p>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                <p className="text-foreground font-bold leading-relaxed">
                  주간(Weekly) 일정과 일일 개념/실습 미션이 완벽하게 분할된 <br /><span className="text-primary tracking-tight">가장 완벽한 14일 패스트트랙 플랜</span>을 AI가 자동 분배합니다.
                </p>
              </div>
            </div>
          </div>
          {/* Right Visual */}
          <div className="flex-[1.2] w-full max-w-3xl">
            <ImageMockup src="/pitch-assets/plan.png" alt="Plan Weekly Calendar" className="w-full h-[600px] text-left" />
          </div>
        </div>
      </div>
    ),
    background: 'bg-white',
  },

  // 12. Feature 2: Textbook
  {
    id: 'feature-2',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-blue-500 font-bold text-xl mb-4 tracking-widest uppercase">Feature 02. AICE 맞춤 개념장</h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3]">
              두꺼운 수험서 1회독?<br />시험에 나오는 요약 노트를 봅니다.
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl break-keep">
              <p>
                수백 페이지의 무거운 <b>파이썬 문법책 전권</b>을 다 볼 필요가 없습니다.<br />실전 시험에서는 <b>쓰는 문법만 씁니다.</b>
              </p>
              <p className="leading-relaxed">
                마치 강사가 매 질문 옆에서 쪽집게 과외를 해주듯, <br /><b>AICE 시험에 100% 출제되는 Pandas 전처리와 Scikit-Learn 모델링 핵심 개념</b>만 담은 고품질 텍스트북 포맷을 제공합니다.
              </p>
            </div>
          </div>
          {/* Right Visual */}
          <div className="flex-[1.2] w-full max-w-3xl">
            <ImageMockup src="/pitch-assets/textbook.png" alt="Concept Textbook" className="w-full h-[600px] text-left" />
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // 13. Feature 3: Labs IDE
  {
    id: 'feature-3',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-green-500 font-bold text-xl mb-4 tracking-widest uppercase">Feature 03. 인터랙티브 Live 코딩</h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3]">
              눈으로 읽은 코드,<br />그 자리에서 바로 손으로 쳐보세요.
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl break-keep">
              <p>
                개념을 암기했다면 이제 손이 기억할 차례입니다.<br />뷰어 옆에 AICE 실전 CBT 환경과 <b>동일한 서버리스 Jupyter 커널</b>이 터미널과 함께 브라우저에서 즉각 열립니다.
              </p>
              <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20 text-green-900 font-bold text-left">
                학습(Textbook) ➔ 실습(Labs) ➔ 채점(Grading)으로 이어지는<br />
                앱 이탈률 0%의 완전한 러닝 파이프라인.
              </div>
            </div>
          </div>
          {/* Right Visual */}
          <div className="flex-[1.2] w-full max-w-3xl">
            <ImageMockup src="/pitch-assets/labs.png" alt="Curriculum Labs List" className="w-full h-[600px] text-left" />
          </div>
        </div>
      </div>
    ),
    background: 'bg-white',
  }
]

export { slidesPart2 }
