export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const base = `${url.protocol}//${url.host}`;
  const timestamp = Date.now().toString();

  const imageUrl = `${base}/api/frame.png?v=${timestamp}`;
  const txUrl = `${base}/api/tx?v=${timestamp}`;

  const html = `
    <html>
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta property="og:title" content="Base Caster Lab ✦" />
        <meta property="og:description" content="Summon your Base prediction." />
        <meta property="og:image" content="${imageUrl}" />
        
        <meta property="fc:frame" content="1" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="Summon Fate" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="${txUrl}" />
      </head>
      <body>
        <p>Base Caster Frame active at ${new Date().toISOString()}</p>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "no-store",
    },
  });
}
