import { useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mediumFeedUrl = "/medium";
    const linkedInFeedUrl = "/linkedin";

    const fetchFeeds = async () => {
      try {
        const responses = await Promise.all([
          fetch(mediumFeedUrl).then(response => response.ok ? response.text() : null),
          fetch(linkedInFeedUrl).then(response => response.ok ? response.text() : null)
        ]);
        
        const validResponses = responses.filter(response => response !== null);
        
        const parsedFeeds = await Promise.all(validResponses.map(text => parseStringPromise(text)));
        
        const parseEntries = (feed, source) => {
          return feed.rss.channel[0].item.map(entry => {
            // Remove '- LinkedIn' from title if present
            let title = entry.title[0].replace(/ - LinkedIn$/, '');
    
            return {
              title: title,
              link: entry.link[0],
              published: new Date(entry.pubDate[0]),
              source,
            };
          });
        };
        
        const entries = parsedFeeds.flatMap((feed, index) => {
          if (!feed || !feed.rss || !feed.rss.channel || !feed.rss.channel[0].item) {
            return [];
          }
          
          const source = index === 0 ? 'Medium' : 'LinkedIn';
          
          return parseEntries(feed, source);
        });
        
        const sortedEntries = entries.sort((a, b) => b.published - a.published);
        setArticles(sortedEntries);
        setDisplayedArticles(sortedEntries.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching RSS feeds:", error);
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  const handleLoadMore = () => {
    setDisplayedArticles(articles); // Adjusted to load all articles
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Website Coming Soon</h1>
      <div style={styles.card}>
        <p style={styles.subText}>I am working on something awesome. Stay tuned!</p>
        <p style={styles.subText}>- Zikri 👊</p>
        <p style={styles.subText}>
          GitHub:{' '}
          <a href="https://github.com/zikrikn" target="_blank" rel="noopener noreferrer" style={styles.link}>
            https://github.com/zikrikn
          </a>
        </p>
      </div>

      <div style={styles.articlesContainer}>
        <h2 style={styles.subHeading}>While waiting, check out these articles:</h2>
        {loading ? (
          <p style={styles.loadingText}>Loading articles...</p>
        ) : (
          displayedArticles.map((article, index) => (
            <div key={index} style={styles.article}>
              <div style={styles.articleMeta}>
                <span style={styles.articleDate}>{article.published.toLocaleDateString()}</span>
                <span style={{ ...styles.label, ...styles[article.source.toLowerCase()] }}>{article.source}</span>
              </div>
              <a href={article.link} target="_blank" rel="noopener noreferrer" style={styles.articleLink}>
                {article.title}
              </a>
              {index !== displayedArticles.length - 1 && <hr style={styles.divider} />}
            </div>
          ))
        )}
        {displayedArticles.length < articles.length && (
          <div style={styles.center}>
            <button style={styles.readMoreButton} onClick={handleLoadMore}>
              Read More
            </button>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; {new Date().getFullYear()} Zikri Kholifah Nur. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
  },
  subHeading: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center', // Center align text
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    fontFamily: 'Poppins, sans-serif',
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
    fontFamily: 'Poppins, sans-serif',
  },
  link: {
    color: '#0077b5',
    textDecoration: 'none',
    fontFamily: 'Poppins, sans-serif',
  },
  loadingText: {
    fontSize: '1rem',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  article: {
    marginBottom: '1rem',
    width: '70%',
    margin: '0 auto',
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  articleLink: {
    fontSize: '1rem',
    color: '#0077b5',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
  },
  articleDate: {
    fontSize: '0.9rem',
    color: '#777',
    marginRight: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
  },
  label: {
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#fff',
    textTransform: 'uppercase',
    marginLeft: 'auto',
    fontFamily: 'Poppins, sans-serif',
  },
  linkedin: {
    backgroundColor: '#0077b5',
    fontFamily: 'Poppins, sans-serif',
  },
  medium: {
    backgroundColor: '#00ab6c',
    fontFamily: 'Poppins, sans-serif',
  },
  articlesContainer: {
    width: '100%',
    marginTop: '1rem',
    fontFamily: 'Poppins, sans-serif',
    padding: '0 10px', // Penambahan padding untuk responsivitas pada layar kecil
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  readMoreButton: {
    padding: '0.5rem 1rem',
    background: '#0077b5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  divider: {
    width: '100%',
    border: 'none',
    borderTop: '1px solid #ddd',
    margin: '0.5rem 0',
    fontFamily: 'Poppins, sans-serif',
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  footerText: {
    fontSize: '0.8rem',
    color: '#777',
    fontFamily: 'Poppins, sans-serif',
  },

  // Media query for mobile
  '@media (max-width: 768px)': {
    articlesContainer: {
      padding: '0 5px', // Adjust padding for smaller screens
    },
    article: {
      width: '90%', // Adjust width of articles for smaller screens
    },
    card: {
      width: '90%', // Adjust width of cards for smaller screens
    },
  },
};
