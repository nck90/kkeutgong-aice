import Editor, { type OnMount } from "@monaco-editor/react"
import { useRef } from "react"

interface MonacoEditorProps {
    value: string
    onChange?: (value: string | undefined) => void
    language?: string
    readOnly?: boolean
}

export function MonacoEditor({
    value,
    onChange,
    language = "python",
    readOnly = false,
}: MonacoEditorProps) {
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null)

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor

        // Define Elice-like theme
        monaco.editor.defineTheme("elice-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#1e1e1e",
            },
        })
    }

    return (
        <div className="h-full w-full overflow-hidden rounded-md border border-border">
            <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={value}
                theme="elice-dark"
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'D2Coding', 'Consolas', monospace",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly,
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    )
}
