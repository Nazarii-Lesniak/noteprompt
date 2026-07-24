// CORS headers for browser interaction
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, content-type',
};

interface IncomingMessage {
	role?: string;
	content?: string;
	text?: string;
}

Deno.serve(async (req: Request) => {
	// Handle CORS preflight options request
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
		if (!geminiApiKey) {
			return new Response(
				JSON.stringify({
					error: 'GEMINI_API_KEY environment variable is not configured',
				}),
				{
					status: 500,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				},
			);
		}

		if (req.method !== 'POST') {
			return new Response(
				JSON.stringify({ error: 'Method not allowed. Use POST.' }),
				{
					status: 405,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				},
			);
		}

		const { messages } = await req.json();
		if (!Array.isArray(messages)) {
			return new Response(
				JSON.stringify({
					error:
						'Invalid request: "messages" parameter is required and must be an array',
				}),
				{
					status: 400,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				},
			);
		}

		// Map messages payload to Gemini API structure (role must be 'user' or 'model')
		const contents = messages.map((msg: IncomingMessage) => {
			const role = msg.role === 'assistant' ? 'model' : 'user';
			const text = msg.content || msg.text || '';
			return {
				role,
				parts: [{ text }],
			};
		});

		const model = 'gemini-2.5-flash';
		const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-goog-api-key': geminiApiKey,
			},
			body: JSON.stringify({ contents }),
		});

		if (!response.ok) {
			let errorText = '';
			try {
				errorText = await response.text();
			} catch {
				errorText = 'Failed to read response error stream from Gemini API';
			}

			// Redact the API key if it happens to be in the response error text
			const sanitizedError = errorText.replaceAll(geminiApiKey, 'REDACTED');
			return new Response(
				JSON.stringify({
					error: 'Gemini API returned an error',
					details: sanitizedError,
				}),
				{
					status: response.status,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				},
			);
		}

		// Pipe the response body stream directly to the client as Server-Sent Events
		return new Response(response.body, {
			headers: {
				...corsHeaders,
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			},
		});
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error occurred';

		return new Response(
			JSON.stringify({ error: 'Internal Server Error', details: errorMessage }),
			{
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			},
		);
	}
});
