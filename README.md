1. React + Vite
Decision: Used React with Vite for fast development and simple project setup.
Why: Vite gives very fast startup and build times, which is ideal for an assignment and rapid UI iteration.
Trade-off: It is great for frontend speed, but it does not solve architecture by itself. Larger apps still need clean structure and state planning.

2. React Router for layout-based navigation
Decision: Used react-router-dom with a shared DashboardLayout and nested pages like Dashboard, Transactions, and Settings.
Why: This keeps the app shell reusable and avoids duplicating sidebar/topbar across pages.
Trade-off: Nested layout patterns are clean, but once shared state and modal actions are introduced, prop flow and layout coordination become slightly more complex.

3. Context API for state management
Decision: Used React Context instead of Redux or Zustand.
Why: The app has moderate global state:

transactions

role

theme

shared actions like add/edit/delete/reset

That is small enough for Context to handle well without adding more libraries.
Trade-off: Context is simple and lightweight, but it can become less efficient and harder to scale if the app grows significantly or if many deeply nested components subscribe to large shared state.

4. localStorage for persistence
Decision: Used localStorage to persist:

transactions

selected role

theme

Why: It gives a much better demo experience because data survives refresh without needing a backend.
Trade-off: localStorage is browser-only and not secure or shareable across devices. It works for demo persistence, but not as a production data source.

5. Frontend-only role simulation
Decision: Simulated Viewer/Admin only in the UI.
Why: This directly satisfies the assignment requirement without building auth, permission middleware, or backend role checks.
Trade-off: It is only a UI behavior change, not real authorization. It demonstrates UX logic, but it is not security.

6. Tailwind CSS + CSS variables for theming
Decision: Used Tailwind for component styling and CSS variables for dark/light theme tokens.
Why: Tailwind makes layout and spacing fast, while CSS variables make theme switching possible across the whole app.
Trade-off: Tailwind is productive, but hardcoded utility classes can make theme refactoring harder. That is exactly why some light-mode issues appeared until the UI was moved toward semantic theme styles.

7. Recharts for data visualization
Decision: Used Recharts for trend and category charts.
Why: It integrates well with React and is fast to implement for dashboards.
Trade-off: It is convenient, but it increases bundle size and can be less flexible than building highly customized SVG/chart systems manually.

8. Mock/shared frontend data first
Decision: Built the dashboard around shared frontend data before adding any backend.
Why: This let you finish the full user flow first:

dashboard summary

charts

transactions

filters

role behavior

persistence

Trade-off: Faster delivery, but not production-complete. API integration, validation, and server truth would still be needed later.

9. Custom modal and toast UX
Decision: Replaced browser confirm with a custom modal and used react-toastify for feedback.
Why: This makes the UI feel much more polished and product-like.
Trade-off: More code and more UI state to manage, but much better UX than native browser dialogs.

10. Theme-aware redesign after MVP
Decision: Built core functionality first, then improved dark/light theme support.
Why: This is a practical build order for assignments: functionality first, polish second.
Trade-off: Faster progress early, but later required refactoring because some early styles were dark-only.

11. No backend/auth integration in the first version
Decision: Did not prioritize Firebase Auth, Express, JWT, Stripe, or Leaflet in the MVP.
Why: Those tools are outside the core requirement of the assignment. Skipping them kept the submission focused.
Trade-off: The app is stronger as a dashboard demo, but weaker as a full-stack product showcase.

12. Bundle size trade-off
Decision: Accepted a somewhat larger frontend bundle during development.
Why: UI libraries, charts, icons, and theme work improve delivery speed and polish.
Trade-off: Build still succeeds, but chunk size could be optimized later with lazy loading and code splitting.