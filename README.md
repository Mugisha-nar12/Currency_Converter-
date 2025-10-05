# Currency_Converter-
A web app that lets users (a) convert between currencies, (b) see live exchange rates, and (c) track stock/currency movements.

# UI design link:
https://www.figma.com/design/Sq5Jm8IR33ME5Ld1HSOwd8/currency-converter?node-id=2-835&t=cA7Ce5vlSttxiZPD-1

# Tech stack:

Frontend: React.js + Tailwind CSS
Deployment: Netlify / Vercel / GitHub Pages

# Architecture & Layers

Think in layers/components:

UI Layer (Frontend)

Built with React components styled with Tailwind CSS.

Components: Navbar, Converter Form, Exchange Rate Table, Chart/Graph, Footer.

Business Logic Layer

Currency conversion logic.

Data formatting (numbers, symbols, date/time).

Data Layer (API Integration)

Fetch exchange rates via API.

Handle caching/local storage for performance.
