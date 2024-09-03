# E-Commerce Clothing Search Webpage

1) The project is organized into two folders: one for the frontend and one for the backend.
2) For the frontend, I've used both Bootstrap and Tailwind CSS, prioritizing Tailwind classes.
3) The backend is built with Node.js and Express.js.
4) The frontend sends requests to the backend to fetch data.

## Features:

- Data is fetched based on clothing name and type.
- The system handles input as follows:
  - If the input contains three characters or fewer, specific data is fetched from the backend.
  - If the input contains more than three characters without extra spaces, all relevant data is fetched.
  - If the input contains extra spaces, no specific data is fetched, and all data is shown.
  - If the user misspells a term, they receive recommendations for the closest correct spelling.
- When recommending the correct spelling, a paragraph appears with "Did you mean?" followed by a link with the correct spelling. Clicking the link updates the input with the correct term.
