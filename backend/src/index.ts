import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma, getCurrentUser } from './prisma'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const execAsync = promisify(exec)

const app = express()
const port = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev'

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite Frontend Default Port
    credentials: true
}))
app.use(express.json())

// Healthcheck
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() })
})

// === Auth Routes ===
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) return res.status(409).json({ error: { message: '이미 가입된 이메일입니다.' } })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name, role: 'USER' }
        })

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
        res.json({ data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } } })
    } catch (err: any) {
        res.status(500).json({ error: { message: err.message } })
    }
})

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(401).json({ error: { message: '사용자를 찾을 수 없습니다.' } })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ error: { message: '비밀번호가 틀렸습니다.' } })

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
        res.json({ data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } } })
    } catch (err: any) {
        res.status(500).json({ error: { message: err.message } })
    }
})

app.get('/api/auth/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: { message: 'Unauthorized' } })

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any
        const user = await prisma.user.findUnique({ where: { id: decoded.id } })
        if (!user) return res.status(401).json({ error: { message: 'User not found' } })

        res.json({ data: { user: { id: user.id, email: user.email, name: user.name, role: user.role } } })
    } catch (err) {
        res.status(401).json({ error: { message: 'Invalid token' } })
    }
})

app.delete('/api/auth/withdraw', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: { message: 'Unauthorized' } })

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any
        // Cascade delete through Schema (Session, Plan, ExamProfile...)
        await prisma.user.delete({ where: { id: decoded.id } })
        res.json({ data: { success: true } })
    } catch (err: any) {
        res.status(500).json({ error: { message: err.message } })
    }
})

// === AICE API Routes ===
// 1. Dashboard (Mistakes)
app.get('/api/aice/mistakes', async (req, res) => {
    res.json({
        data: [
            { id: 1, code: 'SCIKIT_NULL', issue: '결측치 처리 누락 (scikit-learn)', frequency: 12, severity: 'HIGH' },
            { id: 2, code: 'PANDAS_ILOC', issue: 'DataFrame 인덱싱/슬라이싱 범위 오류', frequency: 7, severity: 'MEDIUM' },
            { id: 3, code: 'API_SYNTAX', issue: '파라미터 오타 (random_state 등)', frequency: 3, severity: 'LOW' },
        ],
        meta: { requestId: `req_${Date.now()}` }
    })
})

// 2. Plan Calendar
app.get('/api/aice/plan', async (req, res) => {
    const user = await getCurrentUser()
    if (!user) return res.status(401).json({ error: 'Unauthorized' })

    const plan = await prisma.plan.findFirst({
        where: { userId: user.id },
        include: { tasks: { orderBy: { taskDate: 'asc' } } }
    })

    // Format explicitly for Vite frontend expectations (PlanTaskRow format)
    const formattedTasks = plan?.tasks.map(t => ({
        taskId: t.id,
        date: t.taskDate,
        type: t.taskType,
        title: t.title,
        estMinutes: t.estMinutes,
        status: t.status
    })) || []

    res.json({
        data: { tasks: formattedTasks },
        meta: { requestId: `req_${Date.now()}` }
    })
})

// Plan Daily
app.get('/api/aice/plan/day/:date', async (req, res) => {
    // Mock daily slice
    res.json({
        data: { tasks: [] },
        meta: { requestId: `req_${Date.now()}` }
    })
})

// 3. Textbook (Reference Docs)
app.get('/api/aice/reference/docs', async (req, res) => {
    res.json({
        data: [
            {
                id: 'tx_1',
                title: '1. Pandas 기초와 결측치 처리',
                category: 'Data Preprocessing',
                content: `# Pandas DataFrame 기초\n\n\`\`\`python\nimport pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.isnull().sum())\ndf['Age'] = df['Age'].fillna(df['Age'].mean())\n\`\`\``
            },
            {
                id: 'tx_2',
                title: '2. Scikit-Learn을 이용한 모델 학습',
                category: 'Machine Learning',
                content: `# Random Forest\n\n\`\`\`python\nfrom sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\`\`\``
            }
        ],
        meta: { requestId: `req_${Date.now()}` }
    })
})

// 4. Admin Labs (For Catalog)
app.get('/api/admin/labs', async (req, res) => {
    const labs = await prisma.lab.findMany({ orderBy: { createdAt: 'desc' } })

    // Format for frontend AdminLabRow
    const formatted = labs.map(lab => ({
        id: lab.id,
        title: lab.title,
        goal: lab.goal || '기초 실습 문항',
        steps: 5,
        time: 60,
        examMode: true,
        difficulty: lab.level === 'ASSOCIATE' ? 'MID' : 'HIGH',
        tags: ['AICE', lab.engineType],
        status: lab.status,
        version: '1.0.0'
    }))

    res.json({ data: formatted, meta: { requestId: `req_${Date.now()}` } })
})

// 5. Build Live Session Process
app.post('/api/aice/labs/:labId/sessions', async (req, res) => {
    const user = await getCurrentUser()
    if (!user) return res.status(401).json({ error: 'Unauthorized' })

    const { labId } = req.params
    const { level, mode, policyId } = req.body

    const session = await prisma.session.create({
        data: {
            userId: user.id,
            labId,
            level: level || 'Associate',
            engineType: 'JUPYTER',
            policyId: policyId || 'plc_practice',
            mode: mode || 'PRACTICE',
            status: 'CREATED'
        }
    })

    res.json({
        data: { sessionId: session.id },
        meta: { requestId: `req_${Date.now()}` }
    })
})

