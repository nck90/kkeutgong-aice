끝공 AICE Prep
AICE 전용 상세 화면명세서 v2.1 (전 트랙: Future/Junior/Basic/Associate/Professional)

문서명: 끝공 AICE Prep – AICE 전 트랙 상세 화면명세서

버전: v2.1

대상: 기획/개발/QA/운영

목적: AICE의 5단계 등급(Future, Junior, Basic, Associate, Professional)별 상이한 시험 환경(블록코딩, GUI, 파이썬)을 통합 지원하되, MVP 구현은 Associate 우선으로 진행하기 위한 화면/동작 정의

범위 기준(의사결정):

- 아키텍처/데이터 모델은 멀티트랙(5단계) 확장 가능하게 설계
- 기능 구현 우선순위는 Associate 트랙(Python/Jupyter)
- Future/Junior/Basic/Professional은 로드맵 반영(Phase 2+)

0. 설계 원칙 (AICE 맞춤 핵심)

노트북/셀 기반 UX가 핵심 기능(Associate/Professional 기준)

시험이 “문항 풀이”가 아니라 “Jupyter Lab 흐름 완주”이므로, Lab 플레이어가 제품의 중심이다.

답안 제출 규칙(변수명/셀 위치/가이드 준수)이 기능으로 존재

“답안03 변수에 저장” 같은 규칙을 제품이 체크하고 안내해야 AICE 전용이 된다.

시험 정책(오픈북, 참고 제한, 도움 기능 제한)을 ‘모드’로 구현

연습(Practice) / 준실전(Practice+) / 모의(Mock) / 시험지(Exam Sheet View) 모드가 명확히 구분되어야 한다.

‘실수 교정(오류 패턴)’ 화면이 핵심 학습 동선

0.1 멀티 엔진(Multi-Engine) 아키텍처

AICE 등급별로 실행 환경이 다르므로, Lab 플레이어는 트랙에 따라 엔진을 교체해야 한다.
- Future: Blockly/Scratch 엔진 ("AI Codiny" 스타일)
- Junior/Basic: No-Code GUI ML 엔진 ("AIDU ez" 스타일)
- Associate/Pro: Jupyter Lab 엔진 (Python/Notebook 스타일)

1. IA 및 메뉴 구조 (AICE 전용)
1.1 사용자 영역(학습자)

상단 글로벌 메뉴(PC 기준)

AICE 홈

내 플랜

실습 Labs

모의시험

실수 교정

참고문서(허용문서)

대시보드

설정

1.2 관리자 영역(운영/CMS)

콘텐츠 관리

Labs

Notebook 템플릿(시험지형)

Datasets

채점기준(GradingSpec)

오류코드/피드백 라이브러리

정책/모드

오픈북/참고 제한 정책

모의시험 정책(시간/힌트/재시도)

배포/버전

Publish / 롤백 / 버전 고정

분석(최소)

스텝 FAIL 분포, 오류 Top, 완주율

2. 화면 ID 체계

사용자 화면: U-AICE-###

모달/팝업: M-AICE-###

관리자 화면: A-AICE-###

시스템 공통: S-COM-###

각 화면에 다음 항목을 고정 포맷으로 제공:

화면ID / 화면명 / URL / 권한 / 목적

진입 조건(Entry) / 이탈 조건(Exit)

UI 구성(영역/컴포넌트)

주요 액션(버튼/이벤트)

데이터 입력/검증

상태(로딩/빈값/에러/제약)

특이사항(AICE 정책/시험지 모드 관련)

3. 전체 화면 목록(요약)
3.1 인증/공통

U-AICE-001 로그인 /login

U-AICE-002 회원가입 /signup

U-AICE-003 비밀번호 재설정 /reset-password

S-COM-901 404

S-COM-902 500/장애 안내

S-COM-903 점검 안내

3.2 AICE 온보딩/프로필

U-AICE-010 AICE 시작(트랙 선택) /aice

