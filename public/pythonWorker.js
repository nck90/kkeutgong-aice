importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodideReadyPromise;

async function loadPyodideAndPackages() {
    try {
        self.pyodide = await loadPyodide({
            stdout: (text) => self.postMessage({ type: 'stdout', text }),
            stderr: (text) => self.postMessage({ type: 'stderr', text })
        });

        // Load common data science packages used in AICE
        await self.pyodide.loadPackage("micropip");
        const micropip = self.pyodide.pyimport("micropip");
        await micropip.install(["pandas", "numpy", "scikit-learn"]);

        self.postMessage({ type: 'ready' });
    } catch (e) {
        self.postMessage({ type: 'init_error', error: e.message });
    }
}

pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
    // Make sure execution waits until Pyodide is loaded
    await pyodideReadyPromise;
    const { id, code, testCode, action } = event.data;

    // Isolate variables by creating a new dictionary per run (optional, but good for testing)
    // Actually, persisting is closer to jupyter, but testing requires isolation or just continuous execution.
    // For now, we will just run it in the global context.

    if (action === 'RUN') {
        try {
            await self.pyodide.loadPackagesFromImports(code);
            await self.pyodide.runPythonAsync(code);
            self.postMessage({ id, type: 'success' });
        } catch (error) {
            self.postMessage({ id, type: 'error', error: error.message });
        }
    } else if (action === 'SUBMIT') {
        try {
            await self.pyodide.loadPackagesFromImports(code);
            // Run user code
            await self.pyodide.runPythonAsync(code);
            // Run validation tests
            if (testCode) {
                await self.pyodide.runPythonAsync(testCode);
            }
            self.postMessage({ id, type: 'submit_success' });
        } catch (error) {
            self.postMessage({ id, type: 'submit_error', error: error.message });
        }
    }
};
