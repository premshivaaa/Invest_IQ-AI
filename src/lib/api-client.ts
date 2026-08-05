export async function streamAnalysis(
  companyName: string,
  provider: 'openai' | 'gemini',
  onProgress: (stepId: string, status: 'running' | 'success' | 'error', message?: string) => void,
  onComplete: (report: any) => void,
  onError: (error: string) => void
) {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName, provider }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Streaming not supported by response.');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      
      // Keep any trailing incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        const cleanLine = line.trim();
        if (!cleanLine.startsWith('data: ')) continue;
        
        const jsonStr = cleanLine.substring(6).trim();
        try {
          const data = JSON.parse(jsonStr);
          if (data.type === 'progress') {
            onProgress(data.stepId, data.status, data.message);
          } else if (data.type === 'complete') {
            onComplete(data.report);
          } else if (data.type === 'error') {
            onError(data.message);
          }
        } catch (e) {
          console.error('Failed to parse SSE JSON:', jsonStr, e);
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error.message : String(error));
  }
}
