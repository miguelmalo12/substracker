import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <header className="bg-light-bg dark:bg-dark-bg">
        <p className='text-3xl font-bold underline'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <button onClick={() => setDarkMode(!darkMode)} >Toggle Dark Mode</button>
    </div>
  );
}

export default App;