U-AICE-011 시험 프로필 설정(1/3) /aice/onboarding/profile

U-AICE-012 가용시간/일정 설정(2/3) /aice/onboarding/schedule

U-AICE-013 정책/모드/참고 설정(3/3) /aice/onboarding/policy

U-AICE-014 초기 진단(선택) /aice/diagnostic

3.3 플랜(시험일까지 운영)

U-AICE-020 내 플랜(캘린더) /aice/plan

U-AICE-021 일자 상세(오늘의 훈련) /aice/plan/day/:date

U-AICE-022 주간 리포트/조정(플랜 튜닝) /aice/plan/weekly

M-AICE-201 리플래닝 확인 모달

M-AICE-202 Task 미루기/재배치 모달

M-AICE-203 압축 플랜 경고 모달

3.4 Labs(실습)

U-AICE-030 Lab 홈(카테고리) /aice/labs

U-AICE-031 Lab 목록(필터/검색) /aice/labs/list

U-AICE-032 Lab 상세 /aice/labs/:labId

U-AICE-033 세션 생성/환경 체크 /aice/labs/:labId/start

U-AICE-040 Lab 플레이어(연습/시험지) /aice/session/:sessionId

U-AICE-041 제출 결과/리뷰 /aice/session/:sessionId/review

M-AICE-301 제출(스텝) 확인 모달

M-AICE-302 최종제출 확인 모달

M-AICE-303 정책 위반 경고 모달

M-AICE-304 세션 종료 확인 모달

M-AICE-305 임시저장 완료 토스트/모달

3.5 모의시험(Mock)

U-AICE-050 모의시험 홈 /aice/mock

U-AICE-051 모의시험 선택/설정 /aice/mock/setup

U-AICE-052 모의시험 규칙 동의 /aice/mock/consent

U-AICE-053 모의시험 실행(시험지 모드 고정) /aice/mock/session/:sessionId

U-AICE-054 모의시험 결과 리포트 /aice/mock/session/:sessionId/result

M-AICE-401 시간 종료 안내 모달

M-AICE-402 모의시험 중단 확인 모달

3.6 실수 교정(Mistakes)

U-AICE-060 실수 교정 홈 /aice/mistakes

U-AICE-061 내 오류 패턴 상세 /aice/mistakes/:errorCode

U-AICE-062 교정 드릴 실행 /aice/mistakes/drill/:drillId

3.7 참고문서(허용문서/오픈북)

U-AICE-070 허용문서 목록 /aice/reference

U-AICE-071 문서 뷰어(내장) /aice/reference/:docId

U-AICE-072 정책별 허용 범위 안내 /aice/reference/policy

3.8 대시보드/설정

U-AICE-080 대시보드(Ready Index) /aice/dashboard

U-AICE-081 학습 로그/진행 히스토리 /aice/dashboard/history

U-AICE-090 설정 /aice/settings

U-AICE-091 시험 프로필 변경 /aice/settings/profile

U-AICE-092 일정/가용시간 변경 /aice/settings/schedule

U-AICE-093 정책/모드 변경 /aice/settings/policy

3.9 관리자(CMS)

A-AICE-100 관리자 로그인 /admin/login

A-AICE-110 관리자 홈 /admin

A-AICE-120 Labs 목록 /admin/labs

A-AICE-121 Lab 생성/편집 /admin/labs/:labId

A-AICE-122 Notebook 템플릿 관리 /admin/notebooks

A-AICE-123 Dataset 관리 /admin/datasets

A-AICE-124 GradingSpec 관리 /admin/grading

A-AICE-125 오류코드/피드백 관리 /admin/errors

A-AICE-130 정책 관리 /admin/policy

A-AICE-140 배포/버전 관리 /admin/releases

A-AICE-150 운영 분석(최소) /admin/analytics

4. 사용자 화면 상세 명세
U-AICE-010 AICE 시작(트랙 선택)

URL: /aice

