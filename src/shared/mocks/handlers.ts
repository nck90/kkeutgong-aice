import { http, HttpResponse } from 'msw'
import { labs, planTasks, sessionStepsSeed } from './data'

export const handlers = [
  http.get('/api/labs', () => HttpResponse.json({ data: labs })),
  http.get('/api/plan', ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const items = date ? planTasks.filter((task) => task.date === date) : planTasks
    return HttpResponse.json({ data: items })
  }),
  http.get('/api/session/:sessionId', ({ params }) =>
    HttpResponse.json({
      data: {
        sessionId: params.sessionId,
        mode: 'Practice+',
        steps: sessionStepsSeed,
      },
    }),
  ),
]
