# Frontend Master Sprint Plan (Senior-level, 2026)

기준일: 2026-02-19
범위: 프론트엔드 100% (더미데이터 우선), 백엔드 연동 제외
전략: 기존 `frontend`는 유지하지 않고 재생성 권장 (아키텍처 품질 우선)

## 1. 기술 스택 (최신 안정 버전 기준)

핵심 프레임워크:
- Next.js 16 (Active LTS)
- React 19.2
- TypeScript (strict)

UI/디자인 시스템:
- Tailwind CSS v4.1
- Radix UI primitives
- shadcn/ui (사내 컴포넌트 베이스)
- class-variance-authority + tailwind-merge

상태/데이터:
- TanStack Query v5 (server state)
- Zustand (client state)
- React Hook Form + Zod 4 (폼/검증)

테스트/품질:
- Vitest + React Testing Library (unit/integration)
- Playwright (E2E)
- MSW (개발/테스트 목 API)
- Storybook (컴포넌트 카탈로그)

개발 생산성:
- pnpm
- ESLint + Prettier
- Husky + lint-staged + commitlint
- Changesets (버전 관리)

## 2. 권장 아키텍처

디렉터리 구조 (Feature-Sliced + App Router 하이브리드):
- `src/app`: 라우팅/레이아웃/페이지 쉘
- `src/pages`: (없음, App Router만 사용)
- `src/widgets`: 화면 조합 단위(PlanBoard, LabPlayerShell)
- `src/features`: 사용자 액션 단위(startSession, submitStep)
- `src/entities`: 도메인 모델(session, step, policy, mistake)
- `src/shared`: ui, lib, api-client, config, types, mocks
- `src/processes`: 멀티스텝 플로우(onboarding, mock-exam)

레이어 규칙:
- 상위 레이어가 하위 레이어만 참조
- `shared`는 어디서든 참조 가능, 반대는 금지
- API 호출은 `shared/api`에서만 수행
- 컴포넌트는 프레젠테이션/컨테이너 분리

환경 분리:
- `dev`: MSW 강제 활성화
- `stg/prod`: 실 API (현재는 feature flag로 비활성)

## 3. Sprint 0 (2일) - 리포 재정렬/초기화

목표:
- 기존 `frontend` 폐기 후 최신 스택으로 깨끗한 재시작

작업:
1. `frontend` 백업 후 삭제
2. `create-next-app` 기반 재생성 (TS + App Router + Tailwind)
3. pnpm workspace 설정 (필요 시)
4. 공통 툴링 구성(ESLint/Prettier/Husky/commitlint)
5. MSW/테스트 기본 골격 구성

완료 기준:
- `pnpm lint`, `pnpm test`, `pnpm build` green
- CI 기본 파이프라인 동작

## 4. Sprint 1 (2주) - 정보구조 + 핵심 화면 골격

목표:
- 전체 IA 라우팅과 화면 쉘을 실제 탐색 가능한 수준으로 완성

범위:
- AICE 홈/플랜/Labs/Mock/실수교정/참고문서/대시보드/설정
- 관리자 홈/Labs/Grading/Policy
- 404 없이 전체 라우트 탐색 가능

핵심 작업:
- 공통 Layout/Navigation/Route Guard
- 디자인 토큰 및 테마 시스템
- 도메인 타입 정의 (`Session`, `Step`, `PlanTask`, `Policy`)
- 목데이터 시드 및 MSW 핸들러 1차

완료 기준:
- 주요 화면 20+ 라우트 접근 가능
- Lighthouse(모바일) 성능 75+, 접근성 90+

## 5. Sprint 2 (2주) - Lab Player/Mock 핵심 기능

목표:
- 제품 차별점인 플레이어 흐름을 인터랙티브하게 완성

범위:
- 세션 시작 -> 플레이어 -> 스텝 제출 -> 리뷰
- Mock 타이머/정책 차단 UX
- 오류코드/실수교정 연결

핵심 작업:
- `useSessionPlayer` 상태머신 훅
- Step 전이(LOCKED->OPEN->PASS/FAIL)
- 정책 위반 모달/토스트 체계
- 제출 결과 카드 + 리뷰 타임라인

완료 기준:
- E2E 시나리오 SCN-01, SCN-02 green
- AC-033/040/041/053 수동 점검 통과

## 6. Sprint 3 (2주) - 품질 고도화/연동 준비

목표:
- 백엔드 붙이기 직전 상태로 프론트 계약 고정

범위:
- API adapter 계층 고정
- 테스트 커버리지/성능/접근성 강화
- 스토리북 기반 UI 회귀 방지

핵심 작업:
- `shared/api` 인터페이스 확정 (mock/live 스위치)
- OpenAPI 타입 연동 준비(orval/openapi-typescript)
- Playwright 회귀팩 8개 이상
- Storybook 주요 컴포넌트 문서화

완료 기준:
- 테스트: Unit 60+, E2E 8+ 전부 green
- 백엔드 연동 시 수정 지점이 `shared/api` 중심으로 제한

## 7. 스프린트별 산출물

Sprint 0:
- 프로젝트 템플릿
- 툴링/CI 설정

Sprint 1:
- 라우트 맵 문서
- 디자인 토큰 문서
- MSW 핸들러 1차

Sprint 2:
- 플레이어 상태머신 다이어그램
- 정책 분기 플로우 차트
- 핵심 E2E 2종

Sprint 3:
- API adapter 계약서
- 테스트 리포트
- 프론트 릴리스 후보(backend-ready)

## 8. DoR / DoD

DoR (각 스프린트 시작 전):
- 명확한 AC 존재
- 디자인(또는 와이어) 동결
- QA 케이스 초안 존재

DoD (각 스프린트 종료 시):
- lint/build/test green
- 문서 업데이트 완료
- 데모 가능한 상태
- 블로커/리스크 등록 완료

## 9. 리스크와 대응

리스크 1: 라이브러리 과도 도입으로 초기 속도 저하
- 대응: Sprint 0에서 최소 코어만 도입, 나머지는 Sprint 2 이후 단계적 도입

리스크 2: 더미데이터와 실제 API 불일치
- 대응: 처음부터 adapter 패턴 고정 + schema 기반 목 응답

리스크 3: 플레이어 복잡도로 회귀 버그 증가
- 대응: 상태머신 단위 테스트 + E2E 회귀팩 우선 투자

## 10. 실행 커맨드 표준

- `pnpm dev`
- `pnpm lint`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`

## 11. 이번 주 액션 (바로 시작)

Day 1:
- Sprint 0 착수, 기존 프론트 백업/폐기 결정
- Next.js 16 기반 새 프로젝트 생성

Day 2:
- 툴링/CI/테스트 뼈대 구성
- FSD 디렉터리 스캐폴딩

Day 3:
- IA 라우트 골격 및 공통 레이아웃 구현

Day 4:
- MSW 핸들러 + 목데이터 시드

Day 5:
- Sprint 1 데모 준비(탐색 가능한 전체 라우트)