권한: USER

목적: AICE 학습 모드 진입 및 트랙 선택, 기존 프로필/플랜 상태 안내

UI 구성

상단: “AICE 준비 시작” 헤더

카드 (트랙 선택):

1. Future (초등/입문)
- 엔진: 블록코딩 (Blockly)
- 급수: 1/2/3급

2. Junior (중고등)
- 엔진: No-Code GUI (AIDU ez 스타일)
- 특징: AI 원리 + 실습

3. Basic (비전공 성인)
- 엔진: No-Code GUI (AIDU ez 스타일)
- 특징: 업무 적용 + AutoML

4. Associate (준/전공자) [Main]
- 엔진: Python (Jupyter)
- 특징: EDA/전처리/모델링 코딩

5. Professional (전문가) [Coming Soon]
- 엔진: Python (Jupyter)
- 특징: 심화 모델링

상태 카드:

“시험일까지 D-XX”

“Ready Index”

“오늘 할 훈련 3개” (바로가기)

주요 액션

[Associate 시작] → 온보딩 미완료 시 /aice/onboarding/profile, 완료 시 /aice/plan

[진단 시작] → /aice/diagnostic

상태/예외

ExamProfile 없음 → 온보딩 CTA 강조

플랜 없음 → “플랜 생성” CTA

U-AICE-011 시험 프로필 설정(1/3)

URL: /aice/onboarding/profile

목적: 시험 레벨/시험일/목표 정의

입력 항목

시험 레벨: Future / Junior / Basic / Associate / Professional (드롭다운)

시험일(D-day): DatePicker

목표:

“합격 우선(완주율 중심)”

“고득점 우선(모의 반복)”

“실무형 강화(해석/리포트 강화)”

검증

시험일은 오늘 이후만 허용

시험일이 너무 임박(D-3 등) 시 “압축 플랜” 경고 노출(다음 단계에서도 표시)

액션

[다음] → /aice/onboarding/schedule

U-AICE-012 가용시간/일정 설정(2/3)

URL: /aice/onboarding/schedule

목적: 자동 커리큘럼 편성을 위한 학습 가능 시간 정의

입력 방식(토글)

주간 총 학습시간(시간/분)

요일별 학습시간(월~일 분 단위)

추가 옵션

학습 선호 시간대(오전/오후/야간) (플랜 배치 가중치)

휴무일/불가일 캘린더 지정

액션

[이전] / [다음] → /aice/onboarding/policy

U-AICE-013 정책/모드/참고 설정(3/3)

URL: /aice/onboarding/policy

목적: AICE 전용 “정책 시뮬레이션”과 학습 모드 기본값 설정

핵심 설정

기본 학습 모드

Practice: 힌트/피드백 상세

Practice+: 피드백 요약 + 일부 힌트 제한

Mock: 시간 제한 + 힌트 제한 + 참고 제한

오픈북/참고 정책(설정형)

“전체 웹 참조 허용(연습용)”

“허용문서만 참조(실전 유사)”

“참고 금지(초강화)”

답안 규칙 강제 옵션

“답안 변수명 강제 체크” ON/OFF (권장 ON)

“지정 셀 외 작성 방지” ON/OFF (권장 ON)

액션

[플랜 생성] → 생성 후 /aice/plan

상태/예외

정책이 “허용문서만”인 경우 /aice/reference 안내 배너 제공

U-AICE-014 초기 진단(선택)

URL: /aice/diagnostic

목적: AICE 파이프라인 기반 최소 진단 후 플랜 개인화(취약영역 우선 배치)

구성

미니 진단(10~15분)

pandas 로딩/기초

결측/이상치 처리 이해

train_test_split/스케일링 개념

MAE 등 평가 지표 이해

그래프 해석 1문항

결과

스텝별 준비도(EDA/전처리/모델/평가/시각화)

취약 Top3 → 플랜 재생성 시 반영 옵션

