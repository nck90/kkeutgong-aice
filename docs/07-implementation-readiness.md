# Implementation Readiness Pack (개발 착수 기준서)

기준일: 2026-02-19
범위: 문서 기준선 확정 후 실제 개발 착수 가능한 상태 정의
기준 문서:
- `docs/01-ui-spec.md`
- `docs/02-security-runtime.md`
- `docs/03-backend-api-contract.md`
- `docs/04-data-event-infra.md`
- `docs/05-delivery-plan-qa.md`
- `docs/06-decision-log.md`

## 1) 착수 선언 조건 (Definition of Ready)

아래 12개 항목이 모두 충족되어야 개발 시작 가능:

1. 제품 범위 승인: 멀티트랙 아키텍처 + Associate 우선 구현 원칙 승인
2. API 계약 승인: `docs/03-backend-api-contract.md`의 엔드포인트/에러코드 승인
3. 데이터 모델 승인: `docs/04-data-event-infra.md` DDL 승인
4. 보안 정책 승인: 런타임 격리/감사로그 보관 정책 승인
5. AC 승인: `docs/05-delivery-plan-qa.md` 23장 AC 승인
6. QA 범위 승인: FE/BE/E2E 테스트 게이트 승인
7. 운영 기준 승인: 모니터링/로그/장애 대응 항목 승인
8. 우선순위 승인: Sprint 1에서 Associate 핵심 플로우 우선
9. 팀 역할 확정: FE/BE/QA/PO 오너 지정
10. 배포 환경 확정: dev/stage/prod 책임자 및 접근권한 확정
11. 이슈 트래커 준비: 티켓 템플릿/워크플로우 확정
12. 문서 잠금: 기준 문서 버전 태깅(v2.2-ready)

## 2) 개발 착수 Day 0 체크리스트

### 공통
- [ ] 기준 문서 링크를 단일 Confluence/Notion 페이지에 집약
- [ ] 용어집 확정 (`level`, `engineType`, `mode`, `policy`)
- [ ] 에러코드 사용자 메시지 매핑 테이블 작성

### 백엔드
- [ ] `openapi.yaml` 초기본 생성 (필수 엔드포인트 10개)
- [ ] DB migration 0001 생성 (`exam_profiles`, `plans`, `sessions`, `step_submissions`)
- [ ] 정책 엔진 인터페이스 작성 (`allow/warn/block`)

### 프론트
- [ ] 화면 라우트 맵 + 상태 맵 확정
- [ ] mock/live API adapter 인터페이스 고정
- [ ] 핵심 플로우 와이어 동작 정의(세션 시작 -> 플레이어 -> 제출 -> 리뷰)

### QA
- [ ] 테스트 매트릭스 작성 (모드 x 정책 x 결과)
- [ ] E2E 시나리오 ID 부여 (SCN-01~)

## 3) Sprint 실행 백로그 (2주 x 3스프린트)

## Sprint 1 (주제: 코어 플로우 구현)

목표:
- 세션 생성/실행/스텝 제출/리뷰까지 E2E 데모 가능

필수 티켓:
- BE-01 Session 상태머신 + 생성 API
- BE-02 Execute API + timeout 처리
- BE-03 Submit API + 변수 체크
- FE-01 세션 시작 화면
- FE-02 플레이어 기본 패널
- FE-03 제출 결과/오류코드 표시
- QA-01 SCN-01 자동화

완료조건:
- SCN-01 green
- `POLICY_BLOCKED`, `ANSWER_VAR_MISSING` 재현 확인

## Sprint 2 (주제: 정책/모의/운영)

목표:
- Mock 모드 및 정책 분기 완성, 운영 로그 확보

필수 티켓:
- BE-04 정책 엔진 + 감사로그
- BE-05 플랜 day API
- FE-04 리뷰/실수교정 이동
- FE-05 플랜 day 상태 반영
- AD-03 정책 화면
- QA-02 SCN-02, SCN-03 자동화

완료조건:
- 시간종료 자동제출 재현
- 감사로그 조회 가능

## Sprint 3 (주제: 안정화/릴리스 준비)

목표:
- 품질 지표 통과 및 릴리스 준비 완료

필수 티켓:
- BE-06 ReadyIndex worker
- AD-01/02 관리자 편집 기능 안정화
- 공통 장애처리/에러 UX 정리
- QA-03 회귀팩 + 성능 점검

완료조건:
- 핵심 AC 100% 통과
- 릴리스 체크리스트 통과

## 4) 테스트 매트릭스 (MVP 최소)

조합 기준:
- Mode: Practice / Practice+ / Mock
- Policy: Open / Allowlist / Restricted
- Step Result: PASS / FAIL / PARTIAL

최소 검증 케이스 수:
- 3(mode) x 3(policy) x 3(result) = 27

필수 에러 케이스:
- `POLICY_BLOCKED`
- `ANSWER_VAR_MISSING`
- `ANSWER_VAR_TYPE_MISMATCH`
- `EXEC_TIMEOUT`

## 5) 릴리스 게이트

릴리스 전 반드시 충족:
1. API 문서와 실제 응답 일치율 100%
2. DB migration dry-run 성공
3. 핵심 E2E 시나리오 전부 green
4. 보안 정책 위반 로그 적재 확인
5. 장애 대응(runbook) 문서화 완료
6. PO/UAT 승인

## 6) 역할/책임 (RACI)

- PO: 범위/우선순위 승인, UAT 승인
- FE Lead: 화면 AC 구현 책임
- BE Lead: API/도메인/정책 엔진 책임
- QA Lead: 테스트 전략/게이트 책임
- Ops: 배포/모니터링/로그 보관 책임

## 7) 즉시 실행 순서 (이번 주)

1. Day 0: DoR 12항목 승인 완료
2. Day 1: OpenAPI/DDL 초안 파일 생성
3. Day 2: Session 생성 + 플레이어 뼈대 연결
4. Day 3: Submit/Review 흐름 연결
5. Day 4: Mock 타이머/정책 차단 연결
6. Day 5: SCN-01/02 smoke + 주간 리포트
