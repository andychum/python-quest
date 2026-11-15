const runtimeURL = new URL('./pyodide/', self.location.href);
let python;

self.onmessage = async ({ data: { code } }) => {
  if (!python) {
    try {
      importScripts(new URL('pyodide.js', runtimeURL).href);
      python = await loadPyodide({ indexURL: runtimeURL.href });
      self.postMessage({ kind: 'ready' });
    } catch (error) {
      self.postMessage({ kind: 'load-error', error: String(error) });
      return;
    }
  }

  let output = '';
  let stderr = '';
  const decoder = new TextDecoder();
  const globals = python.toPy({});
  try {
    python.setStdout({ write: bytes => {
      output += decoder.decode(bytes, { stream: true });
      return bytes.length;
    } });
    python.setStderr({ batched: line => { stderr += line + '\n'; } });
    const result = await python.runPythonAsync(code, { globals });
    if (result instanceof python.ffi.PyProxy) result.destroy();
    self.postMessage({ kind: 'result', output: output + decoder.decode(), stderr });
  } catch (error) {
    self.postMessage({ kind: 'result', output: output + decoder.decode(), stderr, error: String(error) });
  } finally {
    globals.destroy();
  }
};
