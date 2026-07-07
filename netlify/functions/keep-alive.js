const { jsonResponse, runKeepAlive } = require('./lib/supabase-keep-alive');

exports.handler = async function handler() {
  const result = await runKeepAlive();
  console.log(`[${result.payload.timestamp}] keep-alive manual: ${result.payload.status}`);
  return jsonResponse(result.statusCode, result.payload);
};
