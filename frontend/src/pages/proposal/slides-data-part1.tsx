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
        <h2 className="text-5xl font-black mb-10 text-foreground text-center">
          자격증 공부, 시작부터 막막하지 않으세요?
        </h2>
        <div className="max-w-4xl bg-white p-10 rounded-3xl border border-border shadow-xl">
          <p className="text-2xl leading-relaxed text-muted-foreground mb-6">
            두꺼운 전공 서적을 사자니 부담스럽고, 긴 인터넷 강의는 끝까지 들을 자신이 없습니다.
          </p>
          <p className="text-2xl leading-relaxed text-muted-foreground font-bold text-foreground">
            결국 포기하는 진짜 이유.
            <br />
            의지 부족이 아니라, <span className="text-primary">단기간에 집중 타격할 "내 수준에 맞는 실전 커리큘럼"</span>이 없기 때문입니다.
          </p>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 3. Pass Rate Reality
  {
    id: 'pass-rate-reality',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-destructive font-bold text-xl mb-4 tracking-widest uppercase">
          Background
        </h3>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-6 text-foreground leading-tight">
              합격률 34%의 장벽<br />
              왜 우린 시험에서 무너질까요?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              AICE를 비롯한 민간 자격증 응시자들은 늘어나지만 합격률은 여전히 30%대에 머뭅니다.
              시간을 쏟아부어 이론을 암기해도, 막상 시험장(실기/CBT) 환경에 놓이면 얼어붙습니다.
            </p>
          </div>

          <div className="flex-1 bg-white p-8 rounded-3xl border border-border shadow-md w-full">
            <h4 className="font-bold text-xl mb-6">최근 AICE 자격증 합격률 추이 예상</h4>
            <div className="space-y-4">
              {[
                { y: '2023년', r: '33.73%', v: 33 },
                { y: '2024년', r: '35.28%', v: 35 },
                { y: '2025년', r: '32.38%', v: 32 },
              ].map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span className="text-foreground">{d.y}</span>
                    <span className="text-destructive">{d.r}</span>
                  </div>
                  <div className="w-full bg-muted h-6 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full"
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
    background: 'bg-white',
  },
  // 4. The Reason
  {
    id: 'the-reason',
    content: (
      <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
        <h3 className="text-amber-500 font-bold text-xl mb-4 tracking-widest uppercase">
          The Reason
        </h3>
        <h2 className="text-5xl font-bold mb-12 text-foreground text-center max-w-5xl leading-tight">
          이론(눈)으로 하는 공부와
          <br />
          실전(손) 코딩 사이의 치명적 괴리
        </h2>
        <div className="bg-white p-10 rounded-3xl border-l-[12px] border-amber-500 shadow-xl max-w-4xl w-full">
          <h4 className="text-3xl font-bold mb-6 flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" /> "눈으로만 코드를 읽습니다"
          </h4>
          <p className="text-xl text-muted-foreground leading-relaxed">
            파이썬의 Pandas 데이터 전처리나 Scikit-Learn 모델링은 "강사의 시연"을 구경하는 것으로는 절대 습득되지 않습니다.
            <b>직접 에러를 내보고 손으로 실습</b>하지 않으면 실전 CBT(컴퓨터 기반 시험)에서 무조건 백지가 됩니다.
          </p>
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
        <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
          "학습에 100시간을 쏟을 수 없는<br />가장 효율적인 직장인과 학생"
        </h2>
        <p className="text-2xl text-white/70 max-w-4xl leading-relaxed">
          저희가 집중한 고객은 시간의 가치를 아는 분들입니다.
          <br />
          14일. 방대한 이론 대신 **"반드시 나오는 개념"**과 **"실전 코딩 환경"**을 최단 경로로 제공하는 데 올인했습니다.
        </p>
      </div>
    ),
    background: 'bg-[#191F28]',
  },

  // Chapter 2: The Core Concept of Kkeutgong (6~9장)
  // 6. Solution Concept
  {
    id: 'solution-concept',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase">
          Chapter 2. Core Solution
        </h3>
        <h2 className="text-5xl md:text-6xl font-black mb-12 text-foreground leading-tight">
          인강 вместо, "실전 실습"으로.<br />
          끝공 14일 맞춤 챌린지
        </h2>
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-6xl w-full mx-auto text-center border-t-8 border-t-primary">
          <p className="text-3xl font-bold text-muted-foreground mb-6">
            긴 시간 앉아있는다고 합격하지 않습니다.
          </p>
          <p className="text-4xl font-black text-primary">
            내 트랙에 맞는 커리큘럼을, 단 하루 30분이라도 직접 손으로 짜보는 것.
          </p>
        </div>
      </div>
    ),
    background: 'bg-[#FAFAFA]',
  },
  // 7. Outline Tracks
  {
    id: 'feature-tracks',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 bg-white">
        <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
          Tailored Tracks
        </h3>
        <h2 className="text-5xl font-bold mb-16 text-foreground text-center">
          나에게 맞는 3단계 AICE 트랙 선택
        </h2>
        <div className="flex gap-8 max-w-6xl mx-auto w-full">
          <div className="bg-indigo-50 border-2 border-indigo-200 p-8 rounded-3xl flex-1 text-center shadow-lg transform hover:-translate-y-2 transition-transform">
            <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6">A</div>
            <h4 className="text-2xl font-black text-indigo-900 mb-2">Associate</h4>
            <p className="text-indigo-800 font-medium mb-4">전공자 및 IT 실무자용</p>
            <p className="text-sm text-indigo-700/80 mb-6">Python 기반 데이터/모델링 14일 플랜</p>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 p-8 rounded-3xl flex-1 text-center shadow-lg transform scale-105 z-10 hover:-translate-y-2 transition-transform">
            <div className="bg-emerald-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6">B</div>
            <h4 className="text-2xl font-black text-emerald-900 mb-2">Basic</h4>
            <p className="text-emerald-800 font-medium mb-4">비전공자 단기 속성</p>
            <p className="text-sm text-emerald-700/80 mb-6">노코드 분석에서 개념을 잡는 14일 플랜</p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-3xl flex-1 text-center shadow-lg transform hover:-translate-y-2 transition-transform">
            <div className="bg-amber-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6">J</div>
            <h4 className="text-2xl font-black text-amber-900 mb-2">Future / Junior</h4>
            <p className="text-amber-800 font-medium mb-4">입문자 및 학생용</p>
            <p className="text-sm text-amber-700/80 mb-6">블록 코딩 기반 기초 AI 튜토리얼</p>
          </div>
        </div>
      </div>
    ),
    background: 'bg-white',
  },
  // 8. Core Philosophy
  {
    id: 'core-philosophy',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-foreground text-center">
          단 1개의 웹사이트로 끝내는<br />
          All-in-One AICE 생태계
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '핵심 개념 (Textbook)',
              desc: '시험에 나오는 필수 개념 요약집 브라우저 탑재',
              icon: <BookOpen className="w-10 h-10 text-primary mb-4" />,
            },
            {
              title: '인터랙티브 파이썬 (Labs)',
              desc: '별도 환경 구축(Anaconda 등) 없이 브라우저에서 실행되는 웹 IDE',
              icon: <Code className="w-10 h-10 text-primary mb-4" />,
            },
            {
              title: '메타인지와 진단고사',
              desc: '내 수준을 정확히 파악하고 약점을 메우는 D-DAY 스케줄링',
              icon: <BrainCircuit className="w-10 h-10 text-primary mb-4" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-border shadow-md flex flex-col items-center text-center"
            >
              {item.icon}
              <div className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full mb-3">
                STEP 0{i + 1}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    background: 'bg-white',
  },
  // 9. No Setup Required
  {
    id: 'how-it-works-2',
    content: (
      <div className="flex flex-col justify-center h-full w-full px-12 md:px-24">
        <h3 className="text-green-500 font-bold text-xl mb-4 tracking-widest uppercase">
          Zero Configuration
        </h3>
        <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
          복잡한 파이썬 세팅?<br />그냥 접속하세요.
        </h2>
        <p className="text-2xl text-muted-foreground mb-12">
          공부 시작하기도 전에 '라이브러리 패키지 꼬임'이나 'CUDA에러'로 지치지 마세요.<br />
          끝공의 핵심 무기는 바로 <b>웹 브라우저 하나면 즉시 구동되는 완벽한 클라우드 Jupyter 샌드박스</b>입니다.
        </p>

        <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-[#333] shadow-2xl max-w-5xl text-white font-mono text-lg flex flex-col mx-auto w-full">
          <div className="text-[#D4D4D4] mb-6 border-b border-[#333] pb-4">
            Terminal / Console - Powered by 끝공 Serverless
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">root@kkeutgong:~$</span>
            <span className="text-white">python -m venv aice_env</span>
          </div>
          <div className="flex items-center gap-2 mb-2 opacity-30">
            <span className="text-gray-400">↳ 로컬 환경 충돌 방지 세팅 중...</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">root@kkeutgong:~$</span>
            <span className="text-white">pip install pandas scikit-learn jupyter</span>
          </div>
          <div className="flex items-center gap-2 mb-6 opacity-30">
            <span className="text-gray-400">↳ 의존성 설치 중...</span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-xl border-2 border-red-500 flex items-center justify-center text-red-200 font-bold text-2xl z-10 px-8 py-10 transform -rotate-2">
              이 짓을 하다가 3일을 버립니다.
            </div>
          </div>

          <div className="bg-primary/20 text-primary-foreground p-4 rounded-xl mt-12 border border-primary/30 flex items-center gap-2 font-sans font-bold shadow-[0_0_15px_rgba(115,83,234,0.3)]">
            <CheckCircle2 className="w-5 h-5" /> 크롬/사파리로 끝공 URL만 치면 모든 백엔드 환경이 1초 만에 구성됩니다.
          </div>
        </div>
      </div>
    ),
    background: 'bg-[#F3F4F6]',
  },
]

export { slidesPart1 }
