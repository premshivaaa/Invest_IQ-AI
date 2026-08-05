import { NextRequest } from 'next/server';
import { runInvestmentResearch } from '@/agents/researchAgent';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { companyName, provider } = await req.json();

    if (!companyName || typeof companyName !== 'string' || companyName.trim() === '') {
      return new Response(JSON.stringify({ error: 'Company name is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // Helper to enqueue a structured SSE message
        const sendEvent = (data: Record<string, any>) => {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          } catch (e) {
            console.error('Error enqueuing message:', e);
          }
        };

        try {
          const report = await runInvestmentResearch(
            companyName.trim(),
            (stepId, status, message) => {
              sendEvent({ type: 'progress', stepId, status, message });
            },
            provider
          );

          // Stream the final compiled report JSON
          sendEvent({ type: 'complete', report });
          controller.close();
        } catch (err) {
          console.error('Error during streaming analysis:', err);
          sendEvent({
            type: 'error',
            message: err instanceof Error ? err.message : 'An error occurred during analysis.',
          });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Top-level API Handler error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