app.get('/api/aice/sessions/:sessionId', async (req, res) => {
    const { sessionId } = req.params
    const session = await prisma.session.findUnique({ where: { id: sessionId } })
    if (!session) return res.status(404).json({ error: 'Not found' })

    // Format for SessionResponse
    res.json({
        data: {
            sessionId: session.id,
            mode: session.mode,
            policy: { referencePolicy: 'OPEN', timeLimitSec: 3600 },
            steps: [
                { no: 1, title: '결측치 전처리', state: 'OPEN', requiredVars: ['df'] },
                { no: 2, title: '모델 학습', state: 'LOCKED', requiredVars: ['model'] },
                { no: 3, title: '평가', state: 'LOCKED', requiredVars: ['accuracy'] },
            ]
        },
        meta: { requestId: `req_${Date.now()}` }
    })
})

app.post('/api/aice/execute', async (req, res) => {
    const { code } = req.body
    if (!code) {
        return res.status(400).json({ error: { message: 'Python code is required' } })
    }

    const tempDir = os.tmpdir()
    const filename = `aice_run_${Date.now()}_${Math.random().toString(36).substring(7)}.py`
    const filepath = path.join(tempDir, filename)

    fs.writeFileSync(filepath, code)

    let runtimeMs = 0
    let errorOutput = ''
    let stdoutOutput = ''

    const startTime = Date.now()

    try {
        const { stdout, stderr } = await execAsync(`python3 ${filepath}`, { timeout: 5000 })
        runtimeMs = Date.now() - startTime
        stdoutOutput = stdout
        if (stderr) errorOutput = stderr
    } catch (err: any) {
        runtimeMs = Date.now() - startTime
        errorOutput = err.stderr || err.message
    } finally {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }
    }

    res.json({
        data: {
            output: stdoutOutput,
            errorMsg: errorOutput,
            runtimeMs
        },
        meta: { requestId: `req_${Date.now()}` }
    })
})

app.post('/api/aice/sessions/:sessionId/steps/:stepNo/submit', async (req, res) => {
    const { sessionId, stepNo } = req.params
    const { code } = req.body

    if (!code) {
        return res.status(400).json({ error: { message: 'Python code is required' } })
    }

    // 1. Write the submitted code to a temporary file
    const tempDir = os.tmpdir()
    const filename = `aice_exec_${Date.now()}_${Math.random().toString(36).substring(7)}.py`
    const filepath = path.join(tempDir, filename)

    fs.writeFileSync(filepath, code)

    let isPass = false
    let runtimeMs = 0
    let errorOutput = ''
    let stdoutOutput = ''

    const startTime = Date.now()

    try {
        // 2. Execute the python file
        // Note: For a real production aice app, this must be securely sandboxed (e.g. Docker container, gVisor)
        // Here we just use the local python executable for demo.
        const { stdout, stderr } = await execAsync(`python3 ${filepath}`, { timeout: 5000 })

        runtimeMs = Date.now() - startTime
        stdoutOutput = stdout

        if (stderr) {
            errorOutput = stderr
            isPass = false
        } else {
            // Very naive "evaluation" - if it didn't crash, we call it a pass for this PoC
            isPass = true
        }
    } catch (err: any) {
        runtimeMs = Date.now() - startTime
        isPass = false
        errorOutput = err.stderr || err.message
    } finally {
        // Clean up
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }
    }

    // 3. Save submission result to DB (only if session exists to prevent FK violation)
    const session = await prisma.session.findUnique({ where: { id: sessionId } })
    if (session) {
        await prisma.stepSubmission.create({
            data: {
                sessionId,
                stepNo: parseInt(stepNo, 10),
                attemptNo: 1, // Simplifying, a real app would count attempts
                result: isPass ? 'PASS' : 'FAIL',
                score: isPass ? 10 : 0,
                errorCodes: isPass ? '[]' : JSON.stringify(['EXECUTION_ERROR']),
                runtimeMs
            }
        })
    }

    // 4. Return result matching frontend expectations
    res.json({
        data: {
            result: isPass ? 'PASS' : 'FAIL',
            errorCodes: isPass ? [] : ['EXECUTION_ERROR'],
            output: stdoutOutput,
            errorMsg: errorOutput,
            nextSteps: [
                { no: 1, title: '결측치 전처리', state: isPass ? 'DONE' : 'OPEN', requiredVars: ['df'] },
                { no: 2, title: '모델 학습', state: isPass ? 'OPEN' : 'LOCKED', requiredVars: ['model'] },
                { no: 3, title: '평가', state: 'LOCKED', requiredVars: ['accuracy'] },
            ]
        },
        meta: { requestId: `req_${Date.now()}` }
    })
})

// Server Start
app.listen(port, () => {
    console.log(`🚀 Dedicated Backend API Server running on port ${port}`)
    console.log(`CORS enabled for http://localhost:5173`)
})
