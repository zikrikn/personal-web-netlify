import { useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mediumFeedUrl = "https://zikri.medium.com/feed";
    const linkedInFeedUrl = "https://www.bing.com/search?q=site%3Alinkedin.com%2Fpulse%2F+%22zikri+kholifah+nur%22+intitle%3A%22zikri+kholifah+nur%22&format=rss";

    const fetchFeeds = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(mediumFeedUrl),
          fetch(linkedInFeedUrl)
        ]);
        const [text1, text2] = await Promise.all([response1.text(), response2.text()]);

        const [feed1, feed2] = await Promise.all([parseStringPromise(text1), parseStringPromise(text2)]);

        const parseEntries = (feed, source) => {
          return feed.rss.channel[0].item.map(entry => ({
            title: entry.title[0],
            link: entry.link[0],
            published: new Date(entry.pubDate[0]),
            source,
          }));
        };

        const entries = [
          ...parseEntries(feed1, 'Medium'),
          ...parseEntries(feed2, 'LinkedIn'),
        ];

        const sortedEntries = entries.sort((a, b) => b.published - a.published);
        setArticles(sortedEntries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching RSS feeds:", error);
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Website Coming Soon</h1>
      <div style={styles.card}>
        <p style={styles.subText}>I am working on something awesome. Stay tuned!</p>
        <p style={styles.subText}>- Zikri 👊</p>
        <p style={styles.subText}>
          GitHub: {' '}
          <a href="https://github.com/zikrikn" target="_blank" rel="noopener noreferrer" style={styles.link}>
            https://github.com/zikrikn
          </a>
        </p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.subHeading}>While waiting, check out these articles:</h2>
        {loading ? (
          <p style={styles.loadingText}>Loading articles...</p>
        ) : (
          articles.map((article, index) => (
            <div key={index} style={styles.article}>
              <a href={article.link} target="_blank" rel="noopener noreferrer" style={styles.articleLink}>
                {article.title}
              </a>
              <p style={styles.articleDate}>{article.published.toLocaleDateString()}</p>
              <span style={{ ...styles.label, ...styles[article.source.toLowerCase()] }}>
                {article.source}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  subHeading: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  card: {
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#fff',
    maxWidth: '80%',
    width: '400px',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  subText: {
    fontSize: '1.2rem',
    margin: '1.5rem 0',
    color: '#333',
  },
  link: {
    color: '#0077b5', // LinkedIn blue color
    textDecoration: 'none',
  },
  loadingText: {
    fontSize: '1rem',
    color: '#333',
  },
  article: {
    marginBottom: '1rem',
    textAlign: 'left',
  },
  articleLink: {
    fontSize: '1rem',
    color: '#0077b5', // LinkedIn blue color
    textDecoration: 'none',
  },
  articleDate: {
    fontSize: '0.9rem',
    color: '#777',
  },
  label: {
    display: 'inline-block',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#fff',
    marginLeft: '0.5rem',
  },
  linkedin: {
    backgroundColor: '#0077b5',
  },
  medium: {
    backgroundColor: '#00ab6c',
  },
};
