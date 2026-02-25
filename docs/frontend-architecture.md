# Frontend Architecture (Sprint 0-1)

## Stack
- React 19 + TypeScript strict + Vite 7
- TanStack Query v5 / Zustand
- React Hook Form + Zod
- MSW / Vitest / Playwright
- Tailwind CSS v4

## Layers
- app: router, provider, shell
- pages: route entry
- widgets: composite UI blocks
- entities: domain logic/hooks
- features: user actions/state
- shared: api/mock/types/lib

## Rules
- API access only through `shared/api/*`
- Mock handlers under `shared/mocks/*`
- Router only in `app/router.tsx`
- Domain transitions in entities hooks (`useSessionPlayer`)
