// Keep-alive function for Netlify
// This function helps keep services alive during periods of inactivity

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Keep-alive ping successful',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Keep-alive ping failed',
        message: error.message,
      }),
    };
  }
};
