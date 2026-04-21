# Athletica Fitness Tracker

Athletica is a fresh mobile-first fitness tracking repo built for iOS and Android with an Expo React Native app, a TypeScript Express API, and shared domain types.

## Stack

- Mobile: Expo + React Native + TypeScript + React Navigation + Zustand + React Query
- API: TypeScript + Express + MongoDB + Mongoose + JWT auth + Zod validation
- Shared: workspace package for domain models and API-facing types

## Repo Structure

```text
fitness-tracker/
  apps/
    api/
      src/
        config/
        data/
        lib/
        middleware/
        models/
        routes/
        scripts/
        services/
    mobile/
      src/
        api/
        app/
        components/
        data/
        hooks/
        navigation/
        screens/
        store/
        theme/
  packages/
    shared/
      src/
```

## Product Coverage

### Mobile app

- Auth flow: login, register, forgot password, persistent auth store, Apple and Google placeholders
- Onboarding: goals, disciplines, fitness level, profile inputs, suggested starter plan
- Dashboard: daily summary, streak, recovery snapshot, recent sessions, suggested next action
- Training features: exercise browser/detail, workout builder, live workout, running tracker, MMA tracker, calisthenics tracker, recovery tracker
- Progress: charts, readiness trend, PR chips, heatmap-ready activity view
- Profile and settings: achievements, preferences, notifications, subscription placeholder

### API

- Auth routes: register, login, me, forgot password, reset password, logout
- Profile and settings routes
- Exercise browsing and exercise detail
- Workout templates and workout sessions
- Running, MMA, calisthenics, recovery, and analytics endpoints
- Seed script with a demo user, starter plan data, and 200 seeded exercise records

## Seed Dataset

The API seed catalog includes:

- 105 gym / bodybuilding / powerlifting / plyometric exercises
- 30 calisthenics skills and progressions
- 25 combat / striking / grappling drills
- 20 running and conditioning formats
- 20 recovery and mobility items

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy these files if needed:

- `apps/api/.env.example` -> `apps/api/.env`
- `apps/mobile/.env.example` -> `apps/mobile/.env`

If you prefer a single root env file during development, the root `.env.example` also includes the common values.

### 3. Start MongoDB

Use a local MongoDB instance or point `MONGO_URI` at a hosted database.

### 4. Seed the backend

```bash
npm run seed
```

Demo credentials after seeding:

- `demo@athletica.app`
- `Demo1234!`

### 5. Run the API

```bash
npm run dev:api
```

### 6. Run the mobile app

```bash
npm run dev:mobile
```

Then launch iOS or Android from Expo.

## Key Environment Variables

### API

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `PORT`
- `API_PREFIX`
- `CLIENT_ORIGIN`

### Mobile

- `EXPO_PUBLIC_API_URL`

## Known Limitations

- Mobile package versions and dependencies were scaffolded in code, but not installed or runtime-verified in this environment.
- Push notifications, Apple sign-in, Google sign-in, billing, GPS capture, and export jobs are structured as placeholders and still need platform service integration.
- Several mobile screens intentionally fall back to local demo data when the API is unavailable, which helps demo flows but should be tightened for production.
- The backend is seeded and modeled for MongoDB, but no migration or test suite has been added yet.

## Recommended Next Steps

1. Install dependencies and initialize a lockfile in the new repo.
2. Run TypeScript checks for both workspaces and fix any package-version-specific issues.
3. Add mutation hooks from the mobile app into the API for workout creation, recovery logging, and profile updates.
4. Wire native services for push notifications, health data, GPS, and auth providers.
5. Add tests for auth, analytics, and the most important mobile flows.
