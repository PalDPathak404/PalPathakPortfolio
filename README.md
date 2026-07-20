<div align="center">
  <br />
  <h1>👨‍💻 Pal Pathak's Personal Portfolio</h1>
  <p>
    <strong>A minimalist, 3D interactive, and performant developer portfolio built with the MERN stack.</strong>
  </p>
  <br />
  
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
</div>

<br />

## 🌟 About

This repository contains the source code for my personal portfolio website. Designed with a focus on smooth micro-interactions, clean glassmorphic aesthetics, and dynamic content fetching (GitHub and LeetCode stats are fetched directly in real-time!).

It is fully responsive and optimized for both desktop and mobile viewing, providing a premium experience that highlights my skills, projects, hackathon achievements, and background.

## ✨ Features

- **Interactive 3D Elements:** Engaging UI components with hover effects and tilt animations.
- **Dynamic Stats Integration:** Fetches live GitHub repositories and LeetCode problem-solving stats via dedicated API endpoints.
- **Glassmorphism Design:** Modern translucent aesthetic with a tailored dark mode palette.
- **Optimized Performance:** Built with Vite for rapid loading and lightweight bundle sizes.
- **Seamless Deployment:** Pre-configured for one-click deployment on Vercel with Serverless functions.

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/paldpathak404/palpathakportfolio.git
   cd palpathakportfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(Note: This installs dependencies for both the frontend and the Express backend simultaneously via `package.json` configurations).*

3. **Environment Variables:**
   Create a `.env` file in the root directory.
   ```env
   VITE_GITHUB_USERNAME=paldpathak404
   VITE_LEETCODE_USERNAME=paldpathak404
   # Optional: Add a GITHUB_TOKEN to avoid GitHub API rate limits
   # GITHUB_TOKEN=your_personal_access_token
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).
The `vercel.json` file is pre-configured to build the frontend and map the `/api/*` routes to the backend Express serverless functions.

1. Import the repository into Vercel.
2. Ensure the Framework Preset is set to `Vite`.
3. Add your Environment Variables in the Vercel dashboard.
4. Deploy!

## 🤝 Let's Connect!

If you want to reach out or see more of my work, connect with me:
- **GitHub:** [paldpathak404](https://github.com/paldpathak404)
- **LinkedIn:** [palpathak404](https://linkedin.com/in/palpathak404)

---
<div align="center">
  <sub>Built with ❤️ by Pal Pathak</sub>
</div>
