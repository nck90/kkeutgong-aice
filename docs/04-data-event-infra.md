25. DB 스키마 초안 (PostgreSQL 기준)

25.1 핵심 테이블 DDL

```sql
create table exam_profiles (
  id uuid primary key,
  user_id uuid not null unique,
  level text not null check (level in ('FUTURE','JUNIOR','BASIC','ASSOCIATE','PROFESSIONAL')),
  exam_date date not null,
  target_type text not null check (target_type in ('PASS_FIRST','HIGH_SCORE','PRACTICAL')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table plans (
  id uuid primary key,
  user_id uuid not null,
  exam_profile_id uuid not null references exam_profiles(id),
  start_date date not null,
  exam_date date not null,
  compression_flag boolean not null default false,
  ready_index_snapshot int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table plan_tasks (
  id uuid primary key,
  plan_id uuid not null references plans(id) on delete cascade,
  task_date date not null,
  task_type text not null check (task_type in ('DRILL','LAB','REVIEW','MOCK')),
  ref_id uuid null,
  status text not null check (status in ('TODO','DONE','SKIPPED')),
  est_minutes int not null check (est_minutes > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_plan_tasks_plan_date on plan_tasks(plan_id, task_date);

create table sessions (
  id uuid primary key,
  user_id uuid not null,
  lab_id uuid not null,
  level text not null check (level in ('FUTURE','JUNIOR','BASIC','ASSOCIATE','PROFESSIONAL')),
  engine_type text not null check (engine_type in ('BLOCK','GUI','JUPYTER')),
  policy_id uuid not null,
  mode text not null check (mode in ('PRACTICE','PRACTICE_PLUS','MOCK')),
  status text not null check (status in ('CREATED','RUNNING','PAUSED','SUBMITTED','REVIEWED','CLOSED','FORCE_CLOSED','ABANDONED')),
  started_at timestamptz null,
  ended_at timestamptz null,
  final_score int null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_sessions_user_created on sessions(user_id, created_at desc);

create table step_submissions (
  id uuid primary key,
  session_id uuid not null references sessions(id) on delete cascade,
  step_no int not null check (step_no > 0),
  attempt_no int not null check (attempt_no > 0),
  result text not null check (result in ('PASS','FAIL','PARTIAL')),
  score int not null default 0,
  error_codes text[] not null default '{}',
  runtime_ms int not null default 0,
  code_snapshot_ref text null,
  created_at timestamptz not null default now(),
  unique(session_id, step_no, attempt_no)
);
create index idx_step_submissions_session_step on step_submissions(session_id, step_no);

create table audit_policy_events (
  id uuid primary key,
  user_id uuid not null,
  session_id uuid null,
  policy_id uuid null,
  action text not null,
  verdict text not null check (verdict in ('ALLOW','WARN','BLOCK')),
  reason_code text null,
  client_ip inet null,
  user_agent text null,
  created_at timestamptz not null default now()
);
create index idx_audit_policy_events_user_created on audit_policy_events(user_id, created_at desc);
```

25.2 마이그레이션 규칙

DDL은 backward-compatible 우선(add column nullable -> backfill -> not null)

DROP/타입변경은 다음 배포에서 수행(2-step migration)

26. 비동기 이벤트 계약 (Queue/Event Bus)

26.1 발행 이벤트

`SESSION_STARTED`

`CELL_EXECUTED`

`STEP_SUBMITTED`

`SESSION_FINAL_SUBMITTED`

`MISTAKE_DRILL_COMPLETED`

26.2 이벤트 공통 스키마

{
  "eventId": "evt_xxx",
  "eventType": "STEP_SUBMITTED",
  "occurredAt": "2026-02-19T01:23:45Z",
  "actorId": "usr_xxx",
  "entityId": "ses_xxx",
  "payload": {}
}

26.3 소비자(consumer)

ReadyIndex Worker: 지표 재계산

Mistake Aggregator: 오류코드 통계 갱신

Analytics Sink: 운영 지표 적재

27. 런타임/인프라 구성값 (.env 계약)

`API_JWT_ISSUER`

`API_JWT_AUDIENCE`

`API_JWT_PUBLIC_KEY`

`DB_URL`

`REDIS_URL`

`RUNTIME_IMAGE`

`RUNTIME_CPU_LIMIT`

`RUNTIME_MEM_LIMIT_MB`

`RUNTIME_CELL_TIMEOUT_SEC`

`RUNTIME_STEP_TIMEOUT_SEC`

`REFERENCE_ALLOWLIST_DOMAINS`

`AUDIT_LOG_RETENTION_DAYS`
