# Frontend Enterprise Upgrade Plan

## Goal
데모 수준 UI를 엔터프라이즈 제안 가능한 제품 수준으로 끌어올린다.

## Track A: UX Architecture
- Route IA 3계층으로 재정리: `Acquisition` / `Learning` / `Operations`
- 핵심 여정 고정: 온보딩 -> 플랜 -> 세션 -> 리뷰 -> 리텐션
- 페이지 간 상태 인계 규약 정의 (session, policy, review)

## Track B: Design System
- 토큰 계층 재정의: color/space/radius/typography/shadow/motion
- 공용 컴포넌트 1차 표준화: Button/Input/Card/Badge/Dialog/Table/Tabs
- 시각 품질 기준: 대비, hover/focus, empty/loading/error 상태 컴포넌트화

## Track C: Product UX
- Learner UI 고도화
  - Dashboard: KPI, 추천 과제, 리스크 경고
  - Labs: 검색/필터/정렬/배지 규칙
  - Session: IDE 정보구조, 실시간 상태, 정책 피드백
  - Review/History: 분석 중심 결과 경험
- Admin UI 고도화
  - Labs/Policy/Analytics 정보구조 개편
  - 운영자 작업 흐름(생성-검수-배포) UI 구현

## Track D: Functional Depth
- Mock API를 도메인 리포지토리 패턴으로 정리
- optimistic update / rollback / retry 전략 적용
- 사용자 설정(프로필/일정/정책) 영속 상태 모델 추가

## Track E: Quality & Delivery
- 성능
  - 라우트 코드 스플리팅
  - chart/editor 라이브러리 chunk 분리
  - 번들 예산 도입 (경고 기준 500KB -> 목표 300KB)
- 테스트
  - 핵심 플로우 E2E 10개 시나리오
  - 페이지 회귀 테스트 확대
- 접근성
  - 키보드 탐색, aria-label, 색 대비 점검 체크리스트화

## Milestones
1. M1 (1주): IA + Design System v1 + 핵심 6페이지 리디자인
2. M2 (2주): 세션/리뷰/관리자 고도화 + 상태모델 안정화
3. M3 (3주): 성능/접근성/테스트 패키지 + 제안용 데모 시나리오 완성

## Acceptance Criteria
- `lint/build/test/e2e` 모두 통과
- 핵심 경로에서 빈상태/오류상태/로딩상태 모두 디자인 반영
- 디자인 일관성(토큰/컴포넌트) 문서화
- 제안 시연 10분 내 핵심 가치 전달 가능

## Current Execution Snapshot (Completed)
- IA 1차 재정리 및 legacy route redirect 호환 적용
- 페이지 단위 lazy loading + vendor manualChunks 적용
- Learner 핵심 화면 리디자인 (dashboard/labs/lab detail/session/review/history)
- Admin 전 페이지 리디자인 + 공통 `AdminShell` 도입
- API 클라이언트 모드 스위치 도입 (`VITE_API_MODE=mock|real`)
- Real API adapter 1차 연동 (`auth/login`, `aice/admin` 일부 엔드포인트 + fallback)
- Admin 인증 가드 도입 (`/admin/*` 보호, 로그인 후 원래 경로 복귀)
- Session IDE 분석 패널 1차 적용 (metrics/variables/attempts 탭, 진행률/타이머/피드백 타임라인)
- Design System v2 컴포넌트 1차 추가 (`Table`, `Tabs`, `Skeleton`, `Toast`)
- Admin Releases를 승인 워크플로우 테이블형 운영 화면으로 확장
- 시험 선택/목표일 선택 기반 커리큘럼 자동 생성 및 플랜 온보딩 연결
- 오답/히스토리 신호 기반 개인화 보정 플랜 1차 적용
- 샘플문항 교재화 학습 허브 추가 (챕터 목록/상세, 개념-실습-퀴즈 탭)
- 교재 진도 기반 주간 일정 자동 재배치(미완료 챕터 우선 삽입)
- D-day/오류 severity 기반 자동 강도 프로파일 및 세션 시작 추천 연동
- 세션 결과(PASS/FAIL/PARTIAL/ERROR) 기록 기반 다음날 플랜 자동 재편성 루프 적용
- 백엔드 없이 로컬 적응데이터 운영화: 학습자/관리자 분석 화면에 추세·모드성과·초기화 기능 적용
- 플랜 실행력 강화: `/plan/sprint` 칸반 보드(오늘/이번주/완료) + 로컬 영속 상태 + 진행률 KPI 적용
- 품질 게이트 통과: lint/build/test

## Next Massive Update Scope (Planned)
### Functional
- Real API adapter 2차 확장 (plan/mistake/reference/history 완전 정합)
- 서버 에러/정책 에러/권한 에러 상태 UX 정교화 + 토스트/가이드 액션
- 세션 상태머신 시각화 및 step attempt 히스토리 고도화(코드 diff/오류코드 drill-down)
- 사용자 설정(프로필/일정/정책) 저장 API 연동

### UI/UX
- Session IDE 분석 패널 2차: 단계 상태머신 + 추천 액션 패널
- Admin 승인 워크플로우 2차: 승인자 코멘트/게이트 결과 이력
- Design System v2 2차 (toast variant, skeleton preset, chart tokens, data-density 옵션)

### Frontend Design
- 브랜드 가이드 기반 타이포/컬러/모션 문서화
- 페이지별 empty/loading/error 상태 디자인 표준화
- 접근성 체크리스트 자동 검증(ARIA, 대비, 포커스 경로)
