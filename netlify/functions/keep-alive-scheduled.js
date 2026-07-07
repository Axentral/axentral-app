const { jsonResponse, runKeepAlive } = require('./lib/supabase-keep-alive');

exports.handler = async function handler(event = {}) {
  const result = await runKeepAlive();
  const nextRun = event.body ? safeParseNextRun(event.body) : null;

  console.log(
    `[${result.payload.timestamp}] keep-alive programado: ${result.payload.status}` +
      (nextRun ? ` | próxima ejecución: ${nextRun}` : '')
  );

  return jsonResponse(result.statusCode, {
    ...result.payload,
    scheduled: true,
    nextRun
  });
};

function safeParseNextRun(body) {
  try {
    const parsed = JSON.parse(body);
    return parsed.next_run || null;
  } catch (error) {
    return null;
  }
}
