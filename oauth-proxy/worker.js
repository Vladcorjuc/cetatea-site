// Proxy OAuth pentru Decap CMS (GitHub backend), rulat pe Cloudflare Workers.
//
// Fluxul: panoul /admin deschide {base_url}/auth → redirecționăm către GitHub
// → GitHub revine la /callback cu un cod → schimbăm codul pe un token și îl
// trimitem înapoi ferestrei /admin prin postMessage (protocolul Decap).
//
// Necesită variabilele: GITHUB_CLIENT_ID (var) și GITHUB_CLIENT_SECRET (secret).

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorize.searchParams.set('redirect_uri', `${url.origin}/callback`);
      authorize.searchParams.set('scope', url.searchParams.get('scope') ?? 'repo');
      return Response.redirect(authorize.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Lipsește codul de autorizare.', { status: 400 });
      }

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const tokenData = await tokenResponse.json();

      const status = tokenData.error ? 'error' : 'success';
      const payload = tokenData.error
        ? { error: tokenData.error_description ?? tokenData.error }
        : { token: tokenData.access_token, provider: 'github' };

      // Handshake-ul postMessage așteptat de Decap CMS.
      const html = `<!doctype html>
<html><body><script>
  (function () {
    function receiveMessage() {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(payload).replace(/'/g, "\\'")}',
        '*'
      );
      window.removeEventListener('message', receiveMessage);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>Autentificare finalizată. Puteți închide fereastra.</body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    return new Response('Proxy OAuth Decap CMS — folosiți /auth pentru autentificare.', {
      status: 404,
    });
  },
};
