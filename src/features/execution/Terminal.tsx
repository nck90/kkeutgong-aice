import { useEffect, useRef } from "react"
import { Terminal as XTerminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import "xterm/css/xterm.css"

interface TerminalProps {
    logs: string[]
}

export function Terminal({ logs }: TerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<XTerminal | null>(null)
    const fitAddonRef = useRef<FitAddon | null>(null)

    useEffect(() => {
        if (!terminalRef.current) return

        const term = new XTerminal({
            cursorBlink: true,
            fontSize: 13,
            fontFamily: "'D2Coding', 'Consolas', monospace",
            theme: {
                background: "#1e1e1e",
                foreground: "#ffffff",
            },
            rows: 10,
        })

        const fitAddon = new FitAddon()
        term.loadAddon(fitAddon)

        term.open(terminalRef.current)
        fitAddon.fit()

        xtermRef.current = term
        fitAddonRef.current = fitAddon

        term.writeln("\x1b[1;32m$ AICE Environment Initialized...\x1b[0m")

        const handleResize = () => fitAddon.fit()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            term.dispose()
        }
    }, [])

    useEffect(() => {
        if (xtermRef.current && logs.length > 0) {
            // Write latest logs
            const latestLog = logs[logs.length - 1]
            xtermRef.current.writeln(latestLog)
        }
    }, [logs])

    // Re-fit when logs change or container resizes
    useEffect(() => {
        setTimeout(() => {
            fitAddonRef.current?.fit()
        }, 100)
    }, [logs])

    return <div ref={terminalRef} className="h-full w-full bg-[#1e1e1e] p-2 overflow-hidden" />
}
