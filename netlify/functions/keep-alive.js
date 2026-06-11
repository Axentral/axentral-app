// ============================================================
// AXENTRAL — Keep-Alive para Supabase
// Se ejecuta automáticamente cada 4 días via Netlify Scheduler
// Hace una consulta simple a Supabase para evitar que se pause
// axentral.com
// ============================================================

const https = require('https');

// ── CONFIGURACIÓN ────────────────────────────────────────────
// Estas variables se configuran en Netlify → Site Settings
// → Environment Variables (NUNCA hardcodear aquí)
const SUPABASE_URL    = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// ── FUNCIÓN PRINCIPAL ────────────────────────────────────────
exports.handler = async function(event, context) {

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Axentral Keep-Alive iniciado`);

  // Verificar que las variables de entorno estén configuradas
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const msg = 'ERROR: Variables de entorno no configuradas. ' +
                'Agregá SUPABASE_URL y SUPABASE_ANON_KEY en Netlify.';
    console.error(msg);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: msg, timestamp })
    };
  }

  try {
    // Hacer una consulta simple a Supabase
    // Consulta la versión de PostgreSQL — no necesita tablas creadas
    const result = await pingSupabase();

    console.log(`[${timestamp}] ✅ Supabase respondió correctamente`);
    console.log(`[${timestamp}] Respuesta: ${JSON.stringify(result)}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status:    'ok',
        message:   'Supabase keep-alive exitoso',
        timestamp,
        project:   SUPABASE_URL.replace('https://', '').split('.')[0],
        response:  result
      })
    };

  } catch (error) {
    console.error(`[${timestamp}] ❌ Error en keep-alive:`, error.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status:    'error',
        message:   error.message,
        timestamp
      })
    };
  }
};

// ── PING A SUPABASE ──────────────────────────────────────────
function pingSupabase() {
  return new Promise((resolve, reject) => {

    // URL del endpoint REST de Supabase
    // /rest/v1/ sin tabla devuelve info del API — consulta mínima
    const url = new URL(`${SUPABASE_URL}/rest/v1/`);

    const options = {
      hostname: url.hostname,
      path:     url.pathname,
      method:   'GET',
      headers: {
        'apikey':        SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type':  'application/json',
        'User-Agent':    'Axentral-KeepAlive/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers:    res.headers,
          body:       data.substring(0, 200) // solo los primeros 200 chars
        });
      });
    });

    req.on('error', reject);

    // Timeout de 10 segundos
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout: Supabase no respondió en 10 segundos'));
    });

    req.end();
  });
}
