const https = require('https');

const DEFAULT_TIMEOUT_MS = 10000;
const SUPABASE_HEALTH_PATH = '/auth/v1/health';
const MAX_DETAIL_LENGTH = 500;

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(payload)
  };
}

function getConfig(env = process.env) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseAnonKey = env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      error: 'Variables de entorno requeridas: SUPABASE_URL y SUPABASE_ANON_KEY'
    };
  }

  let url;
  try {
    url = new URL(supabaseUrl);
  } catch (error) {
    return { error: 'SUPABASE_URL no es una URL válida' };
  }

  if (url.protocol !== 'https:') {
    return { error: 'SUPABASE_URL debe usar HTTPS' };
  }

  return { supabaseUrl: url, supabaseAnonKey };
}

async function runKeepAlive(options = {}) {
  const timestamp = new Date().toISOString();
  const config = getConfig(options.env);

  if (config.error) {
    return {
      ok: false,
      statusCode: 500,
      payload: {
        status: 'error',
        message: config.error,
        timestamp
      }
    };
  }

  try {
    const result = await pingSupabase({
      supabaseUrl: config.supabaseUrl,
      supabaseAnonKey: config.supabaseAnonKey,
      timeoutMs: options.timeoutMs || DEFAULT_TIMEOUT_MS
    });

    const healthy = result.statusCode >= 200 && result.statusCode < 500;

    return {
      ok: healthy,
      statusCode: healthy ? 200 : 502,
      payload: {
        status: healthy ? 'ok' : 'error',
        message: healthy
          ? 'Supabase keep-alive ejecutado correctamente'
          : 'Supabase respondió con un error inesperado',
        timestamp,
        supabase: {
          host: config.supabaseUrl.hostname,
          path: SUPABASE_HEALTH_PATH,
          statusCode: result.statusCode,
          detail: sanitizeDetail(result.body)
        }
      }
    };
  } catch (error) {
    return {
      ok: false,
      statusCode: 502,
      payload: {
        status: 'error',
        message: error.message,
        timestamp
      }
    };
  }
}

function pingSupabase({ supabaseUrl, supabaseAnonKey, timeoutMs }) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: supabaseUrl.hostname,
      path: SUPABASE_HEALTH_PATH,
      method: 'GET',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: 'application/json',
        'User-Agent': 'Axentral-KeepAlive/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
        if (data.length > MAX_DETAIL_LENGTH) {
          req.destroy(new Error('Respuesta de Supabase demasiado grande'));
        }
      });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });

    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error('Timeout: Supabase no respondió a tiempo'));
    });
    req.end();
  });
}

function sanitizeDetail(body) {
  if (!body) return '';
  return body.length > MAX_DETAIL_LENGTH
    ? `${body.slice(0, MAX_DETAIL_LENGTH)}...`
    : body;
}

module.exports = {
  jsonResponse,
  runKeepAlive
};
