import { Suspense, lazy, type ComponentType, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { getAuthSession } from '@/shared/api/auth'
import { ClassroomLayout } from '@/widgets/layout/ClassroomLayout'
import { MainLayout } from '@/widgets/layout/MainLayout'
import { PlaceholderPage } from '@/pages/placeholder/page'

function RouterFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
      화면을 불러오는 중입니다...
    </div>
  )
}

function lazyImport<T extends Record<string, unknown>, K extends keyof T>(
  factory: () => Promise<T>,
  name: K,
) {
  return lazy(async () => {
    const module = await factory()
    return { default: module[name] as ComponentType<unknown> }
  })
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouterFallback />}>{element}</Suspense>
}

function LegacySessionRedirect({
  to,
}: {
  to: (sessionId: string) => string
}) {
  const { sessionId = 'demo-001' } = useParams()
  return <Navigate to={to(sessionId)} replace />
}

function LegacyParamRedirect({ to }: { to: string }) {
  const params = useParams()
  const resolved = Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`:${key}`, value ?? '')
  }, to)
  return <Navigate to={resolved} replace />
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const location = useLocation()
  const session = getAuthSession()

  if (!session || session.user.role !== 'ADMIN') {
    const next = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`/admin/login?next=${next}`} replace />
  }

  return <>{children}</>
}

const HomePage = lazyImport(() => import('@/pages/home'), 'HomePage')
const ClassLevelPage = lazyImport(() => import('@/pages/class-level/page'), 'ClassLevelPage')
const CourseDetailPage = lazyImport(() => import('@/pages/course-detail/page'), 'CourseDetailPage')
const LearningPage = lazyImport(() => import('@/pages/learning/page'), 'LearningPage')

const DashboardPage = lazyImport(() => import('@/pages/dashboard/page'), 'DashboardPage')
const MyClassesPage = lazyImport(() => import('@/pages/my-classes/page'), 'MyClassesPage')
const LabsPage = lazyImport(() => import('@/pages/labs/page'), 'LabsPage')
const LabDetailPage = lazyImport(() => import('@/pages/lab-detail/page'), 'LabDetailPage')
const SessionStartPage = lazyImport(() => import('@/pages/session-start/page'), 'SessionStartPage')
const PlanPage = lazyImport(() => import('@/pages/plan/page'), 'PlanPage')
const PlanWeeklyPage = lazyImport(() => import('@/pages/plan-weekly/page'), 'PlanWeeklyPage')
const PlanSprintPage = lazyImport(() => import('@/pages/plan-sprint/page'), 'PlanSprintPage')
const TextbookPage = lazyImport(() => import('@/pages/textbook/page'), 'TextbookPage')
const TextbookViewerPage = lazyImport(
  () => import('@/pages/textbook-viewer/page'),
  'TextbookViewerPage',
)
const OnboardingProfilePage = lazyImport(
  () => import('@/pages/onboarding-profile/page'),
  'OnboardingProfilePage',
)
const OnboardingEntryPage = lazyImport(
  () => import('@/pages/onboarding-entry/page'),
  'OnboardingEntryPage',
)
const OnboardingSchedulePage = lazyImport(
  () => import('@/pages/onboarding-schedule/page'),
  'OnboardingSchedulePage',
)
const OnboardingPolicyPage = lazyImport(
  () => import('@/pages/onboarding-policy/page'),
  'OnboardingPolicyPage',
)
const DiagnosticPage = lazyImport(() => import('@/pages/diagnostic/page'), 'DiagnosticPage')
const MistakesPage = lazyImport(() => import('@/pages/mistakes/page'), 'MistakesPage')
const MistakeDetailPage = lazyImport(
  () => import('@/pages/mistake-detail/page'),
  'MistakeDetailPage',
)
const ReferencePage = lazyImport(() => import('@/pages/reference/page'), 'ReferencePage')
const ReferenceViewerPage = lazyImport(
  () => import('@/pages/reference-viewer/page'),
  'ReferenceViewerPage',
)
const ReferencePolicyPage = lazyImport(
  () => import('@/pages/reference-policy/page'),
  'ReferencePolicyPage',
)
const HistoryPage = lazyImport(() => import('@/pages/history/page'), 'HistoryPage')
const SettingsPage = lazyImport(() => import('@/pages/settings/page'), 'SettingsPage')
const SettingsProfilePage = lazyImport(
  () => import('@/pages/settings-profile/page'),
  'SettingsProfilePage',
)
const SettingsSchedulePage = lazyImport(
  () => import('@/pages/settings-schedule/page'),
  'SettingsSchedulePage',
)
const SettingsPolicyPage = lazyImport(
  () => import('@/pages/settings-policy/page'),
  'SettingsPolicyPage',
)

