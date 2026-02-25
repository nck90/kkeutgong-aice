import { AlertTriangle, BookOpen, Code, CheckCircle2, BrainCircuit } from 'lucide-react'

// Chapter 1: 1-5 (The Agony of AICE Test-Takers)
// Chapter 2: 6-9 (The Core Concept of Kkeutgong)
const slidesPart1 = [
  // 1. Cover
  {
    id: 'cover',
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full text-white px-4 text-center z-10">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-6 text-sm font-medium tracking-widest uppercase">
          AICE 자격증 실전 코딩 특화 학습 앱 '끝공'
        </div>
        <h2 className="text-xl md:text-3xl font-semibold mb-6 text-white/90">
          AICE 단기 합격을 위한 단 하나의 실전 학습 플랫폼
        </h2>
        <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/60">
          끝공
        </h1>
        <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed mt-4">
          막막했던 자격증 공부, 진짜 쳐보며 익히는 14일 챌린지로 끝장내다.
        </p>
      </div>
    ),
    background: 'elice-mesh-gradient',
  },
  // 2. Intro
  {
    id: 'intro-overview',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Overview
        </h3>
        <h2 className="text-5xl font-black mb-10 text-foreground text-center max-w-4xl leading-tight">
          자격증 공부, 시작부터 막막하지 않으세요?
        </h2>
        <div className="max-w-4xl bg-white p-10 rounded-3xl border border-border shadow-xl flex flex-col gap-6">
          <p className="text-2xl leading-[1.8] text-muted-foreground">
            두꺼운 전공 서적을 사자니 부담스럽고, 긴 인터넷 강의는 끝까지 들을 자신이 없습니다.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <p className="text-2xl leading-[1.8] text-foreground font-bold">
              결국 포기하는 진짜 이유. 의지 부족이 아니라, <span className="text-primary">"단기간에 집중 탈환할 내 수준에 맞는 실전 커리큘럼"</span>이 없기 때문입니다.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 3. Pass Rate Reality (Two Column - Left Text, Right Visual)
  {
    id: 'pass-rate-reality',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-destructive font-bold text-xl mb-4 tracking-widest uppercase">
              Background
            </h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3] max-w-2xl">
              합격률 34%의 장벽, 왜 우린 시험에서 무너질까요?
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
              <p>
                AICE를 비롯한 민간 자격증 응시자들은 늘어나지만 합격률은 여전히 30%대에 머뭅니다.
              </p>
              <p>
                시간을 쏟아부어 이론을 암기해도, 막상 시험장(실기/CBT) 환경에 놓이면 익숙하지 않은 백지 화면 트라우마에 얼어붙습니다.
              </p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-lg bg-white p-10 rounded-3xl border border-border shadow-xl">
            <h4 className="font-bold text-2xl mb-8">AICE 정기시험 합격률 추이 예상</h4>
            <div className="flex flex-col gap-6">
              {[
                { y: '2023년', r: '33.73%', v: 33 },
                { y: '2024년', r: '35.28%', v: 35 },
                { y: '2025년', r: '32.38%', v: 32 },
              ].map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-base font-bold mb-2">
                    <span className="text-foreground">{d.y}</span>
                    <span className="text-destructive">{d.r}</span>
                  </div>
                  <div className="w-full bg-muted h-6 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${d.v}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 4. The Reason (Two Column - Left Text, Right Visual)
  {
    id: 'the-reason',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-amber-500 font-bold text-xl mb-4 tracking-widest uppercase">
              The Reality
            </h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3] max-w-2xl">
              이론으로 하는 공부와 실전 코딩 사이의 치명적 괴리
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
              <p>
                파이썬의 Pandas 데이터 전처리나 Scikit-Learn 모델링은 "강사의 눈으로 구경"하는 것으로는 절대 지식이 습득되지 않습니다.
              </p>
              <p>
                직접 에러를 마주하고 손으로 코드를 고치면서 실습하지 않으면, 어떠한 자격증 실기 시험에서도 무조건 백지가 됩니다.
              </p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-xl">
            <div className="bg-white p-10 rounded-3xl border-l-[12px] border-amber-500 shadow-2xl w-full">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="p-4 bg-amber-50 rounded-2xl">
                  <AlertTriangle className="w-10 h-10 text-amber-500" />
                </div>
                <h4 className="text-3xl font-black text-foreground">"눈으로만 코드를 읽습니다"</h4>
              </div>
              <p className="text-xl text-muted-foreground leading-[1.8] mt-6">
                수많은 수험생들이 방대한 텍스트북을 눈으로만 읽다가 실질적인 코딩 구현력을 상실합니다. 코딩은 손의 근육이 기억해야 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FDFDFD]',
  },
  // 5. The Target Persona
  {
    id: 'target-persona',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 bg-[#191F28] text-white text-center">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">
          Target Persona
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[1.3] max-w-4xl">
          100시간을 쏟을 수 없는<br />가장 바쁜 직장인과 학생
        </h2>
        <div className="flex flex-col gap-6 text-2xl text-white/70 max-w-3xl leading-[1.8]">
          <p>
            저희가 집중한 고객은 시간의 가치를 가장 소중하게 생각하는 분들입니다.
          </p>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 inline-block backdrop-blur-sm">
            <p className="text-white font-bold">
              14일. 방대한 이론 대신 "반드시 나오는 개념"과 "실전 코딩 환경"을 최단 경로로 묶어내는 데 모든 것을 걸었습니다.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#191F28]',
  },

  // Chapter 2: The Core Concept of Kkeutgong (6~9장)
  // 6. Solution Concept
  {
    id: 'solution-concept',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 text-center">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">
          Chapter 2. Core Solution
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-12 text-foreground leading-[1.3] max-w-4xl">
          인강 대신 매일 "실전 실습" 타격. 끝공 14일 맞춤 챌린지
        </h2>
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl max-w-4xl w-full mx-auto border-t-[8px] border-t-primary flex flex-col gap-6">
          <p className="text-2xl font-bold text-muted-foreground">
            모니터 앞에서 오랜 시간 인강을 시청한다고 합격하지 않습니다.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl">
            <p className="text-3xl font-black text-primary leading-[1.6]">
              내 트랙에 맞는 커리큘럼을 하루 단 30분이라도
              직접 시스템에서 완성해보는 짜릿함.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 7. Outline Tracks
  {
    id: 'feature-tracks',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 bg-white">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Tailored Tracks
        </h3>
        <h2 className="text-5xl font-bold mb-16 text-foreground text-center">
          나에게 맞는 3단계 AICE 트랙 선택
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] w-full items-stretch">
          <div className="bg-indigo-50 border-2 border-indigo-200 p-10 rounded-[2rem] flex-1 text-center shadow-lg transform hover:-translate-y-2 transition-transform h-[450px] flex flex-col justify-center">
            <div className="bg-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-md">A</div>
            <h4 className="text-3xl font-black text-indigo-900 mb-4">Associate</h4>
            <p className="text-xl text-indigo-800 font-medium mb-4">전공자 및 IT 실무자용</p>
            <p className="text-base text-indigo-700/80 leading-relaxed">Pandas, Scikit-Learn 필수 모듈과 Keras 딥러닝 실기까지 직접 구현하는 14일 파이프라인 마스터</p>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 p-10 rounded-[2rem] flex-1 text-center shadow-2xl transform scale-105 z-10 hover:-translate-y-2 transition-transform h-[450px] flex flex-col justify-center relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>
            <div className="bg-emerald-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-md">B</div>
            <h4 className="text-3xl font-black text-emerald-900 mb-4">Basic</h4>
            <p className="text-xl text-emerald-800 font-medium mb-4">비전공자 초단기 속성</p>
            <p className="text-base text-emerald-700/80 leading-relaxed">복잡한 코드 대신 노코드 도구를 활용하여 빠르게 분류/회귀 개념을 습득하는 14일 하이패스 연성 플랜</p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 p-10 rounded-[2rem] flex-1 text-center shadow-lg transform hover:-translate-y-2 transition-transform h-[450px] flex flex-col justify-center">
            <div className="bg-amber-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-md">J</div>
            <h4 className="text-3xl font-black text-amber-900 mb-4">Junior</h4>
            <p className="text-xl text-amber-800 font-medium mb-4">입문자 및 대학생용</p>
            <p className="text-base text-amber-700/80 leading-relaxed">미래 AI 시대 리터러시를 위한 블록 코딩 기반 기초 AI 튜토리얼 14일 가이드맵</p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 8. Core Philosophy
  {
    id: 'core-philosophy',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h2 className="text-5xl font-bold mb-16 text-foreground text-center">
          단 1개의 웹사이트로 끝내는 All-in-One 생태계
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1400px] w-full">
          {[
            {
              title: '핵심 개념 (Textbook)',
              desc: '데이터분석과 머신러닝 시험에 반드시 나오는 필수 핵심 요약집을 브라우저에 탑재했습니다.',
              icon: <BookOpen className="w-12 h-12 text-primary mb-6" />,
            },
            {
              title: '직접 코딩 (Labs)',
              desc: '귀찮은 파이썬 로컬 환경 구축(Anaconda, Env 세팅) 없이 브라우저에서 바로 실행되는 IDE 파이프라인.',
              icon: <Code className="w-12 h-12 text-primary mb-6" />,
            },
            {
              title: '메타 진단 (Diagnostic)',
              desc: '강의만 수동적으로 듣고 끝나는 것이 아니라, 사전 진단고사를 통해 나의 취약 파트를 수치화합니다.',
              icon: <BrainCircuit className="w-12 h-12 text-primary mb-6" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-3xl border border-border shadow-xl flex flex-col items-start text-left"
            >
              {item.icon}
              <div className="bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                STEP 0{i + 1}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground text-lg leading-[1.7]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 9. No Setup Required (Two Column - Left Text, Right Visual)
  {
    id: 'how-it-works-2',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
          {/* Left Text */}
          <div className="flex-1 w-full text-left">
            <h3 className="text-green-500 font-bold text-xl mb-4 tracking-widest uppercase">
              Zero Configuration
            </h3>
            <h2 className="text-5xl font-bold mb-8 text-foreground leading-[1.3] max-w-2xl">
              복잡한 파이썬 환경 세팅? 그냥 웹으로 접속하세요.
            </h2>
            <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
              <p>
                공부 시작하기도 전에 라이브러리 패키지 꼬임이나 환경 변수 에러로 소중한 의지력을 소모하지 마세요.
              </p>
              <p>
                끝공의 강력한 핵심 무기는 <b>크롬 브라우저 하나면 즉각 반응하여 코드를 수행하는 완벽한 클라우드 샌드박스</b>입니다.
              </p>
            </div>
            <div className="bg-[#191F28] text-white p-6 rounded-2xl mt-8 inline-flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <span className="font-bold text-lg">번거로운 다운로드 없이 1초 만에 실행 준비 완료</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="bg-[#1E1E1E] p-8 rounded-3xl shadow-2xl w-full text-white font-mono text-base flex flex-col relative overflow-hidden ring-1 ring-white/10">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#333]">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-[#888] text-sm ml-2 font-sans font-medium">Terminal - local development conflict scenario</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400 font-bold">user@macbook:~$</span>
                <span className="text-gray-100">pip install xgboost lightgbm</span>
              </div>
              <div className="flex items-center gap-2 mb-4 text-[#A0A0A0]">
                <span>Collecting xgboost...</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-red-400 font-bold break-all">
                <span>ERROR: Could not build wheels for xgboost, which is required to install pyproject.toml-based projects.</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-green-400 font-bold">user@macbook:~$</span>
                <span className="w-2 h-5 bg-white animate-pulse inline-block"></span>
              </div>

              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-red-500/30 to-transparent backdrop-blur-[2px] pointer-events-none"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white font-black text-2xl py-6 px-10 rounded-2xl border-4 border-red-400 shadow-[0_10px_40px_rgba(239,68,68,0.5)] rotate-[-4deg] whitespace-nowrap z-10">
                이 복잡한 세팅에<br />소중한 3일을 허비합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
]

export { slidesPart1 }
