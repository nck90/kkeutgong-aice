18. 현재 의사결정 기준 (2026-02-19)

현재 상태: 구현 작업(프론트/백엔드) 보류, 문서 정합성 정비 우선

범위 우선순위:

- 제품/아키텍처 범위는 멀티트랙(5단계) 기준 유지
- MVP 실행 기준은 Associate 트랙 우선
- Future/Junior/Basic/Professional은 로드맵 기준으로 명세만 유지

개발 착수는 `docs/07-implementation-readiness.md`의 Definition of Ready 충족 이후 진행

19. 모드/정책 결정표 (v1)

Practice:

힌트 상세: 허용

피드백 상세: 허용

재제출: 무제한(또는 정책값)

참고: 전체 웹 허용 가능

Practice+:

힌트: 제한

피드백: 요약

재제출: 제한(예: step당 3회)

참고: 허용문서 중심

Mock:

힌트: 금지

피드백: 최소(코드+1줄)

재제출: 제한(예: step당 1회 또는 전체 N회)

참고: 허용문서만(기본), 외부 링크 차단

Exam Sheet View:

지시문 셀 편집 금지

답안 셀 외 작성 시 정책 위반 처리

20. Ready Index 산식 (v1, 운영 튜닝 가능)

공식(0~100):

ReadyIndex = 0.35 * PlanAdherence + 0.30 * LabPassRate + 0.20 * MockScore + 0.15 * MistakeRecovery

지표 정의:

PlanAdherence: 최근 14일 완료율(0~100)

LabPassRate: 최근 20개 스텝 PASS율(0~100)

MockScore: 최근 3회 모의 가중 평균(최신 가중치 높음)

MistakeRecovery: Top 오류코드 재발 감소율 기반 점수

갱신 주기:

Task 완료, Step 제출, Mock 종료, Drill 완료 이벤트 시 비동기 재계산

21. MVP 범위/비범위 (개발팀 착수 기준)

21.1 MVP 포함 (Target Track: Associate 우선)

*   **비고**: 아키텍처는 Future/Junior/Basic을 고려하여 설계하되, 콘텐츠 및 런타임 구현은 Associate(Python)를 최우선으로 진행함.

온보딩 3단계 + 플랜 생성(U-AICE-011~013, 020~021)

Lab 목록/상세/세션생성(U-AICE-031~033)

Lab 플레이어 핵심(셀 실행, 스텝 제출, 변수체크, 최종제출)(U-AICE-040)

모의시험 최소 플로우(U-AICE-051~054)

실수교정 홈/상세(읽기 중심)(U-AICE-060~061)

관리자 Lab/GradingSpec/Policy 편집(A-AICE-121,124,130)

21.2 MVP 제외(Phase 2)

고급 추천 개인화 모델

시계열/고급 유형 확장

실시간 협업/멘토링

22. 테스트/품질 게이트

22.1 FE

정책/모드별 UI 분기 테스트

핵심 플로우 E2E:

Lab 시작 -> 실행 -> 스텝 제출 -> 최종제출 -> 리뷰

Mock 시작 -> 시간 종료 -> 자동 제출

22.2 BE

정책 엔진 단위 테스트(위반/허용 케이스)

채점기 로직 테스트(정답/오답/부분정답/타입오류)

권한 테스트(USER/ADMIN)

22.3 운영

감사로그 적재 검증

실행 런타임 리소스 제한 검증(Timeout/메모리 초과)

장애 대응: Runtime 실패 시 재시도/폴백 메시지 검증

23. 화면별 수용 기준(AC, MVP 핵심)

23.1 U-AICE-033 세션 생성/환경 체크

AC-033-01: 모드/정책 미선택 상태에서 [세션 시작] 버튼 비활성

AC-033-02: 동의 체크박스 미체크 시 세션 생성 API 호출 불가

AC-033-03: 세션 생성 성공 시 `/aice/session/:sessionId`로 이동

AC-033-04: 정책 충돌(예: 모드와 허용문서 세트 불일치) 시 에러코드 `POLICY_BLOCKED` 노출

23.2 U-AICE-040 Lab 플레이어

AC-040-01: Mock 모드에서 타이머가 1초 단위로 감소하고 0 도달 시 자동 제출 트리거

AC-040-02: 답안 변수명 체크 ON일 때 제출 전 필수 변수 누락 시 제출 실패 + `ANSWER_VAR_MISSING`

AC-040-03: 지정 셀 외 작성 시 정책에 따라 경고 또는 제출 차단

AC-040-04: Step PASS 시 다음 Step 상태가 `LOCKED -> OPEN`으로 변경

AC-040-05: [임시저장] 클릭 시 마지막 코드 스냅샷과 실행 상태 저장

23.3 U-AICE-041 제출 결과/리뷰

AC-041-01: Step별 결과(PASS/FAIL/PARTIAL)와 소요시간 표시

AC-041-02: 오류코드 Top 항목에서 `/aice/mistakes/:errorCode` 이동 가능

AC-041-03: "실수 교정 플랜 생성" 실행 시 PlanTask(Drill) 생성됨

23.4 U-AICE-053 모의시험 실행

AC-053-01: 시험지 모드 고정(모드 전환 UI 미노출)

AC-053-02: 힌트 상세 피드백 미노출(최소 피드백만)

AC-053-03: 시간 종료 시 M-AICE-401 노출 후 자동 제출 처리


28. 개발 티켓 분해 (우선순위/의존성)

28.1 BE

BE-01: Session 상태머신 + 세션 생성 API

BE-02: 셀 실행 API + 런타임 어댑터 + Timeout 처리

BE-03: 스텝 제출/채점 API + 변수명/타입 체크

BE-04: 정책 엔진(허용/경고/차단) + 감사로그

BE-05: 플랜 조회/일자 상세 API

BE-06: ReadyIndex worker + 이벤트 소비자

28.2 FE

FE-01: U-AICE-033 세션 시작 화면

FE-02: U-AICE-040 플레이어(Top/Left/Center/Right 패널)

FE-03: 스텝 제출/결과/오류코드 표시

FE-04: U-AICE-041 리뷰 화면 + 실수교정 이동

FE-05: U-AICE-021 일자 상세 + Task 상태 갱신

28.3 Admin

AD-01: A-AICE-121 Lab 편집 기본 탭

AD-02: A-AICE-124 GradingSpec CRUD

AD-03: A-AICE-130 Policy 편집 + 모드별 제약

29. Definition of Done (DoD)

코드:

핵심 도메인 로직 단위테스트 커버

정책 위반/정상 플로우 통합테스트 통과

문서:

API 스펙(openapi.yaml) 최신화

에러코드 표와 사용자 메시지 매핑 최신화

운영:

대시보드(성공률/실패율/타임아웃율) 확인 가능

감사로그 조회 가능

제품:

MVP 핵심 AC(23장) 전부 통과

30. 릴리스 계획 (2주 x 3스프린트 예시)

Sprint 1:

Session/Policy/Execute 기반선 + 플레이어 기본 UI + Admin Policy

Sprint 2:

Step 제출/채점/리뷰 + 플랜 일자 상세 + 감사로그

Sprint 3:

Mock 고도화(시간종료 자동제출) + ReadyIndex + 안정화/QA
