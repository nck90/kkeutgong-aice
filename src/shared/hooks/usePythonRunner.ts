import { useEffect, useRef, useState } from 'react'

type PythonRunnerAction = 'RUN' | 'SUBMIT'
type RunResult = { type: 'success' | 'error' | 'stdout' | 'stderr' | 'submit_success' | 'submit_error' | 'ready' | 'init_error', text?: string, error?: string, id?: string }

// Singleton worker to avoid reloading heavy Pyodide on every component remount
let globalWorker: Worker | null = null;
let globalReady = false;

export function usePythonRunner() {
    const [isReady, setIsReady] = useState(globalReady)
    const [isRunning, setIsRunning] = useState(false)
    const [output, setOutput] = useState<string[]>([])

    // Callbacks map
    const resolvers = useRef<Record<string, { resolve: (res: any) => void, reject: (err: any) => void }>>({})

    useEffect(() => {
        if (!globalWorker) {
            globalWorker = new Worker('/pythonWorker.js')
            globalWorker.onmessage = (e) => {
                const data = e.data as RunResult
                if (data.type === 'ready') {
                    globalReady = true
                    setIsReady(true)
                }
            }
        } else if (globalReady) {
            setIsReady(true)
        }

        // We need to attach an event listener that knows our current state
        const handleMessage = (e: MessageEvent) => {
            const data = e.data as RunResult;

            if (data.type === 'stdout' || data.type === 'stderr') {
                if (data.text) {
                    setOutput(prev => [...prev, data.text!])
                }
                return;
            }

            if (data.id && resolvers.current[data.id]) {
                const { resolve, reject } = resolvers.current[data.id]
                if (data.type === 'success' || data.type === 'submit_success') {
                    resolve(true)
                } else if (data.type === 'error' || data.type === 'submit_error') {
                    reject(new Error(data.error))
                }
                delete resolvers.current[data.id]
            }
        }

        // Override the global listener, but be careful with multiple consumers.
        // For our app, there's only one CodeEditorPanel at a time.
        globalWorker.addEventListener('message', handleMessage)
        return () => globalWorker?.removeEventListener('message', handleMessage)
    }, [])

    const runAction = async (action: PythonRunnerAction, code: string, testCode?: string) => {
        if (!globalWorker || !isReady) throw new Error("Python Runtime is not ready yet.")
        setIsRunning(true)
        setOutput([]) // Clear previous output on new run

        try {
            const id = Math.random().toString(36).substring(7)
            const promise = new Promise<boolean>((resolve, reject) => {
                resolvers.current[id] = { resolve, reject }
            })

            globalWorker.postMessage({ id, action, code, testCode })
            await promise
            return true
        } finally {
            setIsRunning(false)
        }
    }

    const runCode = (code: string) => runAction('RUN', code)
    const submitCode = (code: string, testCode?: string) => runAction('SUBMIT', code, testCode)

    return { isReady, isRunning, output, runCode, submitCode, setOutput }
}
