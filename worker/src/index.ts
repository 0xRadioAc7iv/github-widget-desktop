export default {
	async fetch(request: Request, env: any) {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			});
		}

		const url = new URL(request.url);
		const GITHUB_USERNAME = url.searchParams.get('username');

		if (!GITHUB_USERNAME) {
			return new Response("Missing 'username' query parameter", { status: 400 });
		}

		const GITHUB_PAT = env.GITHUB_PAT;

		const START_DATE = new Date();
		START_DATE.setDate(START_DATE.getDate() - 182);
		const START_DATE_ISO = START_DATE.toISOString();
		const END_DATE_ISO = new Date().toISOString();

		const query = JSON.stringify({
			query: `
			  {
				user(login: "${GITHUB_USERNAME}") {
				  contributionsCollection(from: "${START_DATE_ISO}", to: "${END_DATE_ISO}") {
					contributionCalendar {
					  weeks {
						contributionDays {
						  date
						  contributionCount
						  color
						}
					  }
					}
				  }
				}
			  }
			`,
		});

		try {
			const response = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${GITHUB_PAT}`,
					'User-Agent': 'Cloudflare-Worker',
					'Content-Type': 'application/json',
				},
				body: query,
			});

			const data: any = await response.json();
			if (!response.ok) {
				return new Response(JSON.stringify({ error: data }), {
					status: response.status,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			}

			return new Response(JSON.stringify(data.data.user.contributionsCollection.contributionCalendar.weeks), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			});
		} catch (error: any) {
			return new Response(JSON.stringify({ error: 'Internal Worker Error', details: error.message }), {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			});
		}
	},
} satisfies ExportedHandler<Env>;
