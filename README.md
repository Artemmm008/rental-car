# RentalCar

A modern, responsive web application for searching, filtering, and booking rental vehicles. Built with Next.js (App Router), TypeScript, and React Query, focusing on high-performance data fetching, clean state management, and seamless UI/UX interactions.

> I developed this web application from scratch, handling the UI/UX layout, multi-parameter search logic, client-side caching, and API integration.

---

## Features 🔥

- **Advanced Vehicle Search & Filtering:** Instant filtering by car brand, hourly/daily price range, and mileage.
- **Detailed Car Profiles:** Interactive specification cards with rental conditions, car specifications, and user-friendly form.
- **Favorites / Wishlist System:** Client-side bookmarking system allowing users to save and manage favorite vehicles across sessions.
- **Optimized Data Fetching:** Asynchronous request handling and response caching via TanStack Query (React Query).

---

## Key Technical Highlights 💡

- **Smart API Query Caching:** Leveraged TanStack Query to keep vehicle lists cached in memory, eliminating layout shifts and flicker during filter resets.
- **Strict Type Safety:** Fully typed API contracts, filter parameters, and component props with TypeScript to catch errors at compile time.
- **Resilient UI States:** Handles loading skeletons, empty search results, and API network errors gracefully without crashing the application.

---

## Technologies Used 👨🏻‍💻

- **Next.js (App Router)** - _frontend framework & routing_
- **TypeScript** - _strict static type checking_
- **React Query (TanStack Query)** - _server state management & API caching_
- **Axios** - _HTTP client for API communication_
- **React-Select** - _accessible custom dropdowns & filter selects_
- **CSS Modules** - _styling_
- **ESLint & Prettier** - _code quality & formatting_
- **Vercel** - _frontend hosting & deployment_

---

## Installation & Setup 🔮

To run the project locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/Artemmm008/rental-car.git
```

Install dependencies:

```bash
cd rental-car && npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser and go to <http://localhost:3000>
