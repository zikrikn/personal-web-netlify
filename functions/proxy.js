// File: functions/proxy.js
import fetch from 'node-fetch';

export async function handler(event) {
  const { path } = event;
  let url;

  if (path === '/medium') {
    url = 'https://zikri.medium.com/feed';
  } else if (path === '/linkedin') {
    url = 'https://www.bing.com/search?q=site%3Alinkedin.com%2Fpulse%2F+%22zikri+kholifah+nur%22+intitle%3A%22zikri+kholifah+nur%22&format=rss';
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

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
        'Content-Type': 'application/rss+xml', // Sesuaikan tipe konten jika perlu
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
