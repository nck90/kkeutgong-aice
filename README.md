# AICE Frontend

엔터프라이즈 제안용 AICE 학습/운영 플랫폼 프론트엔드입니다.

## Stack
- React 19 + TypeScript + Vite
- React Router + TanStack Query
- Tailwind CSS 4 + Radix UI
- Vitest + Playwright

## Run
```bash
npm install
npm run dev
```

## Environment
기본값은 Mock API 모드입니다.

```bash
cp .env.example .env.local
```

- `VITE_API_MODE=mock|real`
- `VITE_API_BASE_URL=http://localhost:3000`

`VITE_API_MODE=real`인 경우:
- `POST /api/auth/login` (관리자 로그인)
- `/api/aice/*`, `/api/admin/*` 일부 엔드포인트를 우선 호출
- 실패 시 Mock API로 안전하게 fallback

## Quality Gates
```bash
npm run lint
npm run test
npm run build
```