const SessionPage = lazyImport(() => import('@/pages/session/page'), 'SessionPage')
const ReviewPage = lazyImport(() => import('@/pages/review/page'), 'ReviewPage')
const MockPage = lazyImport(() => import('@/pages/mock/page'), 'MockPage')
const MockSetupPage = lazyImport(() => import('@/pages/mock-setup/page'), 'MockSetupPage')
const MockConsentPage = lazyImport(() => import('@/pages/mock-consent/page'), 'MockConsentPage')
const MockResultPage = lazyImport(() => import('@/pages/mock-result/page'), 'MockResultPage')

const AdminPage = lazyImport(() => import('@/pages/admin/page'), 'AdminPage')
const AdminLoginPage = lazyImport(() => import('@/pages/admin-login/page'), 'AdminLoginPage')
const AdminLabsPage = lazyImport(() => import('@/pages/admin-labs/page'), 'AdminLabsPage')
const AdminLabEditPage = lazyImport(() => import('@/pages/admin-lab-edit/page'), 'AdminLabEditPage')
const AdminNotebooksPage = lazyImport(
  () => import('@/pages/admin-notebooks/page'),
  'AdminNotebooksPage',
)
const AdminDatasetsPage = lazyImport(() => import('@/pages/admin-datasets/page'), 'AdminDatasetsPage')
const AdminGradingPage = lazyImport(() => import('@/pages/admin-grading/page'), 'AdminGradingPage')
const AdminErrorsPage = lazyImport(() => import('@/pages/admin-errors/page'), 'AdminErrorsPage')
const AdminPolicyPage = lazyImport(() => import('@/pages/admin-policy/page'), 'AdminPolicyPage')
const AdminReleasesPage = lazyImport(() => import('@/pages/admin-releases/page'), 'AdminReleasesPage')
const AdminAnalyticsPage = lazyImport(
  () => import('@/pages/admin-analytics/page'),
  'AdminAnalyticsPage',
)

const CBTExamPage = lazyImport(() => import('@/pages/exam/cbt/page'), 'CBTExamPage')
const ExamResultPage = lazyImport(() => import('@/pages/exam/cbt/result'), 'ExamResultPage')
const ProposalPage = lazyImport(() => import('@/pages/proposal/page'), 'ProposalPage')



