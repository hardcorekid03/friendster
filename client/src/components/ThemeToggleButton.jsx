import React, { useState, useEffect } from 'react';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(() => {
    // Get the theme from local storage, or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the old theme class
    root.classList.remove(theme === 'light' ? 'dark' : 'light');

    // Add the new theme class
    root.classList.add(theme);

    // Save the new theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // Toggle between 'light' and 'dark'
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {theme === 'dark' ? (
        <button
          type="button"
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-700 dark:focus:bg-neutral-200"
        >
          <span className="group inline-flex shrink-0 justify-center items-center size-9">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleTheme}
          className="block font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          <span className="group inline-flex shrink-0 justify-center items-center size-9">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </span>
        </button>
      )}
    </>
  );
};

export default ThemeToggleButton;
