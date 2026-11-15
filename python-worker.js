const runtimeURL = new URL('./pyodide/', self.location.href);
let python;
let flushStreams;

self.onmessage = async ({ data: { code } }) => {
  if (!python) {
    try {
      importScripts(new URL('pyodide.js', runtimeURL).href);
      python = await loadPyodide({ indexURL: runtimeURL.href });
      flushStreams = python.runPython(`
def _make_flush(stdout, stderr):
    def flush():
        stdout.flush()
        stderr.flush()
    return flush

_make_flush(__import__('sys').stdout, __import__('sys').stderr)
`);
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
  let error;
  try {
    python.setStdout({ write: bytes => {
      output += decoder.decode(bytes, { stream: true });
      return bytes.length;
    } });
    python.setStderr({ batched: line => { stderr += line + '\n'; } });
    const result = await python.runPythonAsync(code, { globals });
    if (result instanceof python.ffi.PyProxy) result.destroy();
  } catch (exception) {
    error = String(exception);
  } finally {
    try {
      flushStreams();
    } catch (exception) {
      error ??= String(exception);
    }
    globals.destroy();
  }
  self.postMessage({ kind: 'result', output: output + decoder.decode(), stderr, error });
};
