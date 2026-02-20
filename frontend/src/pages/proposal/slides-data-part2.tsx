
// ==========================================
// 📸 Real Shot UI Mockup Components 
// ==========================================

export function ImageMockup({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  return (
    <div className={`flex flex-col rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-[#E5E5E5] p-2 ring-1 ring-black/5 ${className}`}>
      <div className="flex-1 overflow-hidden relative rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] bg-[#191F28]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-left-top"
          loading="lazy"
        />
      </div>
    </div>
  )
}

// Chapter 3: 10-21 (4 Core Features)
const slidesPart2 = [
  // 10. Chapter 3 Intro (Features)
  {
    id: 'chapter-3-intro',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Chapter 3. Real Features
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-foreground text-center">
          자격증 합격을 멱살 잡고 끌고 갈<br />
          끝공의 4가지 실제 무기
        </h2>
        <div className="flex gap-4 max-w-7xl">
          {['01. 14일 커스텀 플랜', '02. AICE 맞춤 개념장', '03. 라이브 코딩 세션', '04. 메타인지 진단'].map(
            (t, i) => (
              <div
                key={i}
                className="bg-white px-6 py-5 rounded-2xl border border-border font-bold text-center flex-1 shadow-md text-foreground flex flex-col justify-between h-32"
              >
                <span className="text-primary/40 text-2xl font-black">{t.split('.')[0]}</span>
                <span className="text-lg">{t.split('.')[1]}</span>
              </div>
            ),
          )}
        </div>
        <p className="mt-12 text-muted-foreground font-bold bg-primary/10 px-6 py-2 rounded-full inline-block">
          * 이어지는 화면들은 프론트엔드에 100% 실기동 중인 실제 UI 캡처본입니다.
        </p>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },

  // 11. Feature 1 Intro
  {
    id: 'feature-1-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-3xl mb-4">Feature 01. 맞춤형 커리큘럼</h3>
        <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
          "시험이 코앞인데, 무엇부터 해야 하죠?"
        </h2>
        <p className="text-2xl text-muted-foreground max-w-5xl leading-relaxed">
          더 이상 계획을 짜느라 시간을 낭비하지 마세요.
          사용자의 목표 트랙과 시험일(D-Day)을 설정하면, 시스템이 알아서 주간(Weekly) 일정과 일일 개념/실습 미션을 자동 분배합니다.
        </p>
      </div>
    ),
    background: 'bg-white',
  },
  // 12. Feature 1 View (Real Dashboard Plan Calendar)
  {
    id: 'feature-1-view',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto">
        <ImageMockup src="/pitch-assets/plan.png" alt="Plan Weekly Calendar" className="w-full h-[650px]" />
      </div>
    ),
    background: 'bg-[#F3F4F6]',
  },

  // 13. Feature 2 Intro
  {
    id: 'feature-2-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-blue-500 font-bold text-3xl mb-4">Feature 02. AICE 맞춤 개념장</h3>
        <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
          두꺼운 수험서 1회독?<br />시험에 나오는 요약 노트를 봅니다.
        </h2>
        <p className="text-2xl text-muted-foreground max-w-5xl leading-relaxed">
          수백 페이지의 파이썬 문법책을 다 볼 필요가 없습니다.
          마치 강사가 옆에서 쪽집게 과외를 해주듯, <b>AICE 시험에 100% 출제되는 DataFrame, sklearn 핵심 개념</b>들만 모바일/PC 텍스트북 뷰어로 제공합니다.
        </p>
      </div>
    ),
    background: 'bg-white',
  },
  // 14. Feature 2 View (Real Textbook View)
  {
    id: 'feature-2-view',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto">
        <ImageMockup src="/pitch-assets/textbook.png" alt="Concept Textbook" className="w-full h-[650px]" />
      </div>
    ),
    background: 'bg-[#F3F4F6]',
  },

  // 15. Feature 3 Intro
  {
    id: 'feature-3-intro',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-green-500 font-bold text-3xl mb-4">Feature 03. 인터랙티브 Live 코딩 실습</h3>
        <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
          눈으로 읽은 코드,<br />
          그 자리에서 바로 손으로 쳐보세요.
        </h2>
        <p className="text-2xl text-muted-foreground max-w-5xl leading-relaxed">
          개념을 암기했다면, AICE 실전 CBT 환경과 <b>동일한 Jupyter 커널</b>이 브라우저에서 열립니다.
          학습(Textbook) {'->'} 실습(Labs) {'->'} 테스트(Session)로 끊김없이 이어지는 완전한 러닝 파이프라인.
        </p>
      </div>
    ),
    background: 'bg-white',
  },
  // 16. Feature 3 View (Real Labs IDE View)
  {
    id: 'feature-3-view-dummy',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto">
        <ImageMockup src="/pitch-assets/labs.png" alt="Curriculum Labs List" className="w-full h-[650px]" />
      </div>
    ),
    background: 'bg-[#191F28]',
  }
]

export { slidesPart2 }