5. 플랜 화면 상세 명세 (AICE 전용 “문항 흐름” 중심)
U-AICE-020 내 플랜(캘린더)

URL: /aice/plan

목적: 시험일까지 AICE 파이프라인 훈련을 일 단위로 운영

상단 요약 바

D-day 카운트

오늘 모드(Practice/Mock 등)

오늘의 정책(참고 제한)

Ready Index

[리플래닝] 버튼

캘린더 카드(일자) 구성

오늘의 “파이프라인 흐름” 요약(예: EDA→전처리→평가)

오늘 할 Lab/드릴 개수

“시험지 모드” 배지(그 날의 훈련이 시험지 모드일 때)

미완료 누적 경고 배지

주요 액션

날짜 클릭 → /aice/plan/day/:date

[리플래닝] → M-AICE-201 확인 → 실행

상태/예외

플랜 미생성: 온보딩 이동

시험일 임박 + 가용시간 부족: 압축 플랜 배너 + M-AICE-203

U-AICE-021 일자 상세(오늘의 훈련)

URL: /aice/plan/day/:date

목적: 오늘 수행해야 할 “AICE 흐름 훈련” 실행

화면 구성

헤더: 날짜 / 총 할당 시간 / 완료율

“오늘의 시험 규칙” 카드

오늘 모드(Practice/Mock)

참고 제한(허용문서만/전체)

답안 변수명 체크 ON/OFF

Task 리스트(카드)

Task 카드 표준

타입: Drill / Lab / Review / Mock

제목: AICE 전처리 훈련: 결측치+인코딩

예상 소요 시간

난이도

상태: TODO/DONE/SKIPPED

버튼:

[시작]

[완료]

[미루기]

액션

[시작]

Drill/Review: 간단 학습 화면(텍스트+퀴즈) 또는 바로 완료

Lab/Mock: 세션 생성 후 플레이어 이동

[미루기] → M-AICE-202 날짜 선택

[완료] 즉시 이행률 반영, Ready Index 갱신 트리거

U-AICE-022 주간 리포트/조정

URL: /aice/plan/weekly

목적: “이번주 완주율/실수 패턴” 기반으로 다음주 계획 조정(사용자 주도)

구성

이번주 이행률, Lab PASS율

오류 Top5(실수 교정으로 바로가기)

다음주 추천 조정 버튼

“전처리 비중 증가”

“모의 1회 추가”

“시각화 교정 추가”

6. Lab 화면 상세 명세 (AICE 실습 중심)
U-AICE-030 Lab 홈(카테고리)

URL: /aice/labs

목적: AICE 트랙별 출제 흐름에 맞춘 훈련 카테고리 진입 (MVP는 Associate 우선)

카테고리 예시

파이프라인 완주(Full Pipeline)

EDA + 해석(그래프/선택)

전처리(결측/이상치/인코딩)

분리/스케일링

모델링/평가(MAE/MSE)

시각화 결과 제출(그래프 조건)

U-AICE-031 Lab 목록

URL: /aice/labs/list

필터

유형: 회귀/분류/시계열(로드맵 노출)

난이도

소요시간

시험지 모드 가능 여부

카드 구성

제목

목표(1줄)

스텝 수

예상시간

“시험지 모드 제공” 배지

U-AICE-032 Lab 상세

URL: /aice/labs/:labId

목적: Lab 목표/조건/채점기준 개요 확인 후 시작

구성

Lab 개요(무엇을 만들고 무엇으로 채점하는지)
엔진 타입(Block / GUI / Jupyter) 표시

“AICE 규칙” 박스

답안 변수명 사용 여부

지정 셀 작성 규칙

참고 제한 모드 지원 여부

스텝 체크리스트(1..N)

데이터 설명(컬럼 리스트/타입/결측치 가능성 등)

버튼

[연습 모드로 시작]

[시험지 모드로 시작]

[모의시험으로 시작] (정책에 따라 활성)

