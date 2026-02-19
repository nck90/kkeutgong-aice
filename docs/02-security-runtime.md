16. 보안/실행 아키텍처 필수 규격 (개발 고정안)

16.1 코드 실행 샌드박스 (Associate/Pro 트랙)

실행 단위: Session별 Ephemeral Container (Jupyter Kernel)

언어/커널: Python 3.x (AICE 기본)

격리 원칙:

네트워크 egress 차단(기본)

파일시스템 최소 권한(읽기 전용 베이스 + 세션별 쓰기 영역)

프로세스/시스템콜 제한(seccomp/apparmor 등 적용 권장)

리소스 제한(기본값):

CPU: 1 vCPU

Memory: 2GB

실행 Timeout: 셀 30초 / 스텝 5분 / 세션 정책값 우선

Disk(write): 512MB

동시 프로세스 수 제한: 32

금지 항목(기본):

외부 네트워크 호출

시스템 패키지 설치(pip/apt) - 정책 허용 시 내부 미러만 허용

지정 경로 외 파일 접근

16.2 블록코딩/GUI 런타임 (Future/Junior/Basic 트랙)

실행 단위: Browser Client-side Engine (Blockly / AIDU ez clone)

데이터 처리:
- 가벼운 데이터: 브라우저 인메모리 처리 (WASM/JavaScript)
- 무거운 데이터: 서버 사이드 API 호출 (Stateless)

보안:
- 브라우저 샌드박스 의존
- 제출 시 서버에서 정답 로직 재검증 (Replay Verification)

16.3 데이터/비밀정보 보호

Dataset는 읽기 전용 마운트, 원본 변경 불가

세션 종료 시 워크스페이스 정리(임시저장/제출본만 영속화)

Secret(키/토큰) 클라이언트 비노출, 서버 런타임 주입 금지(원칙)

로그 내 PII/민감정보 마스킹(이메일, 전화번호, 토큰 패턴)

16.4 정책 위반 탐지/감사

정책 위반 이벤트는 모두 Audit Log 기록:

userId, sessionId, policyId, action, timestamp, clientIp, userAgent, verdict

보관: 90일(운영 정책에 따라 조정)

반복 위반 사용자에 대한 단계적 제어(경고 -> 제출 제한 -> 관리자 검토)