export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/exam/cbt/:examId" element={withSuspense(<CBTExamPage />)} />
        <Route path="/exam/cbt/:examId/result" element={withSuspense(<ExamResultPage />)} />

        <Route path="/proposal" element={withSuspense(<ProposalPage />)} />

        <Route element={<MainLayout />}>
          <Route path="/" element={withSuspense(<HomePage />)} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/report" element={withSuspense(<DashboardPage />)} />
          <Route path="/class/:level" element={withSuspense(<ClassLevelPage />)} />
          <Route path="/course/:courseId" element={withSuspense(<CourseDetailPage />)} />
          <Route path="/course/:courseId/:stepId" element={withSuspense(<LearningPage />)} />

          <Route path="/labs" element={withSuspense(<LabsPage />)} />
          <Route path="/labs/:labId" element={withSuspense(<LabDetailPage />)} />
          <Route path="/labs/:labId/start" element={withSuspense(<SessionStartPage />)} />
          <Route path="/classes" element={withSuspense(<MyClassesPage />)} />

          <Route path="/onboarding" element={withSuspense(<OnboardingEntryPage />)} />
          <Route path="/onboarding/profile" element={withSuspense(<OnboardingProfilePage />)} />
          <Route path="/onboarding/schedule" element={withSuspense(<OnboardingSchedulePage />)} />
          <Route path="/onboarding/policy" element={withSuspense(<OnboardingPolicyPage />)} />
          <Route path="/diagnostic" element={withSuspense(<DiagnosticPage />)} />

          <Route path="/plan" element={withSuspense(<PlanPage />)} />
          <Route path="/plan/day/:date" element={withSuspense(<PlanPage />)} />
          <Route path="/plan/weekly" element={withSuspense(<PlanWeeklyPage />)} />
          <Route path="/plan/sprint" element={withSuspense(<PlanSprintPage />)} />
          <Route path="/textbook" element={withSuspense(<TextbookPage />)} />
          <Route path="/textbook/:chapterId" element={withSuspense(<TextbookViewerPage />)} />

          <Route path="/mistakes" element={withSuspense(<MistakesPage />)} />
          <Route path="/mistakes/:errorCode" element={withSuspense(<MistakeDetailPage />)} />

          <Route path="/reference" element={withSuspense(<ReferencePage />)} />
          <Route path="/reference/:docId" element={withSuspense(<ReferenceViewerPage />)} />
          <Route path="/reference/policy" element={withSuspense(<ReferencePolicyPage />)} />

          <Route path="/history" element={withSuspense(<HistoryPage />)} />

          <Route path="/settings" element={withSuspense(<SettingsPage />)} />
          <Route path="/settings/profile" element={withSuspense(<SettingsProfilePage />)} />
          <Route path="/settings/schedule" element={withSuspense(<SettingsSchedulePage />)} />
          <Route path="/settings/policy" element={withSuspense(<SettingsPolicyPage />)} />

          <Route path="/mock" element={withSuspense(<MockPage />)} />
          <Route path="/mock/setup" element={withSuspense(<MockSetupPage />)} />
          <Route path="/mock/consent" element={withSuspense(<MockConsentPage />)} />

          <Route
            path="/admin"
            element={withSuspense(
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>,
            )}
          />
          <Route path="/admin/login" element={withSuspense(<AdminLoginPage />)} />
          <Route
            path="/admin/labs"
            element={withSuspense(
              <RequireAdmin>
                <AdminLabsPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/labs/:labId"
            element={withSuspense(
              <RequireAdmin>
                <AdminLabEditPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/notebooks"
            element={withSuspense(
              <RequireAdmin>
                <AdminNotebooksPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/datasets"
            element={withSuspense(
              <RequireAdmin>
                <AdminDatasetsPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/grading"
            element={withSuspense(
              <RequireAdmin>
                <AdminGradingPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/errors"
            element={withSuspense(
              <RequireAdmin>
                <AdminErrorsPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/policy"
            element={withSuspense(
              <RequireAdmin>
                <AdminPolicyPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/releases"
            element={withSuspense(
              <RequireAdmin>
                <AdminReleasesPage />
              </RequireAdmin>,
            )}
          />
          <Route
            path="/admin/analytics"
            element={withSuspense(
              <RequireAdmin>
                <AdminAnalyticsPage />
              </RequireAdmin>,
            )}
          />

          <Route path="/login" element={withSuspense(<PlaceholderPage title="로그인" />)} />
          <Route path="/signup" element={withSuspense(<PlaceholderPage title="회원가입" />)} />
          <Route
            path="/reset-password"
            element={withSuspense(<PlaceholderPage title="비밀번호 재설정" />)}
          />

          <Route path="/explore" element={<Navigate to="/labs" replace />} />
          <Route path="/my-classes" element={<Navigate to="/classes" replace />} />

          <Route path="/aice" element={<Navigate to="/" replace />} />
          <Route path="/aice/dashboard" element={<Navigate to="/report" replace />} />
          <Route path="/aice/dashboard/history" element={<Navigate to="/history" replace />} />
          <Route path="/aice/labs" element={<Navigate to="/labs" replace />} />
          <Route path="/aice/labs/list" element={<Navigate to="/labs" replace />} />
          <Route
            path="/aice/labs/:labId"
            element={withSuspense(<LegacyParamRedirect to="/labs/:labId" />)}
          />
          <Route
            path="/aice/labs/:labId/start"
            element={withSuspense(<LegacyParamRedirect to="/labs/:labId/start" />)}
          />
          <Route path="/aice/onboarding" element={<Navigate to="/onboarding" replace />} />
          <Route path="/aice/onboarding/profile" element={<Navigate to="/onboarding/profile" replace />} />
          <Route path="/aice/onboarding/schedule" element={<Navigate to="/onboarding/schedule" replace />} />
          <Route path="/aice/onboarding/policy" element={<Navigate to="/onboarding/policy" replace />} />
          <Route path="/aice/diagnostic" element={<Navigate to="/diagnostic" replace />} />
          <Route path="/aice/plan" element={<Navigate to="/plan" replace />} />
          <Route
            path="/aice/plan/day/:date"
            element={withSuspense(<LegacyParamRedirect to="/plan/day/:date" />)}
          />
          <Route path="/aice/plan/weekly" element={<Navigate to="/plan/weekly" replace />} />
          <Route path="/aice/plan/sprint" element={<Navigate to="/plan/sprint" replace />} />
          <Route path="/aice/textbook" element={<Navigate to="/textbook" replace />} />
          <Route
            path="/aice/textbook/:chapterId"
            element={withSuspense(<LegacyParamRedirect to="/textbook/:chapterId" />)}
          />
          <Route path="/aice/mistakes" element={<Navigate to="/mistakes" replace />} />
          <Route
            path="/aice/mistakes/:errorCode"
            element={withSuspense(<LegacyParamRedirect to="/mistakes/:errorCode" />)}
          />
          <Route path="/aice/reference" element={<Navigate to="/reference" replace />} />
          <Route
            path="/aice/reference/:docId"
            element={withSuspense(<LegacyParamRedirect to="/reference/:docId" />)}
          />
          <Route path="/aice/reference/policy" element={<Navigate to="/reference/policy" replace />} />
          <Route path="/aice/settings" element={<Navigate to="/settings" replace />} />
          <Route path="/aice/settings/profile" element={<Navigate to="/settings/profile" replace />} />
          <Route path="/aice/settings/schedule" element={<Navigate to="/settings/schedule" replace />} />
          <Route path="/aice/settings/policy" element={<Navigate to="/settings/policy" replace />} />
          <Route path="/aice/mock" element={<Navigate to="/mock" replace />} />
          <Route path="/aice/mock/setup" element={<Navigate to="/mock/setup" replace />} />
          <Route path="/aice/mock/consent" element={<Navigate to="/mock/consent" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route element={<ClassroomLayout />}>
          <Route path="/learning/session/:sessionId" element={withSuspense(<SessionPage />)} />
          <Route
            path="/learning/session/:sessionId/review"
            element={withSuspense(<ReviewPage />)}
          />
          <Route path="/mock/session/:sessionId" element={withSuspense(<SessionPage />)} />
          <Route
            path="/mock/session/:sessionId/result"
            element={withSuspense(<MockResultPage />)}
          />

          <Route
            path="/aice/session/:sessionId"
            element={withSuspense(
              <LegacySessionRedirect to={(sessionId) => `/learning/session/${sessionId}`} />,
            )}
          />
          <Route
            path="/aice/session/:sessionId/review"
            element={withSuspense(
              <LegacySessionRedirect
                to={(sessionId) => `/learning/session/${sessionId}/review`}
              />,
            )}
          />
          <Route
            path="/aice/mock/session/:sessionId"
            element={withSuspense(
              <LegacySessionRedirect to={(sessionId) => `/mock/session/${sessionId}`} />,
            )}
          />
          <Route
            path="/aice/mock/session/:sessionId/result"
            element={withSuspense(
              <LegacySessionRedirect to={(sessionId) => `/mock/session/${sessionId}/result`} />,
            )}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