U-AICE-033 세션 생성/환경 체크

URL: /aice/labs/:labId/start

목적: 세션 생성 전 정책/모드/제약 확인 + 동의

구성

모드 선택(Practice/Practice+/Mock)

정책 요약

참고 제한

힌트 제한

재제출 제한

시간 제한(모의일 때)

체크박스 동의

“규칙을 읽고 이해했습니다”

버튼

[세션 시작]

7. AICE 핵심 화면: Lab 플레이어(시험지/연습 통합)
U-AICE-040 Lab 플레이어

URL: /aice/session/:sessionId

목적: AICE 실습 흐름 수행 + 셀 실행 + 스텝 제출/채점 + 피드백

7.1 레이아웃(PC 기준)

Top Bar(고정)

세션명 / 모드(Practice/Mock) / 정책 아이콘(참고 제한)

타이머(Mock)

[임시저장] [최종제출] [나가기]

Left Panel

스텝 네비게이션(1..N)

상태: LOCK/OPEN/PASS/FAIL

“답안 변수 체크리스트”(예: 답안03, 답안04_1 …) 노출 옵션

Center Panel (엔진별 상이)

A. Jupyter(Associate):
- 시험지 모드: “문제 본문 + 유의사항 + 답안 작성 셀” 형태로 길게
- 연습 모드: 스텝별 지시문 + 코드 셀 구조

B. Block(Future):
- Blockly 워크스페이스 (스크래치 스타일)
- 블록 팔레트 + 조립 캔버스

C. GUI(Basic/Junior):
- AIDU ez 스타일 데이터 흐름 파이프라인
- 노드/엣지 연결 방식 또는 단계별 마법사 UI

셀 단위 Run 버튼(또는 상단 Run)

출력 영역(stdout/stderr/plot)

Right Panel

현재 스텝 목표/채점 기준 요약

[스텝 제출] 버튼

채점 결과(요약)

피드백(Practice에선 상세, Mock에선 최소)

추천 드릴/복습(연습 모드에만)

7.2 시험지 모드(Exam Sheet View) 규칙

“지시문 셀”은 편집 불가

“답안코드 셀”만 편집 가능

지정 셀 외 코드 작성 시:

연습: 경고 + 자동 이동

모의: 제출 불가 처리 + M-AICE-303 표시(정책 선택)

7.3 답안 변수명 체크(필수)

우측 패널에 “필수 답안 변수” 목록 표시

제출 시 자동 검사:

존재 여부

타입(int/str/df 등, 스텝별 정의)

값 범위(가능한 경우)

실패 시 오류코드:

ANSWER_VAR_MISSING

ANSWER_VAR_TYPE_MISMATCH

ANSWER_VAR_INVALID_VALUE

7.4 셀 실행(Execute)

실행 상태: Running / Done / Timeout / Error

Timeout: “실행 시간 초과” 안내 + 코드 최적화 팁

Error: Traceback 요약 + “대표 실수 패턴 링크”(실수 교정 화면 연결)

7.5 스텝 제출(Grade)

버튼: [스텝 제출]

제출 전 프리체크:

정책 위반 여부(참고 제한/금지 import 등 정책에 따라)

답안 변수명 체크(ON일 때)

제출 결과:

PASS/FAIL/PARTIAL

Practice: 원인/다음 행동/추천 드릴

Mock: 최소 피드백(오류코드+1줄)

PASS 시:

다음 스텝 OPEN

상단 진행률 업데이트

대시보드 반영 트리거

U-AICE-041 제출 결과/리뷰

URL: /aice/session/:sessionId/review

목적: 세션 종료 후 복기(어디서 막혔는지, 무엇을 고칠지)

구성

스텝별 결과 타임라인

오류 코드 Top

“실수 교정 플랜 생성” 버튼

해당 오류에 대한 Drill 자동 생성/플랜에 추가(선택)

