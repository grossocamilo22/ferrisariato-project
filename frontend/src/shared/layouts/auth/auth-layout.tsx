import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validación básica (puedes cambiar esto por una llamada real a backend)
    if (email === 'usuario@demo.com' && password === '123456') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div style={styles.container}>
      {!loggedIn ? (
        <form onSubmit={handleLogin} style={styles.form}>
          <h2>Iniciar Sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
      ) : (
        <h2>Bienvenido, {email}!</h2>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    minWidth: 300,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
};

export default App;
