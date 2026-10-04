# UMKMHub - RT 33 Sei Wain Local Business Catalog

This website was built to collect and display data about small and medium-sized businesses (UMKM) around the RT 33 Sei Wain area (near the ITK campus). The goal is to make it easy for local residents and students to find information about nearby food stalls, services, fashion stores, crafts, and other local businesses.

## Features
- A business catalog that you can filter by category.
- Detail pages showing location (via Google Maps), operating hours, contact info (WA/IG), and a list of products or menus.
- Recommendations for similar businesses at the bottom of the detail page.
- Photo galleries for venues and products.
- A random search "I'm Feeling Lucky" button with custom quirky loading texts.

## Tech Stack
This project is built using:
- Vue 3 (Composition API)
- Vite
- Tailwind CSS v4
- Vue Router

## How to Run It Locally

If you want to continue development or just test the app on your machine, make sure you have Node.js installed first. Once that's sorted, just follow these steps:

1. Open your terminal or command prompt and navigate to this project's folder (`umkm-catalog`).
2. Type this command to install all the required packages:
   ```bash
   npm install
   ```
3. Once the installation is done, spin up the development server by running:
   ```bash
   npm run dev
   ```
4. A local link (usually http://localhost:5173) will pop up in the terminal. Just click or copy-paste that link into your browser to see the web app live.

## Building for Production
When the code is ready and you want to host it online on services like Vercel, Netlify, or cPanel, build the project by running:
```bash
npm run build
```
This will generate a `dist` folder. The static HTML, CSS, and JS files inside this folder are what you'll upload to your hosting server.
