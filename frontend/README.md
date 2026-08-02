# Cheerful Realstate — Cheerful Real Estate Frontend

A React + Tailwind frontend with a landing page, sign up / sign in, and
role-based dashboards (User & Admin).

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Auth (mocked)

`src/context/AuthContext.jsx` currently uses fake sign-in/sign-up logic
so you can try the app without a backend:

- Any email containing "admin" (e.g. `admin@x.com`) logs in as an **admin**
  → redirected to `/admin`
- Any other email logs in as a **user** → redirected to `/dashboard`

When you're ready to connect a real backend (e.g. your Node/Express +
MongoDB API), replace the `signIn` and `signUp` functions in
`AuthContext.jsx` with real `fetch`/`axios` calls.

## Structure

```
src/
  context/AuthContext.jsx     — auth state + mock sign in/up/out
  components/Navbar.jsx       — top nav, changes based on auth state
  components/ProtectedRoute.jsx — route guard by role
  pages/Landing.jsx           — public landing page
  pages/SignIn.jsx
  pages/SignUp.jsx
  pages/UserDashboard.jsx     — /dashboard (role: user)
  pages/AdminDashboard.jsx    — /admin (role: admin)
  App.jsx                     — routes
```

## Build for production

```bash
npm run build
npm run preview
```