8. 모의시험 화면 상세 명세 (AICE 정책 시뮬레이터)
U-AICE-050 모의시험 홈

URL: /aice/mock

구성

“실전과 동일한 정책으로 연습하세요” 안내

최근 모의 기록

추천 모의(취약 영역 기반)

버튼: [모의 시작]

U-AICE-051 모의시험 선택/설정

URL: /aice/mock/setup

선택 항목

시험 유형(회귀/분류 등 로드맵)

난이도

시간 제한(정책 기본값)

참고 정책(허용문서만)

버튼: [다음]

U-AICE-052 모의시험 규칙 동의

URL: /aice/mock/consent

체크박스:

“지정 셀 외 작성 금지”

“참고 제한 이해”

“제출 방식 이해”

버튼: [모의 시작]

U-AICE-053 모의시험 실행

URL: /aice/mock/session/:sessionId

원칙: 시험지 모드 고정 + 힌트/피드백 제한

상단 타이머 필수

임시저장 버튼 필수(시험 UX 유사)

U-AICE-054 모의시험 결과 리포트

URL: /aice/mock/session/:sessionId/result

구성

총점(또는 준비도 레벨)

스텝별 소요시간/실패 스텝

실수 패턴 Top5

“D-7 막판 플랜 생성” 버튼(선택)

9. 실수 교정 화면 상세 명세 (AICE 설득 포인트)
U-AICE-060 실수 교정 홈

URL: /aice/mistakes

목적: 내 반복 실수를 구조화해 교정 루프 제공

구성

“내 실수 Top 10” 카드(최근 14일)

카테고리별 실수 비중

전처리/스케일링/인코딩/평가/시각화

“오늘 교정 3개 추천”

“모의에서 치명적 실수” 경고(시간관리/제출규칙 등)

U-AICE-061 실수 패턴 상세

URL: /aice/mistakes/:errorCode

구성

실수 설명(왜 발생하는지)

AICE에서의 치명도(낮음/중간/높음)

대표 예시(짧은 코드/개념)

교정 드릴 목록

“플랜에 교정 드릴 추가” 버튼

U-AICE-062 교정 드릴 실행

URL: /aice/mistakes/drill/:drillId

목적: 단일 실수 교정(10~20분)

구성

간단 지시문

짧은 실행/퀴즈

PASS 기준 명확히(예: dropna 후 결측 0)

완료 시 플랜 완료 처리/Ready Index 반영

10. 참고문서(허용문서) 화면 상세 명세
U-AICE-070 허용문서 목록

URL: /aice/reference

목적: 오픈북 제한 모드에서 허용되는 문서만 제공(내장 링크/뷰어)

구성

정책별 허용 문서 그룹(예: Pandas/Sklearn/Tensorflow 등)

검색(문서 제목/키워드)

“현재 모드에서 허용 여부” 배지

U-AICE-071 문서 뷰어

URL: /aice/reference/:docId

구성

좌: 목차

우: 본문(내장 뷰어)

상단: “모의 중에도 열람 가능” 배지

제약

외부 링크 클릭 시 정책에 따라 차단/경고

U-AICE-072 정책별 허용 범위 안내

URL: /aice/reference/policy

목적: “왜 이 문서만 되는지” 명확히 안내(시험 신뢰도 관점)

11. 대시보드/설정 화면 상세 명세
U-AICE-080 대시보드(Ready Index)

URL: /aice/dashboard

구성

Ready Index

플랜 이행률(7/14일)

Lab PASS율 / Mock 결과 요약

취약 스텝/태그 Top3

다음 추천(오늘 바로 실행 버튼)

U-AICE-081 학습 로그/히스토리

URL: /aice/dashboard/history

구성

세션 기록(날짜/모드/결과)

제출 결과 히스토리

오류코드 히스토리(필터)

U-AICE-090 설정

URL: /aice/settings

항목

시험 프로필

일정/가용시간

정책/모드

데이터/개인정보(옵션)

버튼

[플랜 재생성]

