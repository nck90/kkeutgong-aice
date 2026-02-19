import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { AdminPage } from '@/pages/admin/page'
import { DashboardPage } from '@/pages/dashboard/page'
import { HomePage } from '@/pages/home/page'
import { LabsPage } from '@/pages/labs/page'
import { MistakesPage } from '@/pages/mistakes/page'
import { MockPage } from '@/pages/mock/page'
import { MockResultPage } from '@/pages/mock-result/page'
import { PlaceholderPage } from '@/pages/placeholder/page'
import { PlanPage } from '@/pages/plan/page'
import { ReferencePage } from '@/pages/reference/page'
import { ReviewPage } from '@/pages/review/page'
import { SessionPage } from '@/pages/session/page'
import { SessionStartPage } from '@/pages/session-start/page'
import { SettingsPage } from '@/pages/settings/page'

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/aice" replace />} />
          <Route path="/aice" element={<HomePage />} />

          <Route path="/aice/onboarding/profile" element={<PlaceholderPage title="온보딩 1/3 - 시험 프로필" />} />
          <Route path="/aice/onboarding/schedule" element={<PlaceholderPage title="온보딩 2/3 - 가용시간/일정" />} />
          <Route path="/aice/onboarding/policy" element={<PlaceholderPage title="온보딩 3/3 - 정책/모드" />} />
          <Route path="/aice/diagnostic" element={<PlaceholderPage title="초기 진단" />} />

          <Route path="/aice/plan" element={<PlanPage />} />
          <Route path="/aice/plan/day/:date" element={<PlanPage />} />
          <Route path="/aice/plan/weekly" element={<PlaceholderPage title="주간 리포트" />} />

          <Route path="/aice/labs" element={<LabsPage />} />
          <Route path="/aice/labs/list" element={<LabsPage />} />
          <Route path="/aice/labs/:labId" element={<PlaceholderPage title="Lab 상세" />} />
          <Route path="/aice/labs/:labId/start" element={<SessionStartPage />} />

          <Route path="/aice/session/:sessionId" element={<SessionPage />} />
          <Route path="/aice/session/:sessionId/review" element={<ReviewPage />} />

          <Route path="/aice/mock" element={<MockPage />} />
          <Route path="/aice/mock/setup" element={<SessionStartPage />} />
          <Route path="/aice/mock/consent" element={<PlaceholderPage title="모의 규칙 동의" />} />
          <Route path="/aice/mock/session/:sessionId" element={<SessionPage />} />
          <Route path="/aice/mock/session/:sessionId/result" element={<MockResultPage />} />

          <Route path="/aice/mistakes" element={<MistakesPage />} />
          <Route path="/aice/mistakes/:errorCode" element={<PlaceholderPage title="실수 패턴 상세" />} />

          <Route path="/aice/reference" element={<ReferencePage />} />
          <Route path="/aice/reference/:docId" element={<PlaceholderPage title="문서 뷰어" />} />
          <Route path="/aice/reference/policy" element={<PlaceholderPage title="정책별 허용범위" />} />

          <Route path="/aice/dashboard" element={<DashboardPage />} />
          <Route path="/aice/dashboard/history" element={<PlaceholderPage title="학습 히스토리" />} />
          <Route path="/aice/settings" element={<SettingsPage />} />
          <Route path="/aice/settings/profile" element={<PlaceholderPage title="설정-프로필" />} />
          <Route path="/aice/settings/schedule" element={<PlaceholderPage title="설정-일정" />} />
          <Route path="/aice/settings/policy" element={<PlaceholderPage title="설정-정책" />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<PlaceholderPage title="관리자 로그인" />} />
          <Route path="/admin/labs" element={<PlaceholderPage title="관리자 Labs 목록" />} />
          <Route path="/admin/labs/:labId" element={<PlaceholderPage title="관리자 Lab 편집" />} />
          <Route path="/admin/notebooks" element={<PlaceholderPage title="Notebook 템플릿" />} />
          <Route path="/admin/datasets" element={<PlaceholderPage title="Dataset 관리" />} />
          <Route path="/admin/grading" element={<PlaceholderPage title="GradingSpec 관리" />} />
          <Route path="/admin/errors" element={<PlaceholderPage title="오류코드 관리" />} />
          <Route path="/admin/policy" element={<PlaceholderPage title="정책 관리" />} />
          <Route path="/admin/releases" element={<PlaceholderPage title="배포/버전" />} />
          <Route path="/admin/analytics" element={<PlaceholderPage title="운영 분석" />} />

          <Route path="*" element={<Navigate to="/aice" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
