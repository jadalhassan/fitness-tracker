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

## Deployment

### API deployment on Railway

The repo now includes a Docker-based Railway config for the API:

- `railway.json`
- `apps/api/Dockerfile`
- `.dockerignore`

Recommended setup:

1. Create a Railway service from this repository.
2. Keep the service rooted at the repository root so the Docker build can access the shared workspace package.
3. Railway will use `railway.json` and `apps/api/Dockerfile` to build the API.
4. Set these Railway variables:

```text
NODE_ENV=production
PORT=4000
API_PREFIX=/api/v1
CLIENT_ORIGIN=*
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d
```

5. Use MongoDB Atlas for production and point `MONGO_URI` at your Atlas connection string.

The healthcheck is configured for:

```text
/api/v1/health
```

### Mobile release builds with Expo EAS

Per Expo's monorepo guidance, run EAS commands from the mobile app directory, not from the monorepo root:

```bash
cd apps/mobile
```

The mobile app now includes:

- `app.config.ts` for environment-driven Expo config
- `eas.json` with `development`, `preview`, and `production` build profiles
- `src/config/env.ts` to centralize API URL resolution

Before your first build, define these values in EAS environment variables or a local `.env` file:

```text
EXPO_PUBLIC_API_URL=https://your-api.up.railway.app/api/v1
EXPO_IOS_BUNDLE_IDENTIFIER=com.athletica.mobile
EXPO_ANDROID_PACKAGE=com.athletica.mobile
EXPO_APP_VERSION=1.0.0
EXPO_APP_NAME=Athletica
EXPO_APP_SLUG=athletica-fitness-tracker
EXPO_APP_SCHEME=athletica
```

Optional after linking the app to an Expo project:

```text
EXPO_EAS_PROJECT_ID=your-expo-project-id
```

Typical release flow:

```bash
cd apps/mobile
npm install -g eas-cli
eas login
eas build --platform android --profile production
eas build --platform ios --profile production
eas submit --platform android
eas submit --platform ios
```

For internal QA builds:

```bash
eas build --platform android --profile preview
eas build --platform ios --profile preview
```

### Over-the-air updates later

If you want OTA updates after the first store release, add `expo-updates` and run Expo's update configuration flow from `apps/mobile`. That is intentionally left out for now so the initial release setup stays smaller and easier to verify.

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
- `EXPO_IOS_BUNDLE_IDENTIFIER`
- `EXPO_ANDROID_PACKAGE`
- `EXPO_APP_VERSION`
- `EXPO_APP_NAME`
- `EXPO_APP_SLUG`
- `EXPO_APP_SCHEME`
- `EXPO_EAS_PROJECT_ID` (optional until the app is linked to Expo)

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
