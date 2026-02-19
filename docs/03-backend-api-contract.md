17. 도메인 모델/상태머신 (MVP 기준)

17.1 핵심 엔터티

User(id, role, examProfileId)

ExamProfile(id, level[Future/Junior/Basic/Associate/Professional], examDate, targetType, availabilityRule)

Plan(id, userId, startDate, examDate, compressionFlag, readyIndexSnapshot)

PlanTask(id, planId, date, type[Drill/Lab/Review/Mock], status[TODO/DONE/SKIPPED], estMinutes)

Lab(id, level, engineType[BLOCK/GUI/JUPYTER], version, modeSupport, notebookTemplateId, gradingSpecSetId, status[DRAFT/PUBLISHED])

Session(id, userId, labId, level, engineType, mode, policyId, status, startedAt, endedAt)

StepSubmission(id, sessionId, stepNo, attemptNo, result[PASS/FAIL/PARTIAL], errorCodes[], runtimeMs)

MistakeStat(id, userId, errorCode, count14d, severity)

17.2 Session 상태머신

CREATED -> RUNNING -> PAUSED -> RUNNING -> SUBMITTED -> REVIEWED -> CLOSED

예외 전이:

RUNNING -> FORCE_CLOSED (시간 종료/정책 중대 위반)

CREATED/RUNNING -> ABANDONED (사용자 이탈 + 복구시간 초과)

17.3 Step 상태머신

LOCKED -> OPEN -> RUNNING -> GRADED(PASS/FAIL/PARTIAL)

PASS 시 다음 Step OPEN

FAIL/PARTIAL 시 정책에 따라 재시도 가능 횟수 차등

18. API 계약 초안 (핵심 엔드포인트)

18.1 공통 규약

인증: Bearer JWT

권한: USER / ADMIN

응답 envelope:

success: { "data": ..., "meta": { "requestId": "..." } }

error: { "error": { "code": "...", "message": "...", "details": ... }, "meta": { "requestId": "..." } }

18.2 사용자 핵심 API

GET /api/aice/plan

GET /api/aice/plan/day/{date}

POST /api/aice/plan/replan

POST /api/aice/labs/{labId}/sessions

GET /api/aice/sessions/{sessionId}

POST /api/aice/sessions/{sessionId}/execute

POST /api/aice/sessions/{sessionId}/steps/{stepNo}/submit

POST /api/aice/sessions/{sessionId}/final-submit

GET /api/aice/sessions/{sessionId}/review

GET /api/aice/mistakes

GET /api/aice/reference/docs

18.3 관리자 핵심 API

POST /api/admin/labs

PUT /api/admin/labs/{labId}

POST /api/admin/labs/{labId}/publish

POST /api/admin/grading-specs

PUT /api/admin/policies/{policyId}

18.4 표준 에러코드

AUTH_UNAUTHORIZED

AUTH_FORBIDDEN

SESSION_NOT_FOUND

SESSION_STATE_INVALID

POLICY_BLOCKED

ANSWER_VAR_MISSING

ANSWER_VAR_TYPE_MISMATCH

ANSWER_VAR_INVALID_VALUE

EXEC_TIMEOUT

EXEC_RUNTIME_ERROR


24. API 상세 계약 (요청/응답 스키마)

24.1 POST /api/aice/labs/{labId}/sessions

request:

{
  "level": "Associate",
  "mode": "Practice|Practice+|Mock",
  "policyId": "plc_xxx",
  "consent": true
}

response 201:

{
  "data": {
    "sessionId": "ses_xxx",
    "status": "CREATED",
    "level": "Associate",
    "engineType": "JUPYTER",
    "mode": "Mock",
    "policy": {
      "referencePolicy": "ALLOWLIST_ONLY",
      "hintLevel": "MINIMAL",
      "stepRetryLimit": 1,
      "timeLimitSec": 3600
    }
  },
  "meta": { "requestId": "req_xxx" }
}

24.2 POST /api/aice/sessions/{sessionId}/execute

request:

{
  "cellId": "cell_12",
  "code": "print('hello')",
  "stepNo": 2
}

response 200:

{
  "data": {
    "executionId": "exe_xxx",
    "state": "Done",
    "stdout": "hello\n",
    "stderr": "",
    "artifacts": [],
    "runtimeMs": 420
  },
  "meta": { "requestId": "req_xxx" }
}

response 409 (정책 위반):

{
  "error": {
    "code": "POLICY_BLOCKED",
    "message": "Action is blocked by current policy",
    "details": { "reason": "DISALLOWED_CELL_EDIT", "cellId": "cell_9" }
  },
  "meta": { "requestId": "req_xxx" }
}

24.3 POST /api/aice/sessions/{sessionId}/steps/{stepNo}/submit

request:

{
  "answers": {
    "answer03": 123.4,
    "answer04_1": "A"
  },
  "codeSnapshotRef": "snap_xxx"
}

response 200:

{
  "data": {
    "result": "PARTIAL",
    "score": 70,
    "errorCodes": ["ANSWER_VAR_TYPE_MISMATCH"],
    "feedback": {
      "level": "MINIMAL",
      "summary": "answer04_1 type mismatch"
    },
    "nextStepState": "OPEN"
  },
  "meta": { "requestId": "req_xxx" }
}

24.4 POST /api/aice/sessions/{sessionId}/final-submit

response 200:

{
  "data": {
    "sessionStatus": "SUBMITTED",
    "submittedAt": "2026-02-19T01:23:45Z",
    "reviewUrl": "/aice/session/ses_xxx/review"
  },
  "meta": { "requestId": "req_xxx" }
}

24.5 GET /api/aice/plan/day/{date}

response 200:

{
  "data": {
    "date": "2026-02-20",
    "mode": "Practice+",
    "policySummary": {
      "referencePolicy": "ALLOWLIST_ONLY",
      "answerVarCheck": true
    },
    "tasks": [
      {
        "taskId": "tsk_1",
        "type": "Lab",
        "title": "결측치+인코딩 훈련",
        "status": "TODO",
        "estMinutes": 45
      }
    ]
  },
  "meta": { "requestId": "req_xxx" }
}