[리플래닝]

U-AICE-091~093 설정 상세

/aice/settings/profile : 시험일/목표 변경

/aice/settings/schedule : 요일별 가용시간, 휴무일

/aice/settings/policy : 기본 모드, 참고 제한, 답안 변수 체크 ON/OFF

12. 모달/팝업 상세 명세(핵심)
M-AICE-201 리플래닝 확인

내용: “미완료 Task를 재배치합니다. 일부는 압축/스킵될 수 있습니다.”

버튼: [실행] [취소]

실행 후 요약: moved/skipped 수치

M-AICE-202 Task 미루기/재배치

날짜 선택 + 가용시간 초과 경고

추천 날짜 자동 제시(가장 가까운 가용일)

M-AICE-203 압축 플랜 경고

“가용시간 대비 필수 훈련량 부족” 안내

옵션: “압축 플랜 적용” / “가용시간 늘리기”

M-AICE-301 스텝 제출 확인

제출 전 프리체크 요약(답안 변수/정책)

버튼: [제출] [취소]

M-AICE-302 최종제출 확인

최종제출 시 수정 불가 경고(모의/시험지 모드)

버튼: [최종제출] [취소]

M-AICE-303 정책 위반 경고

예: 금지된 참고 접근/지정 셀 외 작성/금지 import

동작: “제출 불가” 또는 “경고 후 계속” (정책 설정)

M-AICE-304 세션 종료 확인

진행 중 종료 시 “임시저장 여부” 확인

버튼: [저장 후 종료] [그냥 종료] [취소]

M-AICE-401 시간 종료 안내

모의시험 시간 종료, 자동 제출 처리 여부 표시

13. 관리자 화면 상세 명세(요약 + 핵심 화면만 상세)
A-AICE-120 Labs 목록

URL: /admin/labs

구성

Lab 리스트(상태 DRAFT/PUBLISHED, 버전, 수정일)

검색/필터(태그/난이도)

[신규 Lab 생성]

A-AICE-121 Lab 생성/편집(핵심)

URL: /admin/labs/:labId

탭 구성

메타: 제목/설명/태그/난이도/예상시간/모드 지원(시험지/모의)

시험지 템플릿: 지시문 셀/답안 셀 구조 편집(“여기에 답안코드” 셀 지정)

스텝: Step 목록/순서/잠금조건(PREV_PASS)

채점: Step별 GradingSpec 연결(룰+테스트+오류코드)

배포: Publish/버전/롤백

A-AICE-124 GradingSpec 관리

룰 관리(필수 변수/DF 상태 체크)

테스트 업로드(숨김 테스트)

오류코드 매핑(피드백 메시지)

“Practice/Mock 피드백 레벨” 설정

A-AICE-130 정책 관리

모드별 제약

Mock: 시간 제한/힌트 제한/재제출 제한/참고 제한

Practice: 상세 피드백 허용

허용문서 세트 관리(Reference 연동)

14. 구현을 위한 화면별 “데이터/상태” 공통 규격

각 화면은 최소 아래 상태를 가져야 함:

LOADING: 스켈레톤/로딩

EMPTY: 데이터 없음(플랜 없음, Lab 없음 등)

ERROR: 네트워크/권한/세션 만료

POLICY_BLOCKED: 정책 위반으로 액션 제한(특히 Mock/시험지 모드)

15. AICE 전용 포인트 체크리스트(화면 반영 여부)

시험지 모드(지시문+답안셀+유의사항) 제공: U-AICE-040/053

답안 변수명 자동 체크: U-AICE-040

지정 셀 외 작성 방지: U-AICE-040/053

임시저장/최종제출 UX: U-AICE-040/053

참고 제한(허용문서만) + 내장 문서 뷰어: U-AICE-070~072

모의시험 정책(시간/힌트/재제출): U-AICE-051~054 + A-AICE-130

실수 교정 전용 화면: U-AICE-060~062
