import React, { useState, useEffect, useContext, createContext } from 'react';
import './App.css';


const ThemeContext = createContext();

function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(()=>{
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`App ${theme}`}>
        <header className="App-header">
          <h1>React Hooks Example</h1>
          <ThemeToggle toggleTheme={toggleTheme} />
          {loading ? <p>Loading user data...</p> : <UserInfo user={user} />}
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

function UserInfo({user}){
   return(
    <div>
      <h2>user info</h2>
      <p>name:{user.name}</p>
      <p>Email:{user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
   );
}

function ThemeToggle({ toggleTheme }) {
  const theme = useContext(ThemeContext);
  
  return(
    <div>
      <p>current theme:{theme}</p>
      <button onClick={toggleTheme}>
       toggle to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>

  );

}export default App;