import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { AdminAnalyticsPage } from '@/pages/admin-analytics/page'
import { AdminDatasetsPage } from '@/pages/admin-datasets/page'
import { AdminErrorsPage } from '@/pages/admin-errors/page'
import { AdminGradingPage } from '@/pages/admin-grading/page'
import { AdminLabEditPage } from '@/pages/admin-lab-edit/page'
import { AdminLabsPage } from '@/pages/admin-labs/page'
import { AdminLoginPage } from '@/pages/admin-login/page'
import { AdminNotebooksPage } from '@/pages/admin-notebooks/page'
import { AdminPolicyPage } from '@/pages/admin-policy/page'
import { AdminReleasesPage } from '@/pages/admin-releases/page'
import { AdminPage } from '@/pages/admin/page'
import { DashboardPage } from '@/pages/dashboard/page'
import { DiagnosticPage } from '@/pages/diagnostic/page'
import { HistoryPage } from '@/pages/history/page'
import { HomePage } from '@/pages/home/page'
import { LabDetailPage } from '@/pages/lab-detail/page'
import { LabsPage } from '@/pages/labs/page'
import { MistakeDetailPage } from '@/pages/mistake-detail/page'
import { MistakesPage } from '@/pages/mistakes/page'
import { MockConsentPage } from '@/pages/mock-consent/page'
import { MockResultPage } from '@/pages/mock-result/page'
import { MockSetupPage } from '@/pages/mock-setup/page'
import { MockPage } from '@/pages/mock/page'
import { OnboardingPolicyPage } from '@/pages/onboarding-policy/page'
import { OnboardingProfilePage } from '@/pages/onboarding-profile/page'
import { OnboardingSchedulePage } from '@/pages/onboarding-schedule/page'
import { PlaceholderPage } from '@/pages/placeholder/page'
import { PlanPage } from '@/pages/plan/page'
import { PlanWeeklyPage } from '@/pages/plan-weekly/page'
import { ReferencePolicyPage } from '@/pages/reference-policy/page'
import { ReferenceViewerPage } from '@/pages/reference-viewer/page'
import { ReferencePage } from '@/pages/reference/page'
import { ReviewPage } from '@/pages/review/page'
import { SessionPage } from '@/pages/session/page'
import { SessionStartPage } from '@/pages/session-start/page'
import { SettingsPolicyPage } from '@/pages/settings-policy/page'
import { SettingsProfilePage } from '@/pages/settings-profile/page'
import { SettingsSchedulePage } from '@/pages/settings-schedule/page'
import { SettingsPage } from '@/pages/settings/page'

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/aice" replace />} />
          <Route path="/aice" element={<HomePage />} />

          <Route path="/aice/onboarding/profile" element={<OnboardingProfilePage />} />
          <Route path="/aice/onboarding/schedule" element={<OnboardingSchedulePage />} />
          <Route path="/aice/onboarding/policy" element={<OnboardingPolicyPage />} />
          <Route path="/aice/diagnostic" element={<DiagnosticPage />} />

          <Route path="/aice/plan" element={<PlanPage />} />
          <Route path="/aice/plan/day/:date" element={<PlanPage />} />
          <Route path="/aice/plan/weekly" element={<PlanWeeklyPage />} />

          <Route path="/aice/labs" element={<LabsPage />} />
          <Route path="/aice/labs/list" element={<LabsPage />} />
          <Route path="/aice/labs/:labId" element={<LabDetailPage />} />
          <Route path="/aice/labs/:labId/start" element={<SessionStartPage />} />

          <Route path="/aice/session/:sessionId" element={<SessionPage />} />
          <Route path="/aice/session/:sessionId/review" element={<ReviewPage />} />

          <Route path="/aice/mock" element={<MockPage />} />
          <Route path="/aice/mock/setup" element={<MockSetupPage />} />
          <Route path="/aice/mock/consent" element={<MockConsentPage />} />
          <Route path="/aice/mock/session/:sessionId" element={<SessionPage />} />
          <Route path="/aice/mock/session/:sessionId/result" element={<MockResultPage />} />

          <Route path="/aice/mistakes" element={<MistakesPage />} />
          <Route path="/aice/mistakes/:errorCode" element={<MistakeDetailPage />} />

          <Route path="/aice/reference" element={<ReferencePage />} />
          <Route path="/aice/reference/:docId" element={<ReferenceViewerPage />} />
          <Route path="/aice/reference/policy" element={<ReferencePolicyPage />} />

          <Route path="/aice/dashboard" element={<DashboardPage />} />
          <Route path="/aice/dashboard/history" element={<HistoryPage />} />
          <Route path="/aice/settings" element={<SettingsPage />} />
          <Route path="/aice/settings/profile" element={<SettingsProfilePage />} />
          <Route path="/aice/settings/schedule" element={<SettingsSchedulePage />} />
          <Route path="/aice/settings/policy" element={<SettingsPolicyPage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/labs" element={<AdminLabsPage />} />
          <Route path="/admin/labs/:labId" element={<AdminLabEditPage />} />
          <Route path="/admin/notebooks" element={<AdminNotebooksPage />} />
          <Route path="/admin/datasets" element={<AdminDatasetsPage />} />
          <Route path="/admin/grading" element={<AdminGradingPage />} />
          <Route path="/admin/errors" element={<AdminErrorsPage />} />
          <Route path="/admin/policy" element={<AdminPolicyPage />} />
          <Route path="/admin/releases" element={<AdminReleasesPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />

          <Route path="/login" element={<PlaceholderPage title="로그인" />} />
          <Route path="/signup" element={<PlaceholderPage title="회원가입" />} />
          <Route path="/reset-password" element={<PlaceholderPage title="비밀번호 재설정" />} />

          <Route path="*" element={<Navigate to="/aice" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
