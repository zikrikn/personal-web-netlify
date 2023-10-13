const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Website Coming Soon</h1>
      <div style={styles.card}>
        <p style={styles.subText}>I am working on something awesome. Stay tuned!</p>
        <p style= {styles.subText}>- Zikri 👊</p>
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
    background: '#f2f2f2',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '2rem',
    color: '#333',
    textTransform: 'uppercase',
  },
  card: {
    padding: '2rem',
    border: '2px solid #ddd',
    borderRadius: '12px',
    background: 'linear-gradient(to right, #00bfff, #1e90ff)',
    maxWidth: '80%',
    width: '400px',
    textAlign: 'center',
  },
  subText: {
    fontSize: '1.5rem',
    margin: '2rem 0',
    color: '#fff',
  },
};
