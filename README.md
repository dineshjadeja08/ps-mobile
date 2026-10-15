# Purple Squad customer mobile app

Production-oriented Expo/React Native customer app for Purple Squad home services.

## Implemented journey

Onboarding → phone OTP → service discovery → address → slot → booking review → backend booking → Razorpay advance → backend verification → booking success/detail.

The app also includes booking history, cancellation, completed-booking reviews, account/logout, location serviceability, and support links.

## Run locally

Requirements: Node.js 22.13 or newer, npm, and the Django API.

```powershell
Copy-Item .env.example .env.local
npm ci
npx expo start
```

Set `EXPO_PUBLIC_API_URL` to the API origin, without `/api/v1`. Android emulators commonly reach a host service at `http://10.0.2.2:8000`; physical devices need a LAN or HTTPS URL they can resolve.

Razorpay uses a native module, so payment testing requires a development build rather than Expo Go:

```powershell
npx expo prebuild
npx expo run:android
# macOS with Xcode:
npx expo run:ios
```

EAS profiles are provided in `eas.json`. Configure project/account ownership and secrets before using them.

## Quality checks

```powershell
npx tsc --noEmit
npm run lint
npx expo-doctor
npx expo export --platform web
```

Web export is a smoke check only. Native OTP, SecureStore, location permissions, and Razorpay must be tested on Android and iOS development builds.

## Configuration

- `EXPO_PUBLIC_API_URL`: backend origin.
- `EXPO_PUBLIC_RAZORPAY_KEY_ID`: optional fallback only; the preferred key comes from the backend payment-order response.
- Never put API secrets, Razorpay secret keys, MSG91 credentials, or webhook secrets in `EXPO_PUBLIC_*` variables.

## Architecture

- `src/app`: Expo Router screens and route groups.
- `src/components`: reusable mobile UI.
- `src/lib/api.ts`: typed backend client, refresh, idempotency, and error normalization.
- `src/lib/session.ts`: native SecureStore/web development persistence.
- `src/stores`: small client-side auth and booking-draft stores.
- `src/theme`: Purple Squad design tokens.
- `docs`: backend audit, design audit, API matrix, and delivery plan.

Start with [the backend audit](docs/BACKEND_AUDIT.md) before release work. The app intentionally does not fake APIs for technician tracking, balance payment, notification inbox, packages, coupons, or support tickets.
