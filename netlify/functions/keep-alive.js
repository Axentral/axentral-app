const https = require('https');

const SUPABASE_URL     = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

exports.handler = async function(event, context) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Axentral Keep-Alive iniciado`);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Variables de entorno no configuradas',
        timestamp
      })
    };
  }

  try {
    const result = await pingSupabase();
    console.log(`[${timestamp}] Supabase respondió: ${result.statusCode}`);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status:    'ok',
        message:   'Supabase keep-alive exitoso',
        timestamp,
        supabase:  result.statusCode,
        detail:    result.body
      })
    };
  } catch (error) {
    console.error(`[${timestamp}] Error:`, error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: error.message, timestamp })
    };
  }
};

function pingSupabase() {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/auth/v1/health`);
    const options = {
      hostname: url.hostname,
      path:     url.pathname,
      method:   'GET',
      headers: {
        'apikey':       SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'User-Agent':   'Axentral-KeepAlive/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout: Supabase no respondió'));
    });
    req.end();
  });
}
