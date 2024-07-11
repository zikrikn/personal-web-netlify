import fetch from 'node-fetch';

export async function handler() {
  const url = 'https://www.bing.com/search?q=site%3Alinkedin.com%2Fpulse%2F+%22zikri+kholifah+nur%22+intitle%3A%22zikri+kholifah+nur%22&format=rss';
  console.log('Fetching URL:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/rss+xml',
      },
      body: data,
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
